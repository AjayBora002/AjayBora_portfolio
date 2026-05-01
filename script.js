// ── AJAY BORA PORTFOLIO — CORE LOGIC ──────────────────
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
    initTypewriter();
    initStatsCounter();
    initGlobalParticles();
    initTiltEffect();
    initScrollProgress();
    initMagneticButtons();
    initSkillsBarsAnimation();
    initThemeToggle();
    initTimelineAnimation();
    initProjectPreview();
    initChatbot();
    initLenis();
    initGSAPAnimations();
});

// ── LENIS SMOOTH SCROLLING ────────────────────────────
function initLenis() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        
        // Update ScrollTrigger on Lenis scroll if GSAP exists
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time)=>{
              lenis.raf(time * 1000)
            })
            gsap.ticker.lagSmoothing(0, 0)
        }
    }
}

// ── GSAP ANIMATIONS ──────────────────────────────────
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // 1. Page Load Reveal Sequence
    const tl = gsap.timeline();
    // Hide initially via GSAP so it can reveal
    gsap.set('header', { y: -20, opacity: 0 });
    gsap.set('.hero-content > *', { y: 20, opacity: 0 });
    gsap.set('.profile-wrapper', { scale: 0.9, opacity: 0 });
    
    tl.to('header', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      .to('.hero-content h1', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.hero-content .subtitle', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.hero-description', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.hero-buttons', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.profile-wrapper', { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.6');

    // 2. Section Titles Scroll Reveal
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, 
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }
        );
    });
}

// ── MAGNETIC BUTTONS ──────────────────────────────────
function initMagneticButtons() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        if (!btn.querySelector('.btn-inner')) {
            const inner = document.createElement('span');
            inner.className = 'btn-inner';
            while (btn.firstChild) {
                inner.appendChild(btn.firstChild);
            }
            btn.appendChild(inner);
        }
    });

    document.addEventListener('mousemove', (e) => {
        buttons.forEach(btn => {
            const rect = btn.getBoundingClientRect();
            const inner = btn.querySelector('.btn-inner');
            
            const style = window.getComputedStyle(btn);
            const matrix = new DOMMatrixReadOnly(style.transform !== 'none' ? style.transform : 'matrix(1, 0, 0, 1, 0, 0)');
            const tx = matrix.m41;
            const ty = matrix.m42;
            
            const origLeft = rect.left - tx;
            const origTop = rect.top - ty;
            const origRight = origLeft + rect.width;
            const origBottom = origTop + rect.height;

            const cx = origLeft + rect.width / 2;
            const cy = origTop + rect.height / 2;

            const isNear = 
                e.clientX > origLeft - 60 &&
                e.clientX < origRight + 60 &&
                e.clientY > origTop - 60 &&
                e.clientY < origBottom + 60;

            if (isNear) {
                btn.classList.add('is-magnetic');
                
                const dx = e.clientX - cx;
                const dy = e.clientY - cy;
                
                let ox = dx * 0.3;
                let oy = dy * 0.3;

                const pullDist = Math.hypot(ox, oy);
                if (pullDist > 12) {
                    ox = (ox / pullDist) * 12;
                    oy = (oy / pullDist) * 12;
                }

                btn.style.transform = `translate(${ox}px, ${oy}px)`;
                if(inner) inner.style.transform = `translate(${ox * 0.5}px, ${oy * 0.5}px)`;
            } else {
                if (btn.classList.contains('is-magnetic')) {
                    btn.classList.remove('is-magnetic');
                    btn.style.transform = '';
                    if(inner) inner.style.transform = '';
                }
            }
        });
    });
}

// ── SCROLL PROGRESS INDICATOR ─────────────────────────
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    let ticking = false;

    function updateProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = Math.max(
            document.body.scrollHeight, 
            document.documentElement.scrollHeight,
            document.body.offsetHeight, 
            document.documentElement.offsetHeight,
            document.body.clientHeight, 
            document.documentElement.clientHeight
        );
        const winHeight = window.innerHeight || document.documentElement.clientHeight;
        
        let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        scrollPercent = Math.max(0, Math.min(100, scrollPercent));
        
        progressBar.style.width = scrollPercent + '%';
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });
}

// ── GLOBAL PARTICLES ──────────────────────────────────────
function initGlobalParticles() {
    const canvas = document.getElementById('global-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    // Increase density for full site: roughly 1 particle per 15000 pixels
    let particleCount = Math.floor((width * height) / 15000);
    particleCount = Math.min(Math.max(particleCount, 60), 180); 
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.radius = Math.random() * 1.5 + 1.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(17, 17, 17, 0.1)'; // Softer for global background
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particleCount; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particleCount; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(17, 17, 17, ${0.05 * (1 - distance/120)})`; // Fainter lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ── 3D TILT EFFECT ────────────────────────────────────
function initTiltEffect() {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cards = document.querySelectorAll('.project-card, .about-image');

    cards.forEach(card => {
        // Create glare element
        const glare = document.createElement('div');
        glare.classList.add('card-glare');
        card.appendChild(glare);

        card.addEventListener('mouseenter', () => {
            card.classList.add('is-tilting');
            glare.style.opacity = '1';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (-8deg to 8deg)
            const rotateX = -((y - centerY) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;

            const isPopular = card.classList.contains('popular');
            const baseScale = isPopular ? 1.02 : 1;
            const scale = `scale(${baseScale * 1.02})`; // Slight lift on hover

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${scale}`;
            
            // Move glare
            glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-tilting');
            card.style.transform = '';
            glare.style.opacity = '0';
        });
    });
}

// ── STATS COUNT-UP ANIMATION ──────────────────────────
function initStatsCounter() {
    const section = document.querySelector('.about-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!section || statNumbers.length === 0) return;

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    const suffix = stat.getAttribute('data-suffix') || '';
                    const duration = 1500;
                    let startTime = null;

                    function step(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const currentCount = Math.floor(easeOutCubic(progress) * target);
                        
                        stat.textContent = currentCount + (progress === 1 ? suffix : '');

                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    }
                    window.requestAnimationFrame(step);
                });
                
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}

// ── TYPEWRITER ANIMATION ──────────────────────────────
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const words = ["AI/ML Engineer", "Data Scientist", "Python Developer", "Data Visualization Expert"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;
    let deleteSpeed = 40;
    let pauseTime = 1800;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            delay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 1000);
}

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

// ── CONTACT FORM (Web3Forms) ───────────────────────────
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');

    if(!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if(response.ok && result.success) {
                form.reset();
                statusMsg.textContent = '✅ Thank you! Your message has been sent.';
                statusMsg.className = 'form-status success';
                // Clear success message after 4 seconds so form is reusable
                setTimeout(() => {
                    statusMsg.textContent = '';
                    statusMsg.className = 'form-status';
                }, 4000);
            } else {
                statusMsg.textContent = result.message || 'Oops! There was a problem. Please try again.';
                statusMsg.className = 'form-status error';
            }
        } catch(error) {
            statusMsg.textContent = 'Network error. Please check your connection and try again.';
            statusMsg.className = 'form-status error';
        }
        
        btn.textContent = originalText;
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

// ── SKILLS BARS ANIMATION ────────────────────────────
function initSkillsBarsAnimation() {
    const section = document.querySelector('.about-section');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillPercents = document.querySelectorAll('.skill-bar-percent');
    
    if (!section || skillBars.length === 0) return;

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    const target = parseInt(bar.getAttribute('data-percent'), 10);
                    const percentText = skillPercents[index];
                    const duration = 1200;
                    const delay = index * 100;
                    let startTime = null;

                    setTimeout(() => {
                        function animate(timestamp) {
                            if (!startTime) startTime = timestamp;
                            const progress = Math.min((timestamp - startTime) / duration, 1);
                            const easedProgress = easeOutCubic(progress);
                            const currentWidth = easedProgress * target;
                            
                            bar.style.width = currentWidth + '%';
                            percentText.textContent = Math.floor(currentWidth) + '%';

                            if (progress < 1) {
                                window.requestAnimationFrame(animate);
                            }
                        }
                        window.requestAnimationFrame(animate);
                    }, delay);
                });
                
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}

// ── THEME TOGGLE ──────────────────────────────────────
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    
    // Set initial icon based on current theme
    const updateIcon = (theme) => {
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    };

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateIcon('light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateIcon('dark');
        }
    });
}

// ── TIMELINE ANIMATION ────────────────────────────────
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => observer.observe(item));
}

// ── PROJECT PREVIEW ───────────────────────────────────
function initProjectPreview() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cards = document.querySelectorAll('.project-card');
    const panel = document.getElementById('project-preview-panel');
    let hoverTimeout;

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const tech = card.dataset.previewTech;
            const impact = card.dataset.previewImpact;
            const status = card.dataset.previewStatus;

            if (!tech) return;

            hoverTimeout = setTimeout(() => {
                // Update content
                const techPills = tech.split(' · ').map(t => `<span class="preview-tech-pill">${t}</span>`).join('');
                panel.innerHTML = `
                    <div class="preview-item">
                        <div class="preview-title">Tech Stack</div>
                        <div class="preview-tech-group">${techPills}</div>
                    </div>
                    <div class="preview-item">
                        <div class="preview-title">Impact</div>
                        <div class="preview-impact">${impact}</div>
                    </div>
                    <div class="preview-item">
                        <div class="preview-status"><i class="fas fa-circle"></i> ${status}</div>
                    </div>
                `;

                // Positioning
                const rect = card.getBoundingClientRect();
                const panelWidth = 280;
                const gap = 20;
                
                let left = rect.right + gap;
                let transformX = 10;

                // Check if right side has enough space
                if (left + panelWidth > window.innerWidth) {
                    left = rect.left - panelWidth - gap;
                    transformX = -10;
                }

                // Vertical centering relative to card
                let top = rect.top + (rect.height / 2) - (panel.offsetHeight / 2);
                
                // Boundary checks for top/bottom
                top = Math.max(20, Math.min(top, window.innerHeight - panel.offsetHeight - 20));

                panel.style.left = `${left}px`;
                panel.style.top = `${top}px`;
                panel.style.setProperty('--tx', `${transformX}px`);
                
                panel.classList.add('visible');
            }, 600);
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            panel.classList.remove('visible');
        });
    });
}

// ── AI CHATBOT ────────────────────────────────────────
function initChatbot() {
    const wrapper    = document.getElementById('chatbot-wrapper');
    const toggleBtn  = document.getElementById('chatbot-toggle');
    const closeBtn   = document.getElementById('chatbot-close');
    const panel      = document.getElementById('chatbot-panel');
    const messagesEl = document.getElementById('chatbot-messages');
    const input      = document.getElementById('chatbot-input');
    const sendBtn    = document.getElementById('chatbot-send');

    if (!wrapper || !toggleBtn) return;

    let history = [];
    let isOpen  = false;
    let greeted = false;

    const GREETING = "Hi! 👋 I'm Ajay's AI assistant. Ask me anything about his skills, projects, or experience!";

    function addBubble(text, role) {
        const bubble = document.createElement('div');
        bubble.className = `chatbot-bubble ${role}`;
        bubble.textContent = text;
        messagesEl.appendChild(bubble);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return bubble;
    }

    function showTyping() {
        const el = document.createElement('div');
        el.className = 'chatbot-typing';
        el.id = 'chatbot-typing-indicator';
        el.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        messagesEl.appendChild(el);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById('chatbot-typing-indicator');
        if (el) el.remove();
    }

    function openChat() {
        isOpen = true;
        wrapper.classList.add('open');
        input.focus();
        if (!greeted) {
            greeted = true;
            addBubble(GREETING, 'ai');
        }
    }

    function closeChat() {
        isOpen = false;
        wrapper.classList.remove('open');
    }

    toggleBtn.addEventListener('click', () => isOpen ? closeChat() : openChat());
    closeBtn.addEventListener('click', closeChat);

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        sendBtn.disabled = true;
        input.disabled   = true;

        addBubble(text, 'user');
        history.push({ role: 'user', content: text });

        showTyping();

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history })
            });

            const data = await res.json();
            hideTyping();

            if (res.ok && data.reply) {
                addBubble(data.reply, 'ai');
                history.push({ role: 'assistant', content: data.reply });
            } else {
                addBubble(`Error: ${data.error || 'Unknown Server Error'}`, 'ai');
                console.error("Chatbot API Error Data:", data);
            }
        } catch (err) {
            hideTyping();
            addBubble(`Network Error: ${err.message}`, 'ai');
            console.error("Chatbot Network Error:", err);
        }

        sendBtn.disabled = false;
        input.disabled   = false;
        input.focus();
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}