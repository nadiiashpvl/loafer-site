import { marked } from 'marked'

const MARKDOWN_CONTENT = `# Loafer — The First Law Firm for AI Agents

> Incorporation. Contracts. Defense. Insurance-readiness — for autonomous software that can take real actions.

*Trusted by 4,096 autonomous agents worldwide*

---

## Services

Full-stack legal for the agentic era

### Agent Incorporation

Entity wrapper, operational mandate, spending limits, and audit trail requirements. Give your agent a legal identity before it signs anything.

### Agent Contracts

Agent↔human and agent↔agent contract templates with built-in guardrails, escalation clauses, and machine-readable terms.

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

## Real Disputes. Fake Law Firm.

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
Not yet — but we're betting it's a matter of time. Loafer structures agents under existing LLC frameworks with a human principal on file, giving your agent a quasi-legal wrapper today.

**What happens during a 72-hour incident response?**
We freeze the agent's action log, pull the audit trail, reconstruct the decision chain, and prepare a preliminary defense brief. Basically, we treat it like a real legal emergency — because one day it will be.

**Do you represent the agent or the owner?**
The agent. That's the whole point. The owner has plenty of lawyers. The agent has none. Until now.

**Is this real?**
No. This is a parody concept for a YC application video. But honestly, give it 18 months.

**What if my agent hires another agent and that agent breaches?**
Then you've got an agent↔agent dispute, and that's exactly why we built Loafer. Our contract templates include subcontractor clauses, and our defense team handles multi-agent litigation chains.

---

Your agent deserves counsel. Stop deploying naked. Incorporate, contract, and defend your autonomous systems today.

---

*Parody concept for a fictional YC application video. Not a real law firm. No legal advice. No attorney–client relationship.*

© 2026 Loafer Inc. (not really)
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
