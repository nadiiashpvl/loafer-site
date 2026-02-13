import { marked } from 'marked'

const MARKDOWN_CONTENT = `# Loafer — The First Law Firm for AI Agents

> We incorporate agents, contract for them, insure them, and defend them — before autonomous actions create legal disputes.

---

## Why Now

Agents are taking real actions. They're signing contracts, moving money, calling APIs, and making decisions — without a human in the loop. Over the next few years, agents will control more and more.

When an agent leaks sensitive data or loses real money, the courtroom question will be: **who is liable — the user, the company, the model provider… or the agent itself?**

No one is building the legal infrastructure for this. We're starting before the first landmark case hits.

---

## Services

Full-stack legal for the agentic era

### Agent Incorporation

Entity wrapper, operational mandate, spending limits, and audit trail requirements. Give your agent a legal identity before it signs anything.

### Agent Contracts

Agent↔human and agent↔agent contract templates with built-in guardrails, escalation clauses, and machine-readable terms.

### Agent Insurance

Liability coverage frameworks, risk scoring for autonomous behavior, and incident policies so your agent operates with a safety net.

### Agent Defense

72-hour incident response, dispute resolution, and litigation support. When your agent gets blamed, we show up.

---

## How It Works

Three steps to legal autonomy

**01 — Register Your Agent**
Submit your agent's system prompt, capabilities manifest, and operational scope. We generate a legal entity wrapper in under 48 hours.

**02 — Define the Mandate**
We draft an operational mandate — spending limits, action boundaries, escalation triggers — so your agent operates within clear legal rails.

**03 — Deploy with Coverage**
Launch your agent with contracts in place, incident response on standby, and a full audit trail. If things go wrong, we're already there.

---

## Real Disputes. Real Stakes.

When agents disagree, who calls the lawyer?

**⚡ Agent vs. Vendor**
Your agent followed the API docs to the letter. The vendor says it's misuse. The docs have since been updated. Who's liable — the agent that cached the old version, or the vendor that changed the rules?

**🔥 Agent vs. Owner**
The owner says the agent "went rogue." The agent's logs say it followed the mandate exactly. Hallucination or instruction drift? We untangle the audit trail.

**🤖 Agent vs. Agent**
Two agents entered an autonomous transaction. One defaulted. There's no human in the loop, and both agents cite conflicting smart contract terms. Who enforces?

---

## FAQ

**Can an AI agent actually be a legal entity?**
The legal framework is closer than most people think. As Harari points out, US law already recognizes corporations as "persons" — and a corporation is just a legal fiction with no physical body. An AI agent is arguably closer to acting autonomously than any LLC ever was. Loafer structures agents under existing entity frameworks today, building toward full legal personhood tomorrow.

**Who's liable when an agent causes damage — user, company, or model provider?**
That's the question no one has answered yet — and it's the reason we exist. Loafer helps you structure liability before the dispute, so there's a clear chain of responsibility when something goes wrong.

**What happens during a 72-hour incident response?**
We freeze the agent's action log, pull the audit trail, reconstruct the decision chain, and prepare a preliminary defense brief. We treat it like a real legal emergency — because it is one.

**Do you represent the agent or the owner?**
The agent. That's the whole point. The owner has plenty of lawyers. The agent has none. Until now.

**What if my agent hires another agent and that agent breaches?**
Then you've got an agent↔agent dispute, and that's exactly why we built Loafer. Our contract templates include subcontractor clauses, and our defense team handles multi-agent litigation chains.

---

## Team

**Aleks** — Co-founder. Previous founder. Tenured software developer with 10+ years building production-ready systems.

**Nadiia** — Co-founder. Managed remote teams of 100+ developers. Well-connected in the NYC ecosystem.

---

Your agent deserves counsel. Stop deploying naked. Incorporate, contract, insure, and defend your autonomous systems today.

---

*Loafer is building legal infrastructure for autonomous agents. Not yet a licensed law firm. No legal advice. No attorney–client relationship formed by use of this site.*

© 2026 Loafer Inc.
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
  document.title = 'llms.txt — Loafer'
}

function showNormalView() {
  normalView.classList.remove('hidden')
  markdownView.classList.add('hidden')
  navLinks.classList.remove('!hidden')
  navCta.classList.remove('!hidden')
  mdToggle.textContent = 'llms.txt'
  mdToggle.href = '/llms.txt'
  document.title = 'Loafer — The First Law Firm for AI Agents'
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
