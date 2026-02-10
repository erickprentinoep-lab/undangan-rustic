document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Loaded - Starting initialization...');

    // 1. Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: false,
            offset: 50,
            duration: 1200,
            easing: 'ease-out-cubic',
        });
        console.log('✅ AOS initialized');
    }

    // 2. Elements
    const openBtn = document.getElementById('open-btn');
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('main-content');
    const musicToggle = document.getElementById('music-toggle');
    const leafContainer = document.getElementById('leafContainer');

    // 3. Open Invitation Logic
    if (openBtn && overlay && mainContent) {
        openBtn.addEventListener('click', () => {
            console.log('🎯 Open button clicked');

            // Slide up overlay
            overlay.style.transform = 'translateY(-100%)';

            // Show Main Content
            mainContent.classList.remove('hidden');
            setTimeout(() => {
                mainContent.style.opacity = '1';
                console.log('👁️ Main content visible');
            }, 100);

            // Play Music
            if (musicToggle) {
                musicToggle.classList.remove('hidden');
                // Trigger click to start if it has music logic or manual play
            }

            // Refresh AOS
            setTimeout(() => {
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }, 600);
        });
    }

    // 4. Falling Leaves Effect
    function createLeaf() {
        if (!leafContainer) return;

        const leafDiv = document.createElement('div');
        const size = Math.random() * 20 + 20;

        leafDiv.style.width = `${size}px`;
        leafDiv.style.height = `${size}px`;
        leafDiv.style.position = 'absolute';
        leafDiv.style.left = Math.random() * 100 + 'vw';
        leafDiv.style.top = '-50px';
        leafDiv.style.opacity = Math.random() * 0.4 + 0.3;
        leafDiv.style.zIndex = '9999';
        leafDiv.style.pointerEvents = 'none';
        leafDiv.style.color = '#556B2F';

        leafDiv.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
        `;

        const duration = Math.random() * 8 + 7;
        leafDiv.style.transition = `top ${duration}s linear, transform ${duration}s ease-in-out`;

        leafContainer.appendChild(leafDiv);

        setTimeout(() => {
            leafDiv.style.top = '110vh';
            leafDiv.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
        }, 50);

        setTimeout(() => {
            leafDiv.remove();
        }, duration * 1000);
    }

    setInterval(createLeaf, 2000);

    // 5. Countdown Timer
    const weddingDate = new Date("Jan 1, 2026 08:00:00").getTime();
    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');

    function updateCountdown() {
        if (!daysElem) return;
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            daysElem.innerText = "00";
            hoursElem.innerText = "00";
            minutesElem.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        daysElem.innerText = days.toString().padStart(2, '0');
        hoursElem.innerText = hours.toString().padStart(2, '0');
        minutesElem.innerText = minutes.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});
