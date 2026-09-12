/* ==============================
   components.js – Simple subfolder detector
   Works from any depth (assumes max 1 level deep)
   ============================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Helper: check if we're inside a subfolder ----
  function getRootPrefix() {
    const path = window.location.pathname;
    // If the URL contains any of our folder names, we need to go up one level
    if (path.includes('/blogs/') || 
        path.includes('/projects/') || 
        path.includes('/books/') ||
        path.includes('/turning-20/')) {
      return '../';
    }
    return '';  // We're in the root folder
  }

  const prefix = getRootPrefix();  // either "" or "../"

  // ---- NAVBAR (dynamic paths) ----
  const navbarHTML = `
    <nav>
      <a href="${prefix}index.html" class="nav-logo" aria-label="Basanta Saru home">
        <span class="brand-name">Basanta <span class="logo-dot" aria-hidden="true">✦</span> Saru</span>
      </a>
      <ul class="nav-links" id="navLinksList">
        <li><a href="${prefix}index.html" class="nav-home">Home</a></li>
        <li><a href="${prefix}blogs/blog.html" class="nav-blog"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg><span>Blog</span></a></li>
        <li><a href="${prefix}projects/project.html" class="nav-projects"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v5H4zM14 15h6v5h-6z"/></svg><span>Project</span></a></li>
        <li><a href="${prefix}books/books.html" class="nav-books"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5A3.5 3.5 0 0 1 7 4h5v16H7a3.5 3.5 0 0 0-3.5 1.5z"/><path d="M20.5 5.5A3.5 3.5 0 0 0 17 4h-5v16h5a3.5 3.5 0 0 1 3.5 1.5z"/></svg><span>Books</span></a></li>
        <li><a href="${prefix}digital-life.html" class="nav-digital-life"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 12l3-3 3 2 4-5"/></svg><span>Digital Life</span></a></li>
        <li><a href="${prefix}turning-20/index.html" class="nav-daily-journal"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h13a2 2 0 0 1 2 2v16H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"/><path d="M7 3v18M10 8h7M10 12h7M10 16h4"/></svg><span>Daily Journal</span></a></li>
        <li><a href="${prefix}next-version.html" class="nav-next-version"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17l5-5 4 3 7-9"/><path d="M15 6h5v5"/></svg><span>Next Version</span></a></li>
      </ul>
      <button class="hamburger" id="hamburgerBtn" aria-label="Open navigation menu" aria-controls="navLinksList" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
  `;

  // ---- FOOTER (dynamic paths) ----
  const footerHTML = `
    <footer>
      <p class="footer-title">Basanta Thapa — <span class="footer-location">Syangja, Nepal</span></p>
      <p class="mono footer-tagline">building at the intersection of wonder and logic · 2026</p>
      <ul class="footer-links">
        <li><a href="${prefix}index.html">Home</a></li>
        <li><a href="${prefix}blogs/blog.html"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg><span>Blog</span></a></li>
        <li><a href="${prefix}projects/project.html"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v5H4zM14 15h6v5h-6z"/></svg><span>Project</span></a></li>
        <li><a href="${prefix}books/books.html"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5A3.5 3.5 0 0 1 7 4h5v16H7a3.5 3.5 0 0 0-3.5 1.5z"/><path d="M20.5 5.5A3.5 3.5 0 0 0 17 4h-5v16h5a3.5 3.5 0 0 1 3.5 1.5z"/></svg><span>Books</span></a></li>
        <li><a href="${prefix}digital-life.html"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 12l3-3 3 2 4-5"/></svg><span>Digital Life</span></a></li>
        <li><a href="${prefix}turning-20/index.html"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h13a2 2 0 0 1 2 2v16H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"/><path d="M7 3v18M10 8h7M10 12h7M10 16h4"/></svg><span>Daily Journal</span></a></li>
        <li><a href="${prefix}next-version.html"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17l5-5 4 3 7-9"/><path d="M15 6h5v5"/></svg><span>Next Version</span></a></li>
      </ul>
    </footer>
  `;

  // ---- INJECT ----
  const navContainer = document.getElementById('navbar-container');
  if (navContainer) navContainer.innerHTML = navbarHTML;

  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) footerContainer.innerHTML = footerHTML;

  // ---- HIGHLIGHT ACTIVE PAGE ----
  highlightActiveLink();

  // ---- HAMBURGER MENU ----
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinksList = document.getElementById('navLinksList');
  if (hamburgerBtn && navLinksList) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('show');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      hamburgerBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
  }

});

// Helper: set 'active' class on current page's nav link
function highlightActiveLink() {
  const fullPath = window.location.pathname;
  const path = fullPath.split('/').pop() || 'index.html';

  if (fullPath.includes('/turning-20/')) {
    document.querySelector('.nav-daily-journal')?.classList.add('active');
    return;
  }

  const map = {
    'index.html': 'nav-home',
    'blog.html': 'nav-blog',
    'project.html': 'nav-projects',
    'goals.html': 'nav-goals',
    'books.html': 'nav-books',
    'digital-life.html': 'nav-digital-life',
    'next-version.html': 'nav-next-version',
  };
  const targetClass = map[path];
  if (!targetClass) return;
  const link = document.querySelector(`.${targetClass}`);
  if (link) link.classList.add('active');
}