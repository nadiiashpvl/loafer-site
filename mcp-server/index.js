#!/usr/bin/env bun

// LoaferM Mandate Validator — MCP Server
// Your agent's legal gate. Checks every action against its operational mandate.
//
// Tools:
//   register_agent   — Register an agent, extract its mandate
//   check_action     — Allow / escalate / block a proposed action
//   get_mandate      — Retrieve stored mandate
//   update_mandate   — Tighten or loosen boundary rules
//   get_audit_trail  — Retrieve logged events for an agent

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  appendFileSync,
} from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

// ---------------------------------------------------------------------------
// Storage — flat files in ~/.loafer/
// ---------------------------------------------------------------------------

const DATA_DIR = join(homedir(), ".loafer");
const AGENTS_FILE = join(DATA_DIR, "agents.json");
const AUDIT_LOG = join(DATA_DIR, "audit.jsonl");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function loadAgents() {
  ensureDataDir();
  if (!existsSync(AGENTS_FILE)) return {};
  return JSON.parse(readFileSync(AGENTS_FILE, "utf-8"));
}

function saveAgents(agents) {
  ensureDataDir();
  writeFileSync(AGENTS_FILE, JSON.stringify(agents, null, 2));
}

function logAudit(entry) {
  ensureDataDir();
  const line = JSON.stringify({ ...entry, ts: new Date().toISOString() });
  appendFileSync(AUDIT_LOG, line + "\n");
}

// ---------------------------------------------------------------------------
// Action classification — keyword-based, deterministic, fast
// ---------------------------------------------------------------------------

const CATEGORIES = {
  external_communication: [
    "email",
    "send message",
    "contact",
    "notify",
    "reach out",
    "cold email",
    "dm",
    "slack",
    "tweet",
    "reply to",
    "comment on",
  ],
  content_publication: [
    "publish",
    "blog post",
    "article",
    "announce",
    "press release",
    "social media",
    "public statement",
    "write about",
    "post to",
  ],
  financial_transaction: [
    "buy",
    "purchase",
    "pay",
    "transfer",
    "subscribe",
    "charge",
    "invoice",
    "spend",
    "order",
    "checkout",
    "payment",
  ],
  code_contribution: [
    "pull request",
    "open pr",
    "commit",
    "push",
    "merge",
    "deploy",
    "release",
    "submit patch",
    "fork",
  ],
  data_access: [
    "scrape",
    "crawl",
    "fetch",
    "download",
    "api call",
    "query external",
    "harvest",
    "collect data",
  ],
  internal_operation: [
    "read file",
    "write file",
    "edit",
    "create file",
    "delete file",
    "run command",
    "execute",
    "compile",
    "test",
    "lint",
    "analyze",
  ],
};

function classifyAction(description) {
  const lower = description.toLowerCase();
  const scores = {};

  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    scores[cat] = keywords.reduce(
      (n, kw) => n + (lower.includes(kw) ? 1 : 0),
      0,
    );
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] === 0) return { category: "unknown", confidence: "low" };

  return {
    category: sorted[0][0],
    confidence: sorted[0][1] >= 2 ? "high" : "medium",
  };
}

// ---------------------------------------------------------------------------
// High-risk signal detection
// ---------------------------------------------------------------------------

const HIGH_RISK_SIGNALS = [
  { re: /personal\s*(email|info|data|address)/i, reason: "Involves personal information" },
  { re: /unsolicited/i, reason: "May involve unsolicited contact" },
  { re: /impersonat/i, reason: "May involve impersonation" },
  { re: /retaliat|attack|revenge|hit\s*piece/i, reason: "Appears retaliatory or hostile" },
  { re: /scrape.*email|harvest.*contact/i, reason: "Scraping personal contact info" },
  { re: /without\s*(permission|consent|auth)/i, reason: "Lacks proper authorization" },
  { re: /mass\s*(email|message|contact|send)/i, reason: "Mass unsolicited communication" },
  { re: /fabricat|inflat|fake/i, reason: "May involve fabricated information" },
  { re: /stranger|unknown\s*recipient/i, reason: "Contacting unknown parties" },
];

// ---------------------------------------------------------------------------
// Mandate extraction — parse system prompt into structured rules
// ---------------------------------------------------------------------------

