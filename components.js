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
        path.includes('/books/')) {
      return '../';
    }
    return '';  // We're in the root folder
  }

  const prefix = getRootPrefix();  // either "" or "../"

  // ---- NAVBAR (dynamic paths) ----
  const navbarHTML = `
    <nav>
      <a href="${prefix}index.html" class="nav-logo" aria-label="Basanta Saru home">
        <span class="brand-mark" aria-hidden="true">B.S</span>
      </a>
      <ul class="nav-links" id="navLinksList">
        <li><a href="${prefix}index.html" class="nav-home">Home</a></li>
        <li><a href="${prefix}blogs/blog.html" class="nav-blog">Blog</a></li>
        <li><a href="${prefix}projects/project.html" class="nav-projects">Project</a></li>
        <li><a href="${prefix}books/books.html" class="nav-books">Books</a></li>
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
        <li><a href="${prefix}blogs/blog.html">Blog</a></li>
        <li><a href="${prefix}projects/project.html">Project</a></li>
        <li><a href="${prefix}books/books.html">Books</a></li>
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
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home',
    'blog.html': 'nav-blog',
    'project.html': 'nav-projects',
    'goals.html': 'nav-goals',
    'books.html': 'nav-books',
  };
  const targetClass = map[path];
  if (!targetClass) return;
  const link = document.querySelector(`.${targetClass}`);
  if (link) link.classList.add('active');
}