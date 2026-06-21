// blog.js
// Dynamic blog posts data – add, remove, or edit posts here
const blogPosts = [
  {
    category: "Entrepreneurship · Failure",
    title: "Lessons From My First Failed Project",
    excerpt: "I wrote a complete book but couldn't sell it because of payment gateways. Here’s what the walls taught me about building, validation, and consistency.",
    date: "June 8, 2026",
    readTime: "8 min read",
    link: "blog/blog1.html",
image: "assets/img/blog1.png"
  }
];

function renderBlogGrid() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  grid.innerHTML = '';
  blogPosts.forEach(post => {
    const card = document.createElement('a');
    card.className = 'blog-card';
    card.href = post.link;
    if (post.link === '#') {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Full essay coming soon — but the featured post is live!');
      });
    }
    
    // Create thumbnail HTML with image if it exists
    const thumbHtml = post.image 
      ? `<div class="card-thumb"><img src="${post.image}" alt="${post.title}" class="thumb-img"></div>`
      : `<div class="card-thumb"></div>`;
    
    card.innerHTML = `
      ${thumbHtml}
      <div class="card-content">
        <div class="card-category">${post.category}</div>
        <div class="card-title">${post.title}</div>
        <div class="card-excerpt">${post.excerpt}</div>
        <div class="card-meta">
          <span>📅 ${post.date}</span>
          <span>⏱️ ${post.readTime}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Simple helper to prevent XSS issues
function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Optional: add a subtle highlight to the first (featured) essay
function highlightFeaturedCard() {
  const grid = document.getElementById('blogGrid');
  if (!grid || !grid.firstChild) return;
  const featuredCard = grid.firstChild;
  if (featuredCard) {
    featuredCard.style.border = '1px solid rgba(201, 126, 90, 0.4)';
    featuredCard.style.boxShadow = '0 10px 25px -8px rgba(201,126,90,0.2)';
    const thumbDiv = featuredCard.querySelector('.card-thumb');
    if (thumbDiv) {
      thumbDiv.style.background = 'linear-gradient(135deg, #2d1a0e, #5a3a2a)';
    }
  }
}

// Initialize everything when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  renderBlogGrid();
  highlightFeaturedCard();
});

// Graceful fallback for navbar/footer if components.js is missing
(function() {
  window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.componentsLoaded === 'undefined') {
      const navContainer = document.getElementById('navbar-container');
      const footerContainer = document.getElementById('footer-container');
      
      if (navContainer && navContainer.children.length === 0) {
        navContainer.innerHTML = `<nav style="padding: 1.2rem 2rem; border-bottom: 1px solid rgba(230,225,215,0.08); max-width: 1200px; margin: 0 auto; display: flex; gap: 2rem; justify-content: center; font-family: 'DM Mono', monospace; font-size: 0.85rem;">
          <a href="/" style="color: #e2c6a0; text-decoration: none;">Home</a>
          <a href="/blog" style="color: #bcb2a4; text-decoration: none;">Blog</a>
          <a href="/projects" style="color: #bcb2a4; text-decoration: none;">Projects</a>
          <a href="/about" style="color: #bcb2a4; text-decoration: none;">About</a>
        </nav>`;
      }
      
      if (footerContainer && footerContainer.children.length === 0) {
        footerContainer.innerHTML = `<footer style="text-align: center; padding: 2rem 1rem 3rem; color: #7e6f5e; font-size: 0.75rem; border-top: 1px solid rgba(230,225,215,0.06); margin-top: 2rem;">
          <p>✧ Basanta Thapa — writing at the intersection of craft, code, and curiosity ✧</p>
        </footer>`;
      }
    }
  });
})();