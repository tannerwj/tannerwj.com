// Theme Management
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('.icon');
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navOverlay = document.querySelector('.nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-links a');

    if (hamburger && navOverlay) {
        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navOverlay.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on overlay
        navOverlay.addEventListener('click', (e) => {
            if (e.target === navOverlay) {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when clicking on navigation links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu on window resize (if screen becomes larger)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Card animation on load (fade in)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .skill-item, .referral-card');
    cards.forEach((card, index) => {
        card.style.opacity = 0;
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease';
            card.style.opacity = 1;
        }, index * 100);
    });
});

// Simple form submission (placeholder) - only if form exists
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! (Form submission not implemented yet)');
        });
    }
});
