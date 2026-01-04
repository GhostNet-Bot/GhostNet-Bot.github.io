// COPYRIGHT 2026 BY NOTHINGBUTTYLER. ALL RIGHTS RESERVED. \\

function initPage() {
    const loader = document.getElementById('loading-screen');
    const content = document.getElementById('main-content');
    const fill = document.getElementById('fill');
    const status = document.getElementById('status');

    // 1. SMART LOADER CHECK
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
