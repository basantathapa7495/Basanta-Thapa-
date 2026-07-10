/* ========================================================
   BOOKS PAGE — interactions
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile Nav Toggle ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('show'));
    });
  }

  /* ---------- Scroll Fade-in Animation ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    // Start hidden
    fadeEls.forEach(el => el.classList.add('fade-up-initial'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('fade-up-initial');
          entry.target.classList.add('fade-up-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ---------- Waitlist Form ---------- */
  const form = document.getElementById('waitlistForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('waitlistEmail');
      const email = emailInput.value.trim();

      // Basic email validation
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValid) {
        emailInput.style.borderColor = '#b45f3a';
        emailInput.focus();
        return;
      }

      // TODO: Replace with real backend / Formspree / Mailchimp endpoint
      console.log('Waitlist signup:', email);

      // Show success message
      form.innerHTML = `
        <div class="waitlist-success show">
          ✨ You're on the list! I'll email you the moment <em>The Lie of Modern Life</em> launches.
        </div>
      `;
    });
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