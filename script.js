// ── CUSTOM CURSOR (Light Mode Adjusted) ────────────
function initCursor() {
    const orb = document.getElementById('cursor-orb');
    const follower = document.getElementById('cursor-follower');
    if (!orb || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX, orbY = mouseY;
    let folX = mouseX, folY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        orbX += (mouseX - orbX) * 0.2;
        orbY += (mouseY - orbY) * 0.2;
        folX += (mouseX - folX) * 0.1;
        folY += (mouseY - folY) * 0.1;

        orb.style.transform = `translate(${orbX - 4}px, ${orbY - 4}px)`;
        follower.style.transform = `translate(${folX - 16}px, ${folY - 16}px)`;

        requestAnimationFrame(animate);
    }
    animate();

    // Add hover states for interactive elements
    const interactables = document.querySelectorAll('a, button, .expert-card, .project-card, input');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '48px';
            follower.style.height = '48px';
            follower.style.transform = `translate(${folX - 24}px, ${folY - 24}px)`;
            follower.style.borderColor = 'rgba(0, 0, 0, 0.4)';
            orb.style.transform = `translate(${orbX - 4}px, ${orbY - 4}px) scale(0.5)`;
        });
        el.addEventListener('mouseleave', () => {
            follower.style.width = '32px';
            follower.style.height = '32px';
            follower.style.transform = `translate(${folX - 16}px, ${folY - 16}px)`;
            follower.style.borderColor = 'rgba(0, 0, 0, 0.2)';
            orb.style.transform = `translate(${orbX - 4}px, ${orbY - 4}px) scale(1)`;
        });
    });
}

// ── SCROLL REVEAL & NAV ───────────────────────
function initScrollAndReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ── INIT ALL ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollAndReveal();
    initMobileNav();
    initActiveNav();
    initProjectFilter();
    initContactForm();
    initScrollToTop();
});

// ── MOBILE NAVIGATION ──────────────────────────────────
function initMobileNav() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const overlay = document.getElementById('mobile-nav');
    const links = document.querySelectorAll('.mobile-links a');

    if(!hamburgerBtn || !overlay) return;

    function toggleMenu(show) {
        if(show) {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    hamburgerBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));
    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

// ── ACTIVE NAV HIGHLIGHT ──────────────────────────────
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        // Find the visible section
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(sec => observer.observe(sec));
}

// ── PROJECTS FILTER ───────────────────────────────────
function initProjectFilter() {
    const toggleSwitch = document.querySelector('.toggle-switch');
    const projectCards = document.querySelectorAll('.project-card');
    
    if(!toggleSwitch || projectCards.length === 0) return;

    let isEngineering = false;

    // By default, hide engineering cards
    projectCards.forEach(card => {
        if(card.dataset.category === 'engineering') {
            card.classList.add('hidden');
        }
    });

    toggleSwitch.addEventListener('click', () => {
        isEngineering = !isEngineering;
        toggleSwitch.classList.toggle('active', isEngineering);
        
        const activeCategory = isEngineering ? 'engineering' : 'data-science';

        projectCards.forEach(card => {
            card.classList.add('fade-out');
            setTimeout(() => {
                if(card.dataset.category === activeCategory) {
                    card.classList.remove('hidden');
                    setTimeout(() => card.classList.remove('fade-out'), 50);
                } else {
                    card.classList.add('hidden');
                }
            }, 400); 
        });
    });
}

// ── CONTACT FORM ──────────────────────────────────────
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');

    if(!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if(response.ok) {
                form.reset();
                form.style.display = 'none';
                statusMsg.textContent = 'Thank you! Your message has been sent.';
                statusMsg.className = 'form-status success';
            } else {
                statusMsg.textContent = 'Oops! There was a problem submitting your form.';
                statusMsg.className = 'form-status error';
            }
        } catch(error) {
            statusMsg.textContent = 'Oops! There was a problem submitting your form.';
            statusMsg.className = 'form-status error';
        }
        
        btn.textContent = 'Send';
        btn.disabled = false;
    });
}

// ── SCROLL TO TOP ─────────────────────────────────────
function initScrollToTop() {
    const btn = document.getElementById('scroll-to-top');
    if(!btn) return;

    window.addEventListener('scroll', () => {
        if(window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}