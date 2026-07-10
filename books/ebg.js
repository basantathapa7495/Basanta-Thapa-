/* ========================================================
   EBG PAGE — interactions
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile Nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('show'));
    });
  }

  /* ---------- Main Buy Button → Scrolls to format picker ---------- */
  const mainBuyBtn = document.getElementById('mainBuyBtn');
  if (mainBuyBtn) {
    mainBuyBtn.addEventListener('click', () => {
      const buySection = document.querySelector('.buy-section');
      if (buySection) {
        buySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ---------- Format Card Buy Buttons → Redirect to store ---------- */
  document.querySelectorAll('.format-card').forEach(card => {
    const btn = card.querySelector('.format-buy-btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = card.dataset.url;
      const format = card.dataset.format;
      const price = card.dataset.price;

      // TODO: Replace with real analytics/tracking if desired
      console.log(`Purchase initiated: ${format} — $${price}`);

      // Redirect to store
      if (url && !url.includes('YOUR_')) {
        window.open(url, '_blank', 'noopener');
      } else {
        alert(`🛒 This will link to the ${format} store page.\n\nReplace the data-url in the HTML with your real Amazon/Gumroad/Audible link.`);
      }
    });
  });

  /* ---------- Download Sample Button ---------- */
  const downloadBtn = document.getElementById('downloadSampleBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // TODO: Replace with real PDF link
      alert('📥 Sample chapter download will be available soon.\n\nReplace this with a link to your PDF file (e.g., "samples/ebg-chapter1.pdf").');
    });
  }

  /* ---------- Sticky Buy Bar — Show after scrolling past hero ---------- */
  const stickyBar = document.getElementById('stickyBuyBar');
  const heroSection = document.querySelector('.book-hero');
  if (stickyBar && heroSection && window.innerWidth <= 900) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          stickyBar.classList.add('show');
        } else {
          stickyBar.classList.remove('show');
        }
      });
    }, { threshold: 0 });
    observer.observe(heroSection);
  }

  /* ---------- Fade-up on scroll ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
    });
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.1)';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  /* ---------- Mood Toggle (placeholder) ---------- */
  const musicToggle = document.getElementById('musicToggle');
  if (musicToggle) {
    let moodOn = false;
    musicToggle.addEventListener('click', () => {
      moodOn = !moodOn;
      musicToggle.textContent = moodOn ? '🎵 Mood On' : '🎵 Mood';
      musicToggle.style.borderColor = moodOn ? 'var(--soft-amber)' : '';
      musicToggle.style.color = moodOn ? 'var(--soft-amber)' : '';
    });
  }

});