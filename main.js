// DOM Elements
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-btn');
const scIframe = document.getElementById('sc-widget');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');

// Initialize SoundCloud
let widget;

// Sparkle Dust System
const createSparkle = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle animate-sparkle';

    // Very fine randomization
    const size = Math.random() * 2 + 1;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`;
    sparkle.style.opacity = Math.random() * 0.5 + 0.2;

    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 4000);
};

// Start Sparkles for multiple containers
setInterval(() => {
    createSparkle('sparkle-dust');
    createSparkle('sparkle-dust-overlay');
}, 200);

try {
    if (typeof SC !== 'undefined') {
        widget = SC.Widget(scIframe);
        widget.bind(SC.Widget.Events.READY, () => {
            console.log('Premium Audio Ready');
            widget.setVolume(70);
        });
    }
} catch (e) { console.error('Audio Init Failed', e); }

let isPlaying = false;

// Reveal Animations on Scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Support for both legacy .reveal and new .luxe-reveal
            if (entry.target.classList.contains('reveal')) {
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .luxe-reveal').forEach(el => revealObserver.observe(el));

// Open Invitation Logic
openBtn.addEventListener('click', () => {
    // 1. Audio Play
    if (widget) {
        widget.play();
        isPlaying = true;
        musicIcon.className = 'fas fa-pause gold-gradient-text text-xl';
    }

    // 2. Animate Opening
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(1.1) rotateX(10deg)';

    setTimeout(() => {
        overlay.classList.add('hidden');
        mainContent.classList.remove('hidden');
        musicToggle.classList.remove('hidden');

        setTimeout(() => {
            mainContent.style.opacity = '1';
            console.log('Main content should now be visible');
        }, 100);
    }, 1500);
});

// Music Toggle Click
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        widget.pause();
        musicIcon.className = 'fas fa-play gold-gradient-text text-xl';
    } else {
        widget.play();
        musicIcon.className = 'fas fa-pause gold-gradient-text text-xl';
    }
    isPlaying = !isPlaying;
});

// Countdown Logic
const targetDate = new Date("Sep 20, 2026 09:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) return;

    document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
}, 1000);

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

document.querySelectorAll('img').forEach(img => {
    if (!img.closest('#overlay') && !img.closest('#lightbox')) {
        img.classList.add('cursor-zoom-in');
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
            setTimeout(() => lightbox.classList.add('active'), 10);
        });
    }
});

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.classList.add('hidden'), 500);
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.classList.add('hidden'), 500);
        }
    });
}
