document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelector('.nav-links');
    const infoBtn = document.getElementById('info-btn');
    const closeBtn = document.getElementById('close-popup');
    const popup = document.getElementById('info-popup');

    // Menü Aç/Kapat
    if (logo) {
        logo.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.toggle('active');
            }
        });
    }

    // i Butonu Pop-up
    if (infoBtn) infoBtn.addEventListener('click', () => popup.style.display = 'flex');
    if (closeBtn) closeBtn.addEventListener('click', () => popup.style.display = 'none');

    // Linke tıklayınca menüyü kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
});

// PWA Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}