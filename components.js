/* ==============================
   components.js
   Works without fetch – good for local file:// testing
   ============================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR HTML -------------------------------------------------
  const navbarHTML = `
    <nav>
      <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <a href="index.html" class="nav-logo">
        Basanta <span class="logo-dot">✦</span> Saru
      </a>
      <ul class="nav-links" id="navLinksList">
        <li><a href="index.html" class="nav-home">Home</a></li>
        <li><a href="blog.html" class="nav-blog">Blog</a></li>
        <li><a href="projects.html" class="nav-projects">Projects</a></li>
        <li><a href="goals.html" class="nav-goals">Goals</a></li>
        <li><a href="books.html" class="nav-books">Books</a></li>
      </ul>
      <div class="nav-actions">
        <button class="music-toggle" id="musicBtn">🎧 vibe</button>
      </div>
      <audio id="bgMusic" loop>
      <source src="music.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </nav>
  `;

  // ---- FOOTER HTML -------------------------------------------------
  const footerHTML = `
    <footer>
      <div class="container">
        <!-- ====== CONTACT / SOCIAL ====== -->
        <div class="social-section">
          <div class="section-label">📱 let's connect</div>
          <div class="social-icons">
            <a href="https://www.tiktok.com/@basanta_saru1" target="_blank" class="social-icon">
              <img src="assets/img/tiktok.jpg" alt="TikTok">
            </a>
            <a href="https://www.youtube.com/@basantasaru" target="_blank" class="social-icon">
              <img src="assets/img/youtube.jpg" alt="YouTube">
            </a>
            <a href="https://www.instagram.com/ba.santa_saru" target="_blank" class="social-icon">
              <img src="assets/img/insta.jpg" alt="Instagram">
            </a>
            <a href="https://wa.me/9779806532910" target="_blank" class="social-icon">
              <img src="assets/img/wp.jpg" alt="WhatsApp">
            </a>
            <a href="mailto:basantathapa2898@gmail.com" class="social-icon">
              <img src="assets/img/email.jpg" alt="Email">
            </a>
          </div>
        </div>
        
        <p class="footer-title">Basanta Thapa — <span class="footer-location">Syangja, Nepal</span></p>
        <p class="mono footer-tagline">building at the intersection of wonder and logic · 2026</p>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="reading.html">Reading</a></li>
          <li><a href="journal.html">Journal</a></li>
          <li><a href="goals.html">Goals</a></li>
          <li><a href="books.html">Books</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </footer>
  `;

// ---- INJECT INTO PAGE ----
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
    navLinksList.classList.toggle('show');
  });
}

// ====== ✅ MUSIC TOGGLE (moved here) ======
const musicBtn = document.getElementById('musicBtn');
const audio = document.getElementById('bgMusic');

if (musicBtn && audio) {
  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(err => console.warn('Playback error:', err));
      musicBtn.textContent = '🔊 vibe';
    } else {
      audio.pause();
      musicBtn.textContent = '🎧 vibe';
    }
  });
}
});
// Helper: set 'active' class on current page's nav link
function highlightActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home',
    'blog.html': 'nav-blog',
    'projects.html': 'nav-projects',
    'goals.html': 'nav-goals',
    'books.html': 'nav-books',
  };
  const targetClass = map[path];
  if (!targetClass) return;
  const link = document.querySelector(`.${targetClass}`);
  if (link) link.classList.add('active');
}
