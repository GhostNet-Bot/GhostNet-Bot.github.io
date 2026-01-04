document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loading-screen');
    const content = document.getElementById('main-content');

    // 1. Initial Status Check
    updateBotStatus();
    setInterval(updateBotStatus, 30000);

    // 2. SMART LOADING LOGIC
    // Detect if the page was reloaded
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
    
    // Detect if this is the first time they've ever seen the loader this session
    const isFirstVisit = !sessionStorage.getItem('session_started');

    if (isReload || isFirstVisit) {
        // Show the boot sequence for reloads or first-time entries
        sessionStorage.setItem('session_started', 'true');
        if (loader && content) {
            content.style.display = 'none';
            content.style.opacity = '0';
            startBoot();
        }
    } else {
        // Instant load for normal link clicks
        if(loader) loader.style.display = 'none';
        if(content) {
            content.style.display = 'block';
            content.style.opacity = '1';
        }
    }
});

// STATUS UPDATE LOGIC
async function updateBotStatus() {
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('status-text');
    if (!dot || !text) return;

    try {
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

// BOOT SEQUENCE LOGIC
function startBoot() {
    const fill = document.getElementById('fill');
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

// REVIEW SLIDER LOGIC
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
