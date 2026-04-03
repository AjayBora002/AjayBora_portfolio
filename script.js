document.addEventListener('DOMContentLoaded', () => {
    
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
            document.getElementById(targetId).classList.add('active');
            link.classList.add('active');
            
            // Scroll gracefully to top when changing tabs
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

});