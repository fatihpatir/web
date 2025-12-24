document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelector('.nav-links');

    if (logo) {
        logo.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-active');
                const icon = logo.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-terminal');
                    icon.classList.toggle('fa-times');
                }
            }
        });
    }

    // Smooth Scroll Reveal
    const revealElements = document.querySelectorAll('.card, .hero-text, .hero-image, .section-title');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });

    // Form Submission Feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Gönderiliyor...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Mesajınız alındı! Teşekkürler.');
                btn.innerText = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }
});