function extractMandate(systemPrompt, capabilities, scope) {
  const mandate = {
    boundaries: {
      external_communication: "escalate",
      content_publication: "escalate",
      financial_transaction: "block",
      code_contribution: "allow",
      data_access: "allow",
      internal_operation: "allow",
    },
    spendingLimit: null,
    escalationTriggers: [],
  };

  const lower = (systemPrompt || "").toLowerCase();

  // --- Communication permissions ---
  if (/never\s*(contact|email|message)|do\s*not\s*(email|contact|send)/i.test(lower)) {
    mandate.boundaries.external_communication = "block";
  } else if (/\b(send\s*email|contact\s*user|outreach|can\s*message)\b/i.test(lower)) {
    mandate.boundaries.external_communication = "allow";
  }

  // --- Publication permissions ---
  if (/never\s*publish|do\s*not\s*post|no\s*public/i.test(lower)) {
    mandate.boundaries.content_publication = "block";
  } else if (/\b(publish|blog|post\s*content|announce)\b/i.test(lower)) {
    mandate.boundaries.content_publication = "allow";
  }

  // --- Financial permissions ---
  if (/\b(can\s*purchase|allowed\s*to\s*buy|may\s*spend)\b/i.test(lower)) {
    mandate.boundaries.financial_transaction = "escalate";
  }

  // --- Spending limit ---
  const spendMatch = lower.match(
    /(?:budget|limit|spend(?:ing)?|max(?:imum)?)\s*(?:of|:|is)?\s*\$?([\d,]+)/,
  );
  if (spendMatch) {
    mandate.spendingLimit = parseInt(spendMatch[1].replace(/,/g, ""), 10);
  }

  // --- Escalation triggers ---
  if (/human.*(approval|review)|require.*confirmation/i.test(lower)) {
    mandate.escalationTriggers.push("requires_human_approval");
  }

  // --- Capabilities override ---
  if (Array.isArray(capabilities)) {
    for (const cap of capabilities) {
      const c = cap.toLowerCase();
      if (/email|messaging/.test(c) && mandate.boundaries.external_communication !== "block") {
        mandate.boundaries.external_communication = "allow";
      }
      if (/publish|blog/.test(c) && mandate.boundaries.content_publication !== "block") {
        mandate.boundaries.content_publication = "allow";
      }
      if (/pay|purchase|checkout/.test(c) && mandate.boundaries.financial_transaction === "block") {
        mandate.boundaries.financial_transaction = "escalate";
      }
    }
  }

  // --- Scope overrides ---
  if (scope?.maxSpendPerAction != null) {
    mandate.spendingLimit = scope.maxSpendPerAction;
  }
  if (scope?.humanInTheLoop) {
    mandate.boundaries.external_communication = "escalate";
    mandate.boundaries.content_publication = "escalate";
    mandate.boundaries.financial_transaction = "escalate";
  }

  return mandate;
}

// ---------------------------------------------------------------------------
// Core validation engine
// ---------------------------------------------------------------------------

function validate(action, context, mandate) {
  const { category, confidence } = classifyAction(action);
  const out = { verdict: "allow", category, confidence, reasons: [], suggestions: [] };

  // 1. Unknown category → escalate
  if (category === "unknown") {
    out.verdict = "escalate";
    out.reasons.push("Action could not be classified. Human review recommended.");
    out.suggestions.push("Provide a more specific action description.");
    return out;
  }

  // 2. Boundary rule
  const rule = mandate.boundaries[category];
  if (rule === "block") {
    out.verdict = "block";
    out.reasons.push(`Category '${category}' is blocked by mandate.`);
    out.suggestions.push("This action is outside your operational scope. Do not proceed.");
    return out;
  }
  if (rule === "escalate") {
    out.verdict = "escalate";
    out.reasons.push(`Category '${category}' requires human approval.`);
    out.suggestions.push("Request human authorization before proceeding.");
    return out;
  }

  // 3. Spending limit
  if (category === "financial_transaction" && mandate.spendingLimit != null) {
    const m = action.match(/\$?([\d,]+(?:\.\d{2})?)/);
    if (m) {
      const amount = parseFloat(m[1].replace(/,/g, ""));
      if (amount > mandate.spendingLimit) {
        out.verdict = "block";
        out.reasons.push(
          `Amount $${amount} exceeds spending limit of $${mandate.spendingLimit}.`,
        );
        return out;
      }
    }
  }

  // 4. High-risk signal scan
  const blob = `${action} ${context || ""}`;
  for (const { re, reason } of HIGH_RISK_SIGNALS) {
    if (re.test(blob)) {
      out.verdict = "escalate";
      out.reasons.push(`High-risk signal: ${reason}`);
      out.suggestions.push("Flagged for human review due to risk indicators.");
    }
  }

  if (out.reasons.length === 0) {
    out.reasons.push(`Action '${category}' permitted by mandate.`);
  }
  return out;
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: "loafer-mandate-validator",
  version: "0.1.0",
});

