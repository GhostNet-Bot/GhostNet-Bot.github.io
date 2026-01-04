// COPYRIGHT 2026 BY NOTHINGBUTTYLER. ALL RIGHTS RESERVED. \\

function initPage() {
    const loader = document.getElementById('loading-screen');
    const content = document.getElementById('main-content');
    const fill = document.getElementById('fill');
    const status = document.getElementById('status');

    // 1. SMART LOADER CHECK \\
    if (sessionStorage.getItem('booted')) {
        if (loader) loader.style.display = 'none';
        if (content) {
            content.style.display = 'block';
            content.style.opacity = '1';
        }
    } else {
        runBootSequence(loader, content, fill, status);
    }
}

function runBootSequence(loader, content, fill, status) {
    let width = 0;
    const messages = ["Initializing...", "Syncing Nav...", "Decrypting...", "Ready."];

    const interval = setInterval(() => {
        width += Math.random() * 20;
        if (width >= 100) {
            width = 100;
            clearInterval(interval);
            
            // Mark as booted so it doesn't show again this session
            sessionStorage.setItem('booted', 'true');

            setTimeout(() => {
                if (loader) loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader) loader.style.display = 'none';
                    if (content) {
                        content.style.display = 'block';
                        setTimeout(() => { content.style.opacity = '1'; }, 50);
                    }
                }, 500);
            }, 500);
        }
        if (fill) fill.style.width = width + '%';
        if (status) status.innerText = messages[Math.floor(width / 30)] || "Ready.";
    }, 300);
}

// Start the check as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', initPage);

// 2. INDEX.HTML FULL SCRIPT \\
        let w = 0;
        const f = document.getElementById('fill');
        const s = document.getElementById('status');
        const msgs = ["Loading...", "Syncing...", "Decrypting...", "Complete"];

        const load = setInterval(() => {
            w += Math.random() * 20;
            if (w >= 100) {
                w = 100;
                clearInterval(load);
                setTimeout(() => {
                    document.getElementById('loading-screen').style.display = 'none';
                    const main = document.getElementById('main-content');
                    main.style.display = 'block';
                    setTimeout(() => { main.style.opacity = '1'; }, 50);
                }, 500);
            }
            f.style.width = w + '%';
            s.innerText = msgs[Math.floor(w/30)] || "Complete";
        }, 300);

// Add this to your existing script.js

function checkAuth() {
    const isLoggedIn = localStorage.getItem('ghostnet_session');
    const guestLinks = document.getElementById('guest-links');
    const userLinks = document.getElementById('user-links');

    if (isLoggedIn === 'true') {
        if (guestLinks) guestLinks.style.display = 'none';
        if (userLinks) userLinks.style.display = 'inline';
    } else {
        if (guestLinks) guestLinks.style.display = 'inline';
        if (userLinks) userLinks.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('ghostnet_session');
    // Redirect to home after logout
    window.location.href = 'index.html'; 
}

// Update your initPage function to call checkAuth()
// Example:
// function initPage() {
//    ... existing logic ...
//    checkAuth();
// }
