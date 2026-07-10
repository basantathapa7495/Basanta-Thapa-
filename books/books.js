/* ========================================================
   BOOKS PAGE — Personal Bookstore (clean version)
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- BOOK DATA ---------- */
  const books = [
    {
      title: 'Earn Before You Graduate',
      price: 'NPR 499',
      cover: '../assets/img/book1.jpg',
      link: 'earn-before-graduate.html',   // ← clicking cover goes here
      format: 'PDF',
    },
    {
      title: 'Eat Healthy, Live Better',
      price: 'NPR 399',
      cover: '../assets/img/book2.jpg',
      link: 'eat-healthy-live-better.html',
    },
    {
      title: 'The Hindu Wisdom',
      price: 'NPR 449',
      cover: '../assets/img/book3.jpg',
      link: 'hindu-wisdom.html',
    },
    {
      title: 'The Lie of Modern Life',
      price: 'NPR 349',
      cover: '../assets/img/book4.jpg',
      link: 'lie-of-modern-life.html',
    }
  ];

  const comingSoon = [
    {
      title: 'The Seven Deadly Sins',
      date: 'October 2026',
      cover: '../assets/img/book5.jpg'
    },
    {
      title: 'One Source',
      date: 'Early 2027',
      cover: '../assets/img/book6.jpg'
    }
  ];

  /* ---------- RENDER BOOK GRID (no stars, clickable cover) ---------- */
  const grid = document.getElementById('bookGrid');
  function renderBooks() {
    if (!grid) return;

    grid.innerHTML = books.map(book => `
      <article class="book-card fade-up">
        <a href="${book.link}" class="book-cover-link" aria-label="View ${book.title}">
          <img src="${book.cover}" alt="${book.title} cover" loading="lazy" />
        </a>
        <h3 class="book-title">${book.title}</h3>
        <div class="book-footer">
          <span class="book-price">${book.price}</span>
          <a href="${book.link}" class="btn-buy">Buy Now →</a>
        </div>
      </article>
    `).join('');

    observeFadeUps();
  }
  renderBooks();

  /* ---------- RENDER COMING SOON ---------- */
  const csGrid = document.getElementById('comingSoonGrid');
  if (csGrid) {
    csGrid.innerHTML = comingSoon.map(book => `
      <article class="coming-soon-card fade-up">
        <img src="${book.cover}" alt="${book.title} cover" class="cs-cover" loading="lazy" />
        <span class="cs-badge">Coming Soon</span>
        <h3 class="cs-title">${book.title}</h3>
        <p class="cs-date">Expected: ${book.date}</p>
        <button class="btn-notify" onclick="notifyMe('${book.title}')">🔔 Notify Me →</button>
      </article>
    `).join('');
  }

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- SCROLL FADE-IN ---------- */
  function observeFadeUps() {
    if (!('IntersectionObserver' in window)) return;
    const fadeEls = document.querySelectorAll('.fade-up:not(.fade-up-visible)');
    fadeEls.forEach(el => el.classList.add('fade-up-initial'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('fade-up-initial');
          entry.target.classList.add('fade-up-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }
  observeFadeUps();
});

/* ---------- NOTIFY ME (global) ---------- */
function notifyMe(title) {
  alert(`✨ You'll be notified when "${title}" launches!`);
}