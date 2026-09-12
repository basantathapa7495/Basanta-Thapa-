const body = document.body;
const themeButton = document.getElementById('themeButton');
const progress = document.getElementById('readingProgress');
const year = document.getElementById('year');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('basanta-journal-theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  themeButton.setAttribute('aria-pressed', 'true');
  themeButton.setAttribute('aria-label', 'Switch to dark mode');
}

themeButton.addEventListener('click', () => {
  const light = body.classList.toggle('light');
  themeButton.setAttribute('aria-pressed', String(light));
  themeButton.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  localStorage.setItem('basanta-journal-theme', light ? 'light' : 'dark');
});

function updateReadingProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
}

window.addEventListener('scroll', updateReadingProgress, { passive: true });
updateReadingProgress();

const revealItems = document.querySelectorAll('.reveal:not(.is-visible)');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });
  revealItems.forEach(item => revealObserver.observe(item));
}

const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));
