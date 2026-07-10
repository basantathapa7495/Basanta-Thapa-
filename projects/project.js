// Project data
const projects = [
    {
        id: 1,
        name: "Birthday Surprise Generator",
        excerpt: "Turn an ordinary birthday into a memorable celebration. This tool creates a personalized birthday surprise page with photos, videos, music, and heartfelt messages.",
        category: "web-app",
        status: "live",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        liveLink: "project1.html"
    },
    {
        id: 2,
        name: "Age Calculator",
        excerpt: "A modern age calculator that does more than calculate years. Discover detailed life statistics, including your exact age, total days lived, and zodiac sign.",
        category: "utility",
        status: "live",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        liveLink: "project2.html"
    },
    {
        id: 3,
        name: "Love Percentage Calculator",
        excerpt: "A fun entertainment tool that calculates a playful compatibility score between two names. Generates a love percentage, humorous message, and shareable result.",
        category: "fun-tool",
        status: "live",
        tech: ["HTML", "CSS", "JavaScript"],
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        liveLink: "project3.html"
    }
];

// Current filter and search state
let currentCategory = 'all';
let searchQuery = '';

// Status badge configuration
const statusConfig = {
    live: { text: 'Live' },
    progress: { text: 'In Progress' },
    planned: { text: 'Planned' }
};

// Render projects
function renderProjects() {
    const projectGrid = document.getElementById('projectGrid');
    
    if (!projectGrid) return;
    
    // Filter projects
    const filteredProjects = projects.filter(project => {
        const matchesCategory = currentCategory === 'all' || project.category === currentCategory;
        const matchesSearch = searchQuery === '' || 
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });
    
    if (filteredProjects.length === 0) {
        projectGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <p>No projects found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    projectGrid.innerHTML = filteredProjects.map(project => {
        const status = statusConfig[project.status];
        
        return `
            <article class="project-card fade-up">
                <div class="project-image-wrapper">
                    <!-- Status Badge moved to top right of image -->
                    <div class="project-status">
                        <span>${status.text}</span>
                    </div>
                    <img src="${project.image}" alt="${project.name}" loading="lazy">
                </div>
                <div class="project-content-wrapper">
                    <div class="project-meta">
                        <span class="project-category">${project.category.replace('-', ' ')}</span>
                    </div>
                    
                    <h2>${project.name}</h2>
                    <p class="project-excerpt">${project.excerpt}</p>
                    
                    <div class="project-tech">
                        ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                    
                    <div class="project-actions">
                        <!-- Renamed to Continue, Details button removed -->
                        <a href="${project.liveLink}" class="project-btn btn-live" onclick="event.stopPropagation()">
                            <span>🚀</span>
                            <span>Continue</span>
                        </a>
                    </div>
                    <!-- Views & Users stats removed -->
                </div>
            </article>
        `;
    }).join('');
}

// Filter functionality
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProjects();
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderProjects();
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupFilters();
    setupSearch();
});