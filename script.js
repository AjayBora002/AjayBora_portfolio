// ── CONTACT FORM: mailto handler ────────────
function sendMail(e) {
    e.preventDefault();
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    const mailTo  = `mailto:boraajay26@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailTo;

    // Visual feedback
    const btn = e.target.querySelector('.btn-submit');
    btn.textContent = 'Opening Email Client...';
    setTimeout(() => { btn.textContent = 'SEND MESSAGE'; }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Logic ---
    const tabs = document.querySelectorAll('.tab-pane');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function switchTab(targetId) {
        // Hide all tabs
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Remove active class from all links (desktop & mobile)
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        // Show target tab
        const targetTab = document.getElementById(targetId);
        if (targetTab) {
            targetTab.classList.add('active');
            
            // Set active class on corresponding links
            document.querySelectorAll(`[data-target="${targetId}"]`).forEach(link => {
                link.classList.add('active');
            });
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Close mobile menu if open
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scroll
        }

        // Re-trigger scroll reveal
        observeElements();
    }
    
    // Desktop Nav Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link.getAttribute('data-target'));
        });
    });

    // Mobile Nav Listeners
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link.getAttribute('data-target'));
        });
    });

    // Hamburger Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scroll
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scroll
        });
    }

    // --- Dynamic Typing Effect ---
    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
        const fullText = heroRole.textContent;
        heroRole.textContent = '';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < fullText.length) {
                heroRole.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 70); 
            }
        }
        setTimeout(typeWriter, 500);
    }

    // --- Scroll Reveal Logic ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    function observeElements() {
        const elementsToReveal = document.querySelectorAll('.skill-group, .exp-item, .card, .section-title');
        elementsToReveal.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    observeElements();
});