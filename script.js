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
            return; // Stop running script if we are redirecting
        }
    }

    // 2. Initial Status Check (Top Bar)
    updateBotStatus();
    setInterval(updateBotStatus, 30000);

    // 3. Smart Loading Logic
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
    const isFirstVisit = !sessionStorage.getItem('session_started');

    if (isReload || isFirstVisit) {
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

    // 4. Update Header Buttons based on Session
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
    // If 'e' is provided use it, otherwise use global event (for older browsers)
    const eventObj = e || window.event;
    if (eventObj) eventObj.preventDefault();
    
    const btn = eventObj.currentTarget;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AUTHORIZING...';
    
    // Your actual Discord OAuth2 Link
    const discordAuthUrl = "https://discord.com/oauth2/authorize?client_id=1453941722324402327&response_type=code&redirect_uri=https%3A%2F%2Fghostnet-bot.github.io%2Flogin&scope=identify+guilds";
    
    setTimeout(() => {
        localStorage.setItem('ghostnet_session', 'true');
        // Redirect to dashboard (instant for now, change to discordAuthUrl later)
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

function simulateDiscordLogin() {
    const btn = event.currentTarget;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CONNECTING...';
    
    // Replace the '#' with your actual OAuth2 link from Step 2
    const discordAuthUrl = "https://discord.com/oauth2/authorize?client_id=1453941722324402327&response_type=code&redirect_uri=https%3A%2F%2Fghostnet-bot.github.io%2Flogin&scope=identify+guilds";
    
    setTimeout(() => {
        // In a real setup, we'd go to the URL. 
        // For now, let's keep the dashboard redirect to keep testing!
        localStorage.setItem('ghostnet_session', 'true');
        window.location.href = '/dashboard';
        
        // When you're ready for the real deal, use this line instead:
        // window.location.href = discordAuthUrl;
    }, 1500);
}
