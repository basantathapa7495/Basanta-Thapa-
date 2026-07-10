// Blog posts data with all new features
const blogPosts = [
    {
        id: 1,
        title: "How I Built This Website",
        excerpt: "The story behind this site — the design choices, the tech stack, and why I decided to build it myself instead of using a template.",
        date: "June 02, 2026",
        readTime: "6 min read",
        category: "programming",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        link: "blog1.html"
    },
    {
        id: 2,
        title: "Why I'm Writing Books Instead of Chasing Trends",
        excerpt: "In a world obsessed with viral content and quick wins, I chose the slow path. Here's why writing books matters more than ever.",
        date: "May 28, 2026",
        readTime: "7 min read",
        category: "writing",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        link: "blog2.html"
    },
    {
        id: 3,
        title: "The 10 Books That Changed My Thinking",
        excerpt: "A curated list of the books that shaped my perspective on life, business, and creativity — and why you should read them too.",
        date: "May 21, 2026",
        readTime: "8 min read",
        category: "books",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        link: "blog3.html"
    }
];

// Current filter and search state
let currentCategory = 'all';
let searchQuery = '';

// Render blog posts
function renderBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    
    if (!blogGrid) return;
    
    // Filter posts
    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = searchQuery === '' || 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });
    
    if (filteredPosts.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <p>No articles found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    blogGrid.innerHTML = filteredPosts.map(post => `
        <a href="${post.link}" class="blog-card fade-up">
            <div class="blog-image-wrapper">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="blog-content-wrapper">
                <span class="blog-category category-${post.category}">${post.category}</span>
                
                <div class="blog-meta">
                    <span class="blog-date"> ${post.date}</span>
                    <span class="blog-read-time">⏱ ${post.readTime}</span>
                </div>
                
                <h2>${post.title}</h2>
                <p class="blog-excerpt">${post.excerpt}</p>
                
                
       
            </div>
        </a>
    `).join('');
}

// Format numbers (e.g., 1284 -> 1.3K)
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

// Filter functionality
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Update current category
            currentCategory = btn.dataset.category;
            // Re-render posts
            renderBlogPosts();
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderBlogPosts();
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();
    setupFilters();
    setupSearch();
});