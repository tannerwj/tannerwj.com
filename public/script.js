// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
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

// Simple form submission (placeholder)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! (Form submission not implemented yet)');
});
