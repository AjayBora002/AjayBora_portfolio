document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation ---
    const tabs = document.querySelectorAll('.tab-pane');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the target tab ID
            const targetId = link.getAttribute('data-target');
            
            // Hide all tabs and remove active class from all links
            tabs.forEach(tab => tab.classList.remove('active'));
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Show the target tab and highlight clicked link
            const targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.classList.add('active');
                link.classList.add('active');
            }
            
            // Scroll gracefully to top when changing tabs
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Re-trigger scroll reveal for the new tab
            if (typeof observeElements === 'function') {
                observeElements();
            }
        });
    });

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
        // Start typing after a short delay
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
        const elementsToReveal = document.querySelectorAll('.skill-group, .exp-item, .project-card, .hackathon-card, .cert-item, .section-title');
        elementsToReveal.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    // Initial observation
    observeElements();
});