document-addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // Smooth Scrolling for Navigation
    navItems.forEach(anchor => {
        anchor-addEventListener('click', function (e) {
            e-preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Active Link Highlighting on Scroll
    const highlightNav = () => {
        let currentPos = window.scrollY + 150;

        sections.forEach(section => {
            let sectionTop = section.offsetTop;
            let sectionHeight = section.offsetHeight;
            let sectionId = section.getAttribute('id');

            if (currentPos >= sectionTop && currentPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    window-addEventListener('scroll', highlightNav);
    highlightNav(); // Initialize on load
});