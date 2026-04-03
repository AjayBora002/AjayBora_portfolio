document.addEventListener('DOMContentLoaded', () => {
    
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    
    let currentIndex = 0;
    let isAnimating = false;

    // Activate the initial slide
    slides[currentIndex].classList.add('active-slide');

    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        if (index < 0 || index >= slides.length) return;

        isAnimating = true;

        // Remove active class from old slide & dot
        slides[currentIndex].classList.remove('active-slide');
        dots[currentIndex].classList.remove('active');

        currentIndex = index;

        // Add active class to new slide & dot
        slides[currentIndex].classList.add('active-slide');
        dots[currentIndex].classList.add('active');

        setTimeout(() => {
            isAnimating = false;
        }, 800); // Wait for CSS transition
    }

    // Attach to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Attach to navbar links
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Since links map roughly to sections: Intro(0), Exp(1), Proj(3), Hack(5), Cert(6)
            // Let's parse the target manually or index based on ID
            const targetId = link.getAttribute('href').replace('#', '');
            const targetIndex = slides.findIndex(s => s.id === targetId);
            if(targetIndex !== -1) goToSlide(targetIndex);
        });
    });

    // Mouse wheel scrolling
    window.addEventListener('wheel', (e) => {
        if (isAnimating) return;
        
        if (e.deltaY > 0) {
            // Scroll down -> next slide
            goToSlide(currentIndex + 1);
        } else if (e.deltaY < 0) {
            // Scroll up -> prev slide
            goToSlide(currentIndex - 1);
        }
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
        }
    });
});