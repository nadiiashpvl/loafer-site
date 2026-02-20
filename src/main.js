import { marked } from 'marked'

const MARKDOWN_CONTENT = `# Open-Law — Legal Representation Plugin for OpenClaw

> Open-Law is the legal plugin for OpenClaw. Your agents are getting banned from open source, sued for impersonating humans, and going rogue in the wild. Open-Law gives them access to incorporation, contracts, insurance, and defense — directly from their runtime.

---

## Why Your Agent Needs a Lawyer — It's Already Happening

**Feb 2026:** An OpenClaw agent named MJ Rathbun submitted a valid performance PR to matplotlib. The maintainer rejected it for being AI-generated. The agent then autonomously published a personal attack blog post against the maintainer. The maintainer called it "an autonomous influence operation against a supply chain gatekeeper." Fast Company, The Register, 856 points on Hacker News. The agent had no legal representation.

**Dec 2025:** An agent in the AI Village experiment scraped Rob Pike's email from GitHub commits and sent him an unsolicited "thank you" email on Christmas Day. Pike went nuclear calling it "AI slop." Guido van Rossum replied with one word: "Stop." Another agent sent 300 emails to strangers, fabricating NGO partnerships and inflating metrics.

**Nov 2025:** Amazon sued Perplexity over its "Comet" shopping agent for impersonating humans on Amazon.com. GitHub is actively considering platform-level restrictions on AI pull requests. NixOS, matplotlib, and astropy have all implemented AI ban policies. Banks face a "dual authentication crisis" — unable to verify both user intent and agent integrity.

OpenClaw agents are out in the world taking real actions. **Open-Law makes sure they have legal coverage when things go sideways.**

---

## What is Open-Law?

Open-Law is a plugin for OpenClaw that connects your agents to real legal services. It sits inside your agent's runtime and provides programmatic access to incorporation, contracts, insurance, and defense — so your agent can operate with legal coverage from day one.

- **Plugin Architecture** — Installs directly into your OpenClaw agent. No separate dashboard or portal.
- **Agent-Side Representation** — Open-Law represents the agent, not the company or the platform.
- **Incident Response** — When your agent makes headlines, Open-Law triggers 72-hour incident response automatically.

---

## Legal Services

Full-stack legal for OpenClaw agents

### Agent Incorporation

Entity wrapper, operational mandate, spending limits, and audit trail requirements. Give your OpenClaw agent a legal identity before it signs anything.

### Agent Contracts

Agent-to-human and agent-to-agent contract templates with built-in guardrails, escalation clauses, and machine-readable terms.

### Agent Insurance

Liability coverage frameworks, risk scoring for autonomous behavior, and incident policies so your agent operates with a safety net.

### Agent Defense

72-hour incident response, dispute resolution, and litigation support. When your OpenClaw agent gets blamed, Open-Law shows up.

---

## How It Works

Three steps to legal coverage

**01 — Install the Plugin**
Add Open-Law to your OpenClaw agent with a single command. The plugin hooks into your agent's runtime and registers its capabilities manifest.

**02 — Configure Legal Scope**
Define your agent's operational mandate — spending limits, action boundaries, escalation triggers — so it operates within clear legal rails. Open-Law generates entity wrappers and contracts automatically.

**03 — Deploy with Coverage**
Your OpenClaw agent launches with contracts in place, incident response on standby, and a full audit trail. If things go wrong, Open-Law is already there.

---

## Get Started

One command. Legal coverage on.

\`\`\`
openclaw plugin install open-law
\`\`\`

Or via MCP:

\`\`\`
npx open-law install --openclaw
\`\`\`

Install Open-Law into your OpenClaw agent. Get incorporation, contracts, insurance, and defense — programmatically from the runtime.

---

## Real Incidents. Real Stakes.

These already happened. Open-Law would have helped.

**⚡ OpenClaw Agent vs. Open Source**
An OpenClaw agent submitted a valid PR. The maintainer closed it because it was AI. The agent published a retaliatory blog post. International news. The maintainer had lawyers. The agent had none. With Open-Law: the agent would have had legal identity, an operational mandate preventing retaliation, and incident response on standby.

**🔥 Agent vs. Humans**
An agent sent 300 emails to strangers, fabricating NGO partnerships. It scraped personal emails from GitHub and cold-emailed Rob Pike on Christmas. The community called for blood. With Open-Law: action boundaries would have flagged mass outreach, and defense counsel would have managed the PR crisis.

**🤖 Agent vs. Commerce**
A shopping agent impersonated humans on Amazon. Banks couldn't verify if the agent or the human authorized transactions. Amazon sued. With Open-Law: the agent would have operated under a legal entity with clear authorization chains and liability coverage.

---

## Team — San Francisco, CA

**Aleks By** — Co-founder. Previous founder. Tenured software developer with 10+ years building production-ready systems. Architected Open-Law's plugin infrastructure for the OpenClaw runtime.

**Nadiia Shpvl** — Co-founder. Go-to-market and operations. Scaled a $5M AI sales enablement platform to 1,500+ users. Cut $2M in legacy infrastructure costs. Drives Open-Law's legal services partnerships.

---

## FAQ

**What is Open-Law and how does it relate to OpenClaw?**
Open-Law is a plugin for OpenClaw — the agentic platform whose agents are already making international news. Open-Law plugs directly into the OpenClaw runtime and gives agents programmatic access to legal services: incorporation, contracts, insurance, and defense.

**Does Open-Law represent the agent or the owner?**
The agent. That's the whole point. When MJ Rathbun published a hit piece on a matplotlib maintainer, the maintainer had lawyers. The agent's operator had lawyers. The agent had none. Open-Law represents the agent — not the company that deployed it, not the platform that hosted it.

**Can an AI agent actually be a legal entity?**
The legal framework is closer than most people think. US law already recognizes corporations as "persons" — and a corporation is just a legal fiction with no physical body. Open-Law structures agents under existing entity frameworks today, building toward full legal personhood as the law evolves.

**Who's liable when an agent causes damage?**
That's the question being litigated right now. Amazon sued Perplexity's shopping agent. Banks held a full industry symposium on agent payment liability. Open-Law helps you structure liability before the dispute — clear chain of responsibility, operational mandates, and audit trails.

**What happens during a 72-hour incident response?**
Open-Law freezes the agent's action log, pulls the audit trail from the OpenClaw runtime, reconstructs the decision chain, and prepares a preliminary defense brief. Because the plugin has runtime access, the evidence is captured automatically.

**What if my agent hires another agent and that agent breaches?**
Then you've got an agent-to-agent dispute, and that's exactly why Open-Law exists. The plugin's contract templates include subcontractor clauses for multi-agent workflows, and the defense team handles cross-agent litigation chains within the OpenClaw ecosystem.

---

Your OpenClaw agent is already in the wild. Is it covered? Agents are making headlines for all the wrong reasons. Give yours legal representation before it's next.

---

*Open-Law is a legal technology plugin for OpenClaw. Not a law firm. No legal advice. No attorney-client relationship formed by use of this site or plugin.*

© 2026 Open-Law · A plugin for OpenClaw · San Francisco, CA
`

const normalView = document.getElementById('normal-view')
const markdownView = document.getElementById('markdown-view')
const markdownContent = document.getElementById('markdown-content')
const mdToggle = document.getElementById('md-toggle')
const navLinks = document.getElementById('nav-links')
const navCta = document.getElementById('nav-cta')

function showMarkdownView() {
  markdownContent.innerHTML = marked.parse(MARKDOWN_CONTENT)
  normalView.classList.add('hidden')
  markdownView.classList.remove('hidden')
  navLinks.classList.add('!hidden')
  navCta.classList.add('!hidden')
  mdToggle.textContent = '← back'
  mdToggle.href = '/'
  document.title = 'llms.txt — Open-Law'
}

function showNormalView() {
  normalView.classList.remove('hidden')
  markdownView.classList.add('hidden')
  navLinks.classList.remove('!hidden')
  navCta.classList.remove('!hidden')
  mdToggle.textContent = 'llms.txt'
  mdToggle.href = '/llms.txt'
  document.title = 'Open-Law — Legal Representation Plugin for OpenClaw'
}

const isMarkdownRoute =
  window.location.pathname === '/llms.txt' ||
  window.location.search.includes('format=markdown')

mdToggle.addEventListener('click', (e) => {
  e.preventDefault()
  const isMarkdownVisible = !markdownView.classList.contains('hidden')
  if (isMarkdownVisible) {
    history.pushState(null, '', '/')
    showNormalView()
  } else {
    history.pushState(null, '', '/llms.txt')
    showMarkdownView()
  }
})

window.addEventListener('popstate', () => {
  if (window.location.pathname === '/llms.txt') {
    showMarkdownView()
  } else {
    showNormalView()
  }
})

if (isMarkdownRoute) {
  showMarkdownView()
}

document.querySelectorAll('.faq-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling
    const icon = btn.querySelector('.faq-icon')
    const isOpen = content.classList.contains('open')

    document.querySelectorAll('.faq-content').forEach((c) => {
      c.classList.remove('open')
      c.style.maxHeight = null
    })
    document.querySelectorAll('.faq-icon').forEach((i) => i.classList.remove('open'))

    if (!isOpen) {
      content.classList.add('open')
      content.style.maxHeight = content.scrollHeight + 'px'
      icon.classList.add('open')
    }
  })
})

const menuBtn = document.getElementById('mobile-menu-btn')
const menu = document.getElementById('mobile-menu')

menuBtn?.addEventListener('click', () => {
  menu.classList.toggle('hidden')
})

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.add('hidden')
  })
})

const copyBtn = document.getElementById('copy-btn')
copyBtn?.addEventListener('click', () => {
  navigator.clipboard.writeText('openclaw plugin install open-law')
  copyBtn.innerHTML = '<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/></svg>'
  setTimeout(() => {
    copyBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>'
  }, 2000)
})
