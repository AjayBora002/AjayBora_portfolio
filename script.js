// --- BENTO PORTFOLIO LOGIC ---

// --- NAVIGATION & HAMBURGER ---
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        // Add mobile menu logic if needed, 
        // but for Bento we mainly keep it single-page minimal.
    });
}

// --- SCROLL ANIMATIONS (Intersection Observer) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.bento-card').forEach(card => {
    // Initial state set in CSS animation, 
    // but we can use this for scroll-triggered reveals if the grid is long.
    observer.observe(card);
});

// --- SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- HOVER GLOW EFFECT (Mouse Move) ---
// Optional: Add a subtle glow that follows the mouse on cards
document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});