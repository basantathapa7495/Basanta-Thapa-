/* ==============================
   GOAL DASHBOARD LOGIC
   Vanilla JS - No Frameworks
============================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. COUNTDOWN & HERO DAYS REMAINING
    const targetDate = new Date('September 11, 2027 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.getElementById('heroDaysRemaining').textContent = '0';
            document.getElementById('cdDays').textContent = '0';
            document.getElementById('cdHours').textContent = '0';
            document.getElementById('cdMins').textContent = '0';
            document.getElementById('cdSecs').textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('heroDaysRemaining').textContent = days;
        document.getElementById('cdDays').textContent = days;
        document.getElementById('cdHours').textContent = hours;
        document.getElementById('cdMins').textContent = minutes;
        document.getElementById('cdSecs').textContent = seconds;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 2. PROGRESS RING ANIMATION
    const circle = document.querySelector('.progress-ring__circle');
    if (circle) {
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            const percent = 0.01;
            const offset = circumference - (percent / 100 * circumference);
            circle.style.strokeDashoffset = offset;
        }, 500);
    }

    // 3. INTERSECTION OBSERVER (Animations, Counters, Progress Bars)
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stat counters
                if (entry.target.classList.contains('stat-card')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const el = entry.target.querySelector('.stat-number');
                    animateCounter(el, target);
                }
                
                // Animate progress bars
                if (entry.target.classList.contains('progress-bar-fill') || entry.target.classList.contains('tile-progress-fill')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right, .scale-in, .stat-card, .progress-bar-fill, .tile-progress-fill').forEach(el => {
        observer.observe(el);
    });

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.ceil(current);
            }
        }, 20);
    }

    // 4. RANDOM QUOTE GENERATOR
    const quotes = [
        { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Act as if what you do makes a difference. It does.", author: "William James" },
        { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
        { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "Dream big. Start small. Act now.", author: "Robin Sharma" },
        { text: "Your limitation—it's only your imagination.", author: "Unknown" },
        { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
        { text: "Great things never come from comfort zones.", author: "Unknown" },
        { text: "Dream it. Wish it. Do it.", author: "Unknown" },
        { text: "Stay foolish. Stay hungry.", author: "Steve Jobs" },
        { text: "Work hard in silence, let your success be the noise.", author: "Frank Ocean" },
        { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
        { text: "Don't wait. The time will never be just right.", author: "Napoleon Hill" },
        { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
        { text: "Either you run the day or the day runs you.", author: "Jim Rohn" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "An unexamined life is not worth living.", author: "Socrates" },
        { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
        { text: "We become what we think about.", author: "Earl Nightingale" },
        { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
        { text: "I attribute my success to this: I never gave or took any excuse.", author: "Florence Nightingale" },
        { text: "Quality is not an act, it is a habit.", author: "Aristotle" }
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteText').textContent = randomQuote.text;
    document.getElementById('quoteAuthor').textContent = `— ${randomQuote.author}`;

    // 5. DAILY TRACKER (LocalStorage)
    const tasks = ['Exercise', 'Read', 'Write', 'Code', 'Journal'];
    const trackerList = document.getElementById('trackerList');
    const trackerStatus = document.getElementById('trackerStatus');
    const today = new Date().toDateString();
    
    let trackerData = JSON.parse(localStorage.getItem('dailyTracker')) || {};
    
    // Reset tracker if it's a new day
    if (trackerData.date !== today) {
        trackerData = { date: today, tasks: {} };
        tasks.forEach(task => trackerData.tasks[task] = false);
    }

    function renderTracker() {
        trackerList.innerHTML = '';
        let completedCount = 0;
        
        tasks.forEach(task => {
            const isChecked = trackerData.tasks[task];
            if (isChecked) completedCount++;
            
            const div = document.createElement('div');
            div.className = 'tracker-item';
            div.innerHTML = `
                <label class="tracker-label">
                    <input type="checkbox" ${isChecked ? 'checked' : ''} data-task="${task}">
                    <span class="checkmark"></span>
                    <span class="task-text">${task}</span>
                </label>
            `;
            trackerList.appendChild(div);
        });
        
        trackerStatus.textContent = `${completedCount}/${tasks.length} Complete`;
        if (completedCount === tasks.length) {
            trackerStatus.classList.add('all-complete');
        } else {
            trackerStatus.classList.remove('all-complete');
        }
        
        // Add event listeners to checkboxes
        trackerList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const taskName = e.target.getAttribute('data-task');
                trackerData.tasks[taskName] = e.target.checked;
                localStorage.setItem('dailyTracker', JSON.stringify(trackerData));
                renderTracker();
            });
        });
    }
    renderTracker();

    // 6. SCROLL TO TOP BUTTON
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. LIFE AREA MODALS
    const lifeAreaData = {
        wealth: { title: "💰 Wealth", goals: ["Save 20% of income monthly", "Invest in index funds", "Build 6-month emergency fund", "Earn NPR 1 Crore by 2027"] },
        learning: { title: "📚 Learning", goals: ["Read 30 books this year", "Complete Python certification", "Learn financial modeling", "Study philosophy daily"] },
        health: { title: "💪 Health", goals: ["Gym 4x a week", "Sleep 8 hours daily", "Meditate 10 mins morning", "Zero sugar weekdays"] },
        business: { title: "💻 Business", goals: ["Launch digital products", "Reach 1000 newsletter subs", "Automate client onboarding", "Hit NPR 10 Lakh revenue"] },
        travel: { title: "✈️ Travel", goals: ["Visit 3 new countries", "Explore all 7 provinces of Nepal", "Digital nomad for 1 month", "Learn basic local phrases"] },
        lifestyle: { title: "🏡 Lifestyle", goals: ["Build dream home office", "Declutter living space", "Cook 3 new recipes weekly", "Establish morning routine"] },
        relationships: { title: "❤️ Relationships", goals: ["Weekly family calls", "Monthly date night", "Find a mentor", "Give back to community"] },
        creativity: { title: "🎨 Creativity", goals: ["Write 1000 words daily", "Publish 2nd ebook", "Learn UI/UX design", "Start a podcast"] }
    };

    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('.life-tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const area = tile.getAttribute('data-area');
            const data = lifeAreaData[area];
            
            modalBody.innerHTML = `
                <h2 class="modal-title">${data.title}</h2>
                <ul class="modal-goals">
                    ${data.goals.map(goal => `<li><span class="goal-check">⬜</span> ${goal}</li>`).join('')}
                </ul>
            `;
            modalOverlay.classList.add('active');
        });
    });

    // Close modal events
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modalOverlay.classList.remove('active');
    });

});