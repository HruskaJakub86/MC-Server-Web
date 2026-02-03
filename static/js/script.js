// Function to copy Server IP to clipboard
function copyIP() {
    const ipText = document.getElementById("server-ip").innerText;
    navigator.clipboard.writeText(ipText).then(() => {
        const btn = document.querySelector(".btn-copy");
        const originalText = btn.innerText;
        btn.innerText = "Copied!";
        setTimeout(() => {
            btn.innerText = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

(function () {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w = 0;
    let h = 0;
    const colors = ['#FFD700', '#78B159', '#ffffff'];
    const count = 60;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    function init() {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                c: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }
    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.c;
            ctx.globalAlpha = 0.7;
            ctx.fill();
        }
    }
    function update() {
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10;
            if (p.y > h + 10) p.y = -10;
        }
    }
    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }
    resize();
    init();
    loop();
    window.addEventListener('resize', () => {
        resize();
        init();
    });
})();

window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.1;
    document.body.style.backgroundPosition = `center ${-y}px`;
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.glass-nav');
    if (!header) return;
    if (window.scrollY > 10) {
        header.classList.add('nav-scrolled');
    } else {
        header.classList.remove('nav-scrolled');
    }
});

// Tilt effect for feature cards
(function () {
    const cards = document.querySelectorAll('.feature-card');
    if (!cards.length) return;
    const maxTilt = 6;
    cards.forEach(card => {
        function onMove(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = -((y - centerY) / centerY) * maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }
        function reset() {
            card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
        }
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', reset);
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.12s ease';
        });
    });
})();

// Ensure smooth scrolling behavior is applied (CSS covers it; this is a fallback)
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
