document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelector('.nav-links');
    const infoBtn = document.getElementById('info-btn');
    const infoPopup = document.getElementById('info-popup');
    const closePopup = document.getElementById('close-popup');

    // Mobil Menü Toggle
    if (logo) {
        logo.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.toggle('active');
                const icon = logo.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-terminal');
                    icon.classList.toggle('fa-times');
                }
            }
        });
    }

    // Linke tıklayınca menüyü kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // PWA Info Popup
    if (infoBtn) {
        infoBtn.addEventListener('click', () => infoPopup.style.display = 'flex');
    }
    if (closePopup) {
        closePopup.addEventListener('click', () => infoPopup.style.display = 'none');
    }

    // Scroll Reveal (Mevcut kodun)
    const revealElements = document.querySelectorAll('.card, .hero-text, .hero-image');
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
});

// Service Worker Kaydı (PWA için)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW fail', err));
    });
}