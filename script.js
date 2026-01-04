document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loading-screen');
    const content = document.getElementById('main-content');
    
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
