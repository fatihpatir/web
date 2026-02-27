document.addEventListener('DOMContentLoaded', () => {
    // ---- Preloader Logic ----
    const preloader = document.getElementById('preloader');
    const typewriterElement = document.getElementById('typewriter');
    const textToType = 'Fatih Patır';
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typewriterElement.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 120);
        } else {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 1000); // 1 saniye bekle ve kaybol
        }
    }

    // Typing efektini başlat
    if (typewriterElement) {
        setTimeout(typeWriter, 500);
    } else if (preloader) {
        preloader.classList.add('fade-out');
    }

    // ---- Avatar Slider Logic ----
    const avatars = document.querySelectorAll('.avatar-main');
    let currentAvatarIndex = 0;

    if (avatars.length > 1) {
        setInterval(() => {
            avatars[currentAvatarIndex].classList.remove('active');
            currentAvatarIndex = (currentAvatarIndex + 1) % avatars.length;
            avatars[currentAvatarIndex].classList.add('active');
        }, 4000); // 4 saniyede bir değiştir
    }


    // ---- DOM Elements ----
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const infoBtn = document.getElementById('info-btn');
    const themeBtn = document.getElementById('theme-btn');
    const closeBtn = document.getElementById('close-popup');
    const popup = document.getElementById('info-popup');
    const yearSpan = document.getElementById('year');

    // ---- Theme Toggle (Dark/Light Mode) ----
    if (themeBtn) {
        // Kontrol et eğer localStorage'da kayıtlı tema varsa
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');

            if (isLight) {
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Set current year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Update on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Eşik değerini menü yüksekliğini hesaba katarak ayarladık
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // PWA Info Popup
    if (infoBtn) {
        infoBtn.addEventListener('click', () => {
            popup.style.display = 'flex';
            // Küçük bir animasyon etkisi için timeout
            setTimeout(() => {
                popup.querySelector('.popup-card').style.transform = 'scale(1)';
            }, 10);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    // Click outside to close popup
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}