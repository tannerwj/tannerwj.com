// Smooth scroll for navigation (optional)
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
    const cards = document.querySelectorAll('.referral-card');
    cards.forEach((card, index) => {
        card.style.opacity = 0;
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease';
            card.style.opacity = 1;
        }, index * 100); // Staggered fade-in
    });
});
