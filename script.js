document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loading-screen');
    const content = document.getElementById('main-content');

    // Make sure this is at the VERY TOP of script.js
document.addEventListener('DOMContentLoaded', () => {
    updateBotStatus(); // Start the check
});

    
    // 1. Loading Screen Logic
    // FORCE SHOW for testing: change to 'false' if you want it to skip after first time
    if (sessionStorage.getItem('booted')) {
        if(loader) loader.style.display = 'none';
        if(content) {
            content.style.display = 'block';
            content.style.opacity = '1';
        }
    } else {
        startBoot();
    }

    // 2. Run Status Check
    updateBotStatus();
    setInterval(updateBotStatus, 30000);
});

async function updateBotStatus() {
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('status-text');
    if (!dot || !text) return;

    try {
        // Use a timeout so it doesn't hang forever
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        await fetch('https://ghostnet-0p4u.onrender.com', { 
            mode: 'no-cors',
            signal: controller.signal 
        });
        
        clearTimeout(timeoutId);
        dot.style.background = '#00ff41';
        dot.style.boxShadow = '0 0 10px #00ff41';
        text.style.color = '#00ff41';
        text.innerText = 'SYSTEM_ONLINE';
    } catch (e) {
        dot.style.background = '#ff4444';
        dot.style.boxShadow = '0 0 10px #ff4444';
        text.style.color = '#ff4444';
        text.innerText = 'SYSTEM_OFFLINE';
    }
}

function startBoot() {
    const fill = document.getElementById('fill');
    const loadText = document.getElementById('status'); // The text inside the loader
    let w = 0;
    
    const interval = setInterval(() => {
        w += Math.random() * 15;
        if (w >= 100) {
            w = 100;
            clearInterval(interval);
            sessionStorage.setItem('booted', 'true');
            finishLoading();
        }
        if(fill) fill.style.width = w + '%';
    }, 200);
}

function finishLoading() {
    const loader = document.getElementById('loading-screen');
    const content = document.getElementById('main-content');
    if(loader) loader.style.opacity = '0';
    setTimeout(() => {
        if(loader) loader.style.display = 'none';
        if(content) {
            content.style.display = 'block';
            setTimeout(() => { content.style.opacity = '1'; }, 50);
        }
    }, 500);
}

const reviews = [
    { text: '"The infection system is terrifyingly efficient. Isaac never saw it coming."', user: "- Staff_Member_X" },
    { text: '"The most aesthetic bot interface I have ever used. Total immersion."', user: "- Neural_Link_7" },
    { text: '"GhostNet simplified our server security protocols overnight. Essential."', user: "- Root_Admin" }
];
let currentReview = 0;

function moveReview(dir) {
    currentReview += dir;
    if (currentReview < 0) currentReview = reviews.length - 1;
    if (currentReview >= reviews.length) currentReview = 0;
    
    document.getElementById('review-text').innerText = reviews[currentReview].text;
    document.getElementById('review-user').innerText = reviews[currentReview].user;
}
