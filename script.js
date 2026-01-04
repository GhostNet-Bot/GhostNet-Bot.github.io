// --- GLOBAL CONFIG & STATE ---
let currentReview = 0;
const reviews = [
    { text: '"The infection system is terrifyingly efficient. System management at its peak."', user: "- Staff_Member_X" },
    { text: '"The most aesthetic bot interface I have ever used. Total immersion."', user: "- Neural_Link_7" },
    { text: '"GhostNet simplified our server security protocols overnight. Essential."', user: "- Root_Admin" }
];

// --- MAIN INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loading-screen');
    const content = document.getElementById('main-content');

    // 1. Check Login Status (If on Login Page)
    if (window.location.pathname.includes('login')) {
        if (localStorage.getItem('ghostnet_session') === 'true') {
            window.location.href = '/dashboard';
            return; 
        }
    }

    // 2. Initial Status Check
    updateBotStatus();
    setInterval(updateBotStatus, 30000);

    // 3. Smart Loading Logic
    const navEntries = performance.getEntriesByType("navigation");
    const navType = navEntries.length > 0 ? navEntries[0].type : "";
    
    const isFirstVisit = !sessionStorage.getItem('session_started');
    const isReload = navType === 'reload';

    if (isFirstVisit || isReload) {
        sessionStorage.setItem('session_started', 'true');
        if (loader && content) {
            content.style.display = 'none';
            content.style.opacity = '0';
            startBoot();
        }
    } else {
        if(loader) loader.style.display = 'none';
        if(content) {
            content.style.display = 'block';
            content.style.opacity = '1';
        }
    }

    updateHeaderUI();
});

// --- UI HELPERS ---
function updateHeaderUI() {
    const guestLinks = document.getElementById('guest-links');
    const userLinks = document.getElementById('user-links');
    const isLoggedIn = localStorage.getItem('ghostnet_session') === 'true';

    if (isLoggedIn && userLinks && guestLinks) {
        guestLinks.style.display = 'none';
        userLinks.style.display = 'inline';
    }
}

// --- LOGIN LOGIC ---
function simulateDiscordLogin(e) {
    const eventObj = e || window.event;
    if (eventObj && eventObj.preventDefault) eventObj.preventDefault();
    
    const btn = eventObj.currentTarget || document.activeElement;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AUTHORIZING...';
    
    setTimeout(() => {
        localStorage.setItem('ghostnet_session', 'true');
        window.location.href = '/dashboard';
    }, 1500);
}

function logout() {
    localStorage.removeItem('ghostnet_session');
    window.location.href = '/';
}

// --- BOT STATUS LOGIC ---
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

// --- BOOT SEQUENCE ---
function startBoot() {
    const fill = document.getElementById('fill');
    let w = 0;
    const interval = setInterval(() => {
        w += Math.random() * 15;
        if (w >= 100) {
            w = 100;
            clearInterval(interval);
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

// --- REVIEW SLIDER ---
function moveReview(dir) {
    currentReview += dir;
    if (currentReview < 0) currentReview = reviews.length - 1;
    if (currentReview >= reviews.length) currentReview = 0;
    
    document.getElementById('review-text').innerText = reviews[currentReview].text;
    document.getElementById('review-user').innerText = reviews[currentReview].user;
}
