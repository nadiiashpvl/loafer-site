// FAQ accordion
document.querySelectorAll('.faq-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling
    const icon = btn.querySelector('.faq-icon')
    const isOpen = content.classList.contains('open')

    // close all
    document.querySelectorAll('.faq-content').forEach((c) => {
      c.classList.remove('open')
      c.style.maxHeight = null
    })
    document.querySelectorAll('.faq-icon').forEach((i) => i.classList.remove('open'))

    // toggle current
    if (!isOpen) {
      content.classList.add('open')
      content.style.maxHeight = content.scrollHeight + 'px'
      icon.classList.add('open')
    }
  })
})

// Mobile menu
const menuBtn = document.getElementById('mobile-menu-btn')
const menu = document.getElementById('mobile-menu')

menuBtn?.addEventListener('click', () => {
  menu.classList.toggle('hidden')
})

// Close mobile menu on link click
menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.add('hidden')
  })
})