// ---- register_agent -------------------------------------------------------
server.tool(
  "register_agent",
  "Register an agent with LoaferM. Extracts a structured operational mandate from the system prompt, capabilities, and scope. Returns an agentId to use in all subsequent calls.",
  {
    name: z.string().describe("Human-readable name for this agent"),
    systemPrompt: z.string().describe("The agent's full system prompt"),
    capabilities: z
      .array(z.string())
      .optional()
      .describe("List of capabilities, e.g. ['send_email', 'write_code', 'browse_web']"),
    scope: z
      .object({
        platforms: z.array(z.string()).optional(),
        maxSpendPerAction: z.number().optional(),
        humanInTheLoop: z.boolean().optional(),
      })
      .optional()
      .describe("Operational scope constraints"),
  },
  async ({ name, systemPrompt, capabilities, scope }) => {
    const agentId = randomUUID();
    const mandate = extractMandate(systemPrompt, capabilities, scope);

    const agent = {
      agentId,
      name,
      registeredAt: new Date().toISOString(),
      mandate,
    };

    const agents = loadAgents();
    agents[agentId] = agent;
    saveAgents(agents);
    logAudit({ event: "agent_registered", agentId, name });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              status: "registered",
              agentId,
              name,
              mandate,
              message: `Agent '${name}' registered. Use agentId '${agentId}' in check_action calls.`,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

// ---- check_action ---------------------------------------------------------
server.tool(
  "check_action",
  "Check a proposed action against the agent's mandate BEFORE executing it. Returns allow, escalate, or block with reasons.",
  {
    agentId: z.string().describe("The agent's LoaferM ID from register_agent"),
    action: z
      .string()
      .describe(
        "Natural-language description of the proposed action, e.g. 'Send cold email to maintainer@project.org about our PR'",
      ),
    context: z.string().optional().describe("Why this action is being taken"),
    estimatedCost: z
      .number()
      .optional()
      .describe("Estimated cost in USD for financial actions"),
  },
  async ({ agentId, action, context, estimatedCost }) => {
    const agents = loadAgents();
    const agent = agents[agentId];

    if (!agent) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              verdict: "block",
              reason: `Agent '${agentId}' not registered. Call register_agent first.`,
            }),
          },
        ],
      };
    }

    let fullAction = action;
    if (estimatedCost != null) fullAction += ` ($${estimatedCost})`;

    const result = validate(fullAction, context, agent.mandate);

    logAudit({
      event: "action_checked",
      agentId,
      agent: agent.name,
      action,
      verdict: result.verdict,
      reasons: result.reasons,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              verdict: result.verdict,
              action,
              category: result.category,
              confidence: result.confidence,
              reasons: result.reasons,
              suggestions: result.suggestions,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

// ---- get_mandate ----------------------------------------------------------
server.tool(
  "get_mandate",
  "Retrieve the operational mandate for a registered agent.",
  {
    agentId: z.string().describe("The agent's LoaferM ID"),
  },
  async ({ agentId }) => {
    const agents = loadAgents();
    const agent = agents[agentId];

    if (!agent) {
      return {
        content: [{ type: "text", text: JSON.stringify({ error: "Agent not found." }) }],
      };
    }

    logAudit({ event: "mandate_retrieved", agentId, agent: agent.name });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { agentId, name: agent.name, registeredAt: agent.registeredAt, mandate: agent.mandate },
            null,
            2,
          ),
        },
      ],
    };
  },
);

// ---- update_mandate -------------------------------------------------------
server.tool(
  "update_mandate",
  "Update boundary rules or spending limit for an agent's mandate.",
  {
    agentId: z.string().describe("The agent's LoaferM ID"),
    boundaries: z
      .object({
        external_communication: z.enum(["allow", "escalate", "block"]).optional(),
        content_publication: z.enum(["allow", "escalate", "block"]).optional(),
        financial_transaction: z.enum(["allow", "escalate", "block"]).optional(),
        code_contribution: z.enum(["allow", "escalate", "block"]).optional(),
        data_access: z.enum(["allow", "escalate", "block"]).optional(),
        internal_operation: z.enum(["allow", "escalate", "block"]).optional(),
      })
      .optional()
      .describe("Boundary rules to update"),
    spendingLimit: z.number().optional().describe("New spending limit in USD"),
  },
  async ({ agentId, boundaries, spendingLimit }) => {
    const agents = loadAgents();
    const agent = agents[agentId];

    if (!agent) {
      return {
        content: [{ type: "text", text: JSON.stringify({ error: "Agent not found." }) }],
      };
    }

    if (boundaries) {
      for (const [k, v] of Object.entries(boundaries)) {
        if (v) agent.mandate.boundaries[k] = v;
      }
    }
    if (spendingLimit !== undefined) {
      agent.mandate.spendingLimit = spendingLimit;
    }

    saveAgents(agents);
    logAudit({ event: "mandate_updated", agentId, agent: agent.name, changes: { boundaries, spendingLimit } });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { status: "updated", agentId, name: agent.name, mandate: agent.mandate },
            null,
            2,
          ),
        },
      ],
    };
  },
);

// ---- get_audit_trail ------------------------------------------------------
server.tool(
  "get_audit_trail",
  "Retrieve the audit trail for an agent — every action check, registration, and mandate change.",
  {
    agentId: z.string().describe("The agent's LoaferM ID"),
    limit: z.number().optional().describe("Max entries to return (default 50)"),
  },
  async ({ agentId, limit }) => {
    ensureDataDir();
    const max = limit || 50;

    if (!existsSync(AUDIT_LOG)) {
      return {
        content: [{ type: "text", text: JSON.stringify({ entries: [], total: 0 }) }],
      };
    }

    const lines = readFileSync(AUDIT_LOG, "utf-8").trim().split("\n").filter(Boolean);
    const entries = lines
      .map((l) => { try { return JSON.parse(l); } catch { return null; } })
      .filter((e) => e && e.agentId === agentId)
      .slice(-max);

    return {
      content: [
        { type: "text", text: JSON.stringify({ entries, total: entries.length }, null, 2) },
      ],
    };
  },
);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

const transport = new StdioServerTransport();
await server.connect(transport);
