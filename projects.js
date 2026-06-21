// projects.js
// Dynamic projects data – add, remove, or edit projects here
const projects = [
  {
    icon: "📖",
    title: "The Nutrition Knowledge Book",
    description: "A practical, evidence-based guide to understanding what you eat — from macros to micronutrients, debunking myths, and building sustainable eating habits.",
    tech: ["Writing", "Research", "Evidence-based"],
    status: "Beta · v0.8",
    link: "project/project1.html",
    image: "assets/img/project1.png"
  }
];

function renderProjectsGrid() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  projects.forEach(project => {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = project.link;
    
    if (project.link === '#') {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Project details coming soon!');
      });
    }
    
    // Create thumbnail HTML with image if it exists
    const thumbHtml = project.image 
      ? `<div class="card-thumb"><img src="${project.image}" alt="${project.title}" class="thumb-img"></div>`
      : `<div class="card-thumb">
           <div class="project-icon">${project.icon}</div>
         </div>`;
    
    // Create tech tags HTML
    const techTags = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
    
    card.innerHTML = `
      ${thumbHtml}
      <div class="card-content">
        <div class="project-status">${project.status}</div>
        <div class="project-title">${project.title}</div>
        <div class="project-description">${escapeHtml(project.description)}</div>
        <div class="tech-stack">${techTags}</div>
        <div class="project-links">
          <span class="project-link">View project →</span>
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

// Optional: add a subtle highlight to the first (featured) project
function highlightFeaturedProject() {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !grid.firstChild) return;
  const featuredCard = grid.firstChild;
  if (featuredCard) {
    featuredCard.style.border = '1px solid rgba(201, 126, 90, 0.4)';
    featuredCard.style.boxShadow = '0 10px 25px -8px rgba(201,126,90,0.2)';
  }
}

// Initialize everything when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  renderProjectsGrid();
  highlightFeaturedProject();
});

// Theme toggle (preserved from original)
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("themeMode") || "dark";
document.documentElement.setAttribute("data-theme", storedTheme);

if (themeToggle) {
  themeToggle.innerText = storedTheme === "dark" ? "☀︎ light" : "🌙 dark";
  
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("themeMode", newTheme);
    themeToggle.innerText = newTheme === "dark" ? "☀︎ light" : "🌙 dark";
  });
}

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
          <p>✧ Basanta Thapa — building at the intersection of craft, code, and curiosity ✧</p>
        </footer>`;
      }
    }
  });
})();