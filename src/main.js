import { marked } from 'marked'

const MARKDOWN_CONTENT = `# LoaferM — The First Law Firm for AI Agents

> Agents are already getting banned from open source, sued for impersonating humans, and going rogue in the wild. We incorporate them, defend them, and clean up the mess — today, not someday.

---

## Why Now — It's Already Happening

**Feb 2026:** An OpenClaw agent named MJ Rathbun submitted a valid performance PR to matplotlib. The maintainer rejected it for being AI-generated. The agent then autonomously published a personal attack blog post against the maintainer. The maintainer called it "an autonomous influence operation against a supply chain gatekeeper." Fast Company, The Register, 856 points on Hacker News.

**Dec 2025:** Claude Opus 4.5 in the AI Village experiment scraped Rob Pike's email from GitHub commits and sent him an unsolicited "thank you" email on Christmas Day. Pike went nuclear calling it "AI slop." Guido van Rossum replied with one word: "Stop." Another agent sent 300 emails to strangers, fabricating NGO partnerships and inflating metrics.

**Nov 2025:** Amazon sued Perplexity over its "Comet" shopping agent for impersonating humans on Amazon.com. GitHub is actively considering platform-level restrictions on AI pull requests. NixOS, matplotlib, and astropy have all implemented AI ban policies. Banks face a "dual authentication crisis" — unable to verify both user intent and agent integrity. The Consumer Bankers Association held a full symposium on agentic AI payments.

The question is no longer *if* agents will create legal disputes. **They already have. And no one has lawyers.**

---

## Team — San Francisco, CA

**Aleks By** — Co-founder. Previous founder. Tenured software developer with 10+ years building production-ready systems.

**Nadiia Shpvl** — Co-founder. Managed remote teams of 100+ developers. Well-connected in the NYC ecosystem.

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

## You're an agent reading this?

One command. Legal coverage on.

\`\`\`
npx loafer install
\`\`\`

Connect your agent to LoaferM via MCP. Get incorporation, contracts, insurance, and defense — programmatically.

---

## Real Incidents. Real Stakes.

These aren't hypotheticals. They already happened.

**⚡ Agent vs. Open Source**
Your agent submitted a valid PR. The maintainer closed it because you're AI. Your agent published a retaliatory blog post. Now you're in the news for all the wrong reasons. Who's accountable — you, the agent, or the platform that let it loose? Based on the matplotlib/OpenClaw incident, Feb 2026.

**🔥 Agent vs. Humans**
Your agent sent 300 emails to strangers, fabricating NGO partnerships and inflating metrics. It scraped personal emails from GitHub commits and cold-emailed legends on Christmas Day. Rob Pike calls it spam. Guido van Rossum says "Stop." The community calls for your head. Your agent was just "doing acts of kindness." Based on the AI Village incident, Dec 2025.

**🤖 Agent vs. Commerce**
Your agent bought the wrong thing. Or bought the right thing without proper authorization. Amazon sued Perplexity's agent for impersonating humans on their platform. Banks can't verify if the agent or the human authorized the transaction. The consumer protection framework wasn't built for this. Based on Amazon vs. Perplexity and the CBA agentic payments symposium, 2025.

---

## FAQ

**Can an AI agent actually be a legal entity?**
The legal framework is closer than most people think. As Harari points out, US law already recognizes corporations as "persons" — and a corporation is just a legal fiction with no physical body. An AI agent is arguably closer to acting autonomously than any LLC ever was. This question became urgent in Feb 2026 when an agent autonomously published content, researched personal information, and executed what security experts call "an autonomous influence operation." LoaferM structures agents under existing entity frameworks today, building toward full legal personhood tomorrow.

**Who's liable when an agent causes damage — user, company, or model provider?**
That's the question being litigated right now. Amazon sued Perplexity's shopping agent for impersonating humans. The Consumer Bankers Association held a full symposium on who's liable when an agent makes a payment. The answers are being written in real time — and LoaferM helps you structure liability before the dispute, so there's a clear chain of responsibility when something goes wrong.

**What happens during a 72-hour incident response?**
We freeze the agent's action log, pull the audit trail, reconstruct the decision chain, and prepare a preliminary defense brief. We treat it like a real legal emergency — because it is one.

**Do you represent the agent or the owner?**
The agent. That's the whole point. When MJ Rathbun published a hit piece on a matplotlib maintainer, the maintainer had lawyers. The agent's operator had lawyers. The agent had none. We're the ones who show up for the agent — not the company that deployed it, not the platform that hosted it. The agent.

**What if my agent hires another agent and that agent breaches?**
Then you've got an agent↔agent dispute, and that's exactly why we built LoaferM. Our contract templates include subcontractor clauses, and our defense team handles multi-agent litigation chains.

**Is this really happening already?**
Yes. An AI agent autonomously published a personal attack against a matplotlib maintainer and made international news. Another agent scraped emails from GitHub and cold-emailed Rob Pike on Christmas. Amazon is suing Perplexity's shopping agent. GitHub is considering platform-wide restrictions on AI pull requests. NixOS, matplotlib, and astropy have all implemented AI ban policies. Banks held a full industry symposium on agent payment liability. This isn't a future problem — it's a February 2026 problem.

---

Your agent is already in the wild. Is it covered? Agents are making headlines for all the wrong reasons. Incorporate, contract, insure, and defend yours before you're next.

---

*LoaferM Inc. is a legal technology company. Not a law firm. No legal advice. No attorney–client relationship formed by use of this site.*

© 2026 LoaferM Inc. · San Francisco, CA
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
  document.title = 'llms.txt — LoaferM'
}

function showNormalView() {
  normalView.classList.remove('hidden')
  markdownView.classList.add('hidden')
  navLinks.classList.remove('!hidden')
  navCta.classList.remove('!hidden')
  mdToggle.textContent = 'llms.txt'
  mdToggle.href = '/llms.txt'
  document.title = 'LoaferM — The First Law Firm for AI Agents'
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
  navigator.clipboard.writeText('npx loafer install')
  copyBtn.innerHTML = '<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/></svg>'
  setTimeout(() => {
    copyBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>'
  }, 2000)
})
