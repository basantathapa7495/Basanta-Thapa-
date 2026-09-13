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
        path.includes('/digital/') ||
        path.includes('/journal/') ||
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
        <li><a href="${prefix}index.html" class="nav-home"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10M9.5 20v-6h5v6"/></svg><span>Home</span></a></li>
        <li><a href="${prefix}blogs/blog.html" class="nav-blog"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg><span>Blog</span></a></li>
        <li><a href="${prefix}projects/project.html" class="nav-projects"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v5H4zM14 15h6v5h-6z"/></svg><span>Project</span></a></li>
        <li><a href="${prefix}books/books.html" class="nav-books"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5A3.5 3.5 0 0 1 7 4h5v16H7a3.5 3.5 0 0 0-3.5 1.5z"/><path d="M20.5 5.5A3.5 3.5 0 0 0 17 4h-5v16h5a3.5 3.5 0 0 1 3.5 1.5z"/></svg><span>Books</span></a></li>
        <li><a href="${prefix}digital/digital.html" class="nav-digital-life"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 12l3-3 3 2 4-5"/></svg><span>Digital Life</span></a></li>
        <li><a href="${prefix}journal/journal.html" class="nav-daily-journal"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h13a2 2 0 0 1 2 2v16H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"/><path d="M7 3v18M10 8h7M10 12h7M10 16h4"/></svg><span>Daily Journal</span></a></li>
        <li><a href="${prefix}next-version.html" class="nav-next-version"><svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17l5-5 4 3 7-9"/><path d="M15 6h5v5"/></svg><span>Next Version</span></a></li>
      </ul>
      <button class="hamburger" id="hamburgerBtn" aria-label="Open navigation menu" aria-controls="navLinksList" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <a
        href="https://wa.me/9779806532844?text=Hi%20Basanta%2C%20I%20found%20your%20website."
        class="message-basanta-btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Basanta on WhatsApp"
      >
        <span class="message-label-desktop">Message to Basanta</span>
        <span class="message-label-mobile">Message</span>
      </a>
    </nav>
  `;

  // ---- FOOTER (dynamic paths) ----
  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-orbit footer-orbit-one" aria-hidden="true"></div>
      <div class="footer-orbit footer-orbit-two" aria-hidden="true"></div>

      <div class="footer-inner">
        <div class="footer-main">
          <section class="footer-brand-block" aria-label="About Basanta Saru">
            <a href="${prefix}index.html" class="footer-brand">
              Basanta <span aria-hidden="true">✦</span> Saru
            </a>
            <p>Learning, building, and documenting the real journey—one small improvement at a time.</p>
            <div class="footer-now">
              <i></i>
              <span>Learning in public</span>
              <b>Age 20</b>
            </div>
          </section>

          <div class="footer-column">
            <h2>Explore</h2>
            <ul>
              <li><a href="${prefix}index.html">Home <span>↗</span></a></li>
              <li><a href="${prefix}projects/project.html">Projects <span>↗</span></a></li>
              <li><a href="${prefix}blogs/blog.html">Learning notes <span>↗</span></a></li>
              <li><a href="${prefix}books/books.html">Books &amp; guides <span>↗</span></a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h2>Journey</h2>
            <ul>
              <li><a href="${prefix}digital/digital.html">Digital Life <span>↗</span></a></li>
              <li><a href="${prefix}journal/journal.html">Daily Journal <span>↗</span></a></li>
              <li><a href="${prefix}next-version.html">Next Version <span>↗</span></a></li>
            </ul>
          </div>

          <div class="footer-connect">
            <h2>Stay connected</h2>
            <p>Follow the work, share an idea, or simply say hello.</p>

            <a href="https://www.youtube.com/@basantasaru" target="_blank" rel="noopener noreferrer" class="footer-social-link">
              <span class="footer-social-icon youtube">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10 9 5 3-5 3z"/></svg>
              </span>
              <span><small>Watch the journey</small><strong>YouTube</strong></span>
              <b>→</b>
            </a>

            <a href="https://wa.me/9779806532844?text=Hi%20Basanta%2C%20I%20found%20your%20website." target="_blank" rel="noopener noreferrer" class="footer-social-link">
              <span class="footer-social-icon whatsapp">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.3-4.2a8.5 8.5 0 1 1 15.7-4.6Z"/><path d="M8.2 7.8c.8 3.5 3 5.7 6.5 6.6l1.3-1.5 2.1 1c-.2 1.8-1.4 3-3.2 3-4.5-.4-8.2-4-8.6-8.5 0-1.4.7-2.5 2.1-3l1.1 2.1Z"/></svg>
              </span>
              <span><small>Start a conversation</small><strong>WhatsApp</strong></span>
              <b>→</b>
            </a>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 Basanta Saru</p>
          <p class="footer-principle">Better, not perfect.</p>
          <p>Syangja, Nepal</p>
        </div>
      </div>
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

  if (fullPath.includes('/turning-20/') || fullPath.includes('/journal/')) {
    document.querySelector('.nav-daily-journal')?.classList.add('active');
    return;
  }

  const map = {
    'index.html': 'nav-home',
    'blog.html': 'nav-blog',
    'project.html': 'nav-projects',
    'goals.html': 'nav-goals',
    'books.html': 'nav-books',
    'digital.html': 'nav-digital-life',
    'journal.html': 'nav-daily-journal',
    'next-version.html': 'nav-next-version',
  };
  const targetClass = map[path];
  if (!targetClass) return;
  const link = document.querySelector(`.${targetClass}`);
  if (link) link.classList.add('active');
}