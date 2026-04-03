document.addEventListener('DOMContentLoaded', () => {
    
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Smooth scroll for nav links and dots
    const clickHandler = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href') || '#' + e.currentTarget.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Attach to dots
    dots.forEach(dot => {
        dot.addEventListener('click', clickHandler);
    });

    // Attach to navbar links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', clickHandler);
    });

    // Intersection Observer to update active dot
    const observerOptions = {
        root: document.querySelector('.slider-container'),
        threshold: 0.5 // Trigger when 50% of the slide is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find matching dot and activate
                const currentId = entry.target.id;
                
                dots.forEach(dot => {
                    dot.classList.remove('active');
                    if(dot.getAttribute('data-target') === currentId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        observer.observe(slide);
    });
});