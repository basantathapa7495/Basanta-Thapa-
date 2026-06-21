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
        <li><a href="about.html" class="nav-about">About</a></li>
        <li><a href="blog.html" class="nav-blog">Blog</a></li>
        <li><a href="projects.html" class="nav-projects">Projects</a></li>
        <li><a href="reading.html" class="nav-reading">Reading</a></li>
        <li><a href="journal.html" class="nav-journal">Journal</a></li>
        <li><a href="goals.html" class="nav-goals">Goals</a></li>
        <li><a href="books.html" class="nav-books">Books</a></li>
        <li><a href="contact.html" class="nav-contact">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <button class="music-toggle" id="musicBtn">🎧 vibe</button>
      </div>
    </nav>
  `;

  // ---- FOOTER HTML -------------------------------------------------
  const footerHTML = `
    <footer>
      <div class="container">
        <!-- ====== CONTACT / SOCIAL ====== -->
        <div class="social-section">

        
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

  // ---- INJECT INTO PAGE --------------------------------------------
  const navContainer = document.getElementById('navbar-container');
  if (navContainer) navContainer.innerHTML = navbarHTML;

  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) footerContainer.innerHTML = footerHTML;

  // ---- HIGHLIGHT ACTIVE PAGE IN NAV --------------------------------
  highlightActiveLink();

  // ---- INITIALIZE HAMBURGER MENU -----------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinksList = document.getElementById('navLinksList');
  if (hamburgerBtn && navLinksList) {
    hamburgerBtn.addEventListener('click', () => {
      navLinksList.classList.toggle('show');
    });
  }

  // ---- INITIALIZE MUSIC BUTTON (ADD THIS!) -------------------------
  initMusicButton();
});

// Helper: set 'active' class on current page's nav link
function highlightActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home',
    'about.html': 'nav-about',
    'blog.html': 'nav-blog',
    'projects.html': 'nav-projects',
    'reading.html': 'nav-reading',
    'journal.html': 'nav-journal',
    'goals.html': 'nav-goals',
    'books.html': 'nav-books',
    'contact.html': 'nav-contact'
  };
  const targetClass = map[path];
  if (!targetClass) return;
  const link = document.querySelector(`.${targetClass}`);
  if (link) link.classList.add('active');
}

// ---- MUSIC BUTTON FUNCTION (ADD THIS!) ----------------------------
function initMusicButton() {
  const musicBtn = document.getElementById("musicBtn");
  if (!musicBtn) return;
  
  let audioElement = null;
  let isMusicOn = false;
  
  function initAudio() {
    audioElement = new Audio("music.mp3");
    audioElement.loop = true;
    audioElement.volume = 0.25;
  }
  
  musicBtn.addEventListener("click", () => {
    if (!audioElement) initAudio();
    if (!isMusicOn) {
      audioElement.play().catch(e => console.log("autoplay blocked:", e));
      musicBtn.innerHTML = "🔇 mute";
      musicBtn.style.borderColor = "#d8a25c";
      isMusicOn = true;
    } else {
      audioElement.pause();
      musicBtn.innerHTML = "🎧 vibe";
      musicBtn.style.borderColor = "";
      isMusicOn = false;
    }
  });
}