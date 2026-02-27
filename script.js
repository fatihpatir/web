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

// ==== GITHUB API - FETCH REPOSITORIES ==== //
async function fetchGithubProjects() {
    const username = 'fatihpatir'; // GitHub kullanıcı adınız
    const githubGrid = document.getElementById('github-projects-grid');

    if (!githubGrid) return;

    try {
        // İstemediğimiz repoların listesini büyütüyoruz ki daha fazlasını çekip filtreleyelim (per_page=100)
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

        if (!response.ok) throw new Error('GitHub API Error');

        const repos = await response.json();

        // Gizlenmesini istediğiniz repoların isimlerini buraya yazın
        const excludedRepos = ['fatihpatir', 'web'];

        // Repoları filtrele ve arrayde tut (Tüm diğer projeleri göstermek için .slice() limitini kaldırdık)
        const filteredRepos = repos.filter(repo => !excludedRepos.includes(repo.name));

        let htmlContent = '';

        if (filteredRepos.length === 0) {
            htmlContent = '<div style="text-align: center; width: 100%;">Henüz listelenecek proje bulunamadı.</div>';
        } else {
            filteredRepos.forEach(repo => {
                const description = repo.description || 'Açıklama bulunmuyor.';
                const language = repo.language || 'Code';
                const stars = repo.stargazers_count;

                htmlContent += `
                    <div class="project-card glass">
                        <i class="fab fa-github main-icon" style="font-size: 2.5rem; color: var(--light);"></i>
                        <h3>${repo.name}</h3>
                        <p>${description}</p>
                        
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem; font-size:0.85rem; color: #94a3b8;">
                            <span><i class="fas fa-code"></i> ${language}</span>
                            <span><i class="fas fa-star" style="color:#fbbf24;"></i> ${stars}</span>
                        </div>
                        
                        <a href="${repo.html_url}" target="_blank" class="btn btn-outline" style="text-align: center; padding: 0.5rem 1rem;">İncele <i class="fas fa-external-link-alt" style="font-size:0.8rem; margin-left:5px;"></i></a>
                    </div>
                `;
            });
        }

        githubGrid.innerHTML = htmlContent;

    } catch (error) {
        console.error('Projeler çekilirken hata:', error);
        githubGrid.innerHTML = '<div style="text-align: center; width: 100%; color: #ef4444;">GitHub projeleri şu an yüklenemiyor.</div>';
    }
}

// Sayfa yüklendiğinde projeleri çek
document.addEventListener('DOMContentLoaded', () => {
    fetchGithubProjects();
});