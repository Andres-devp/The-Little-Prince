/* =====================================================================
   THE LITTLE PRINCE — TIMELINE SCRIPTS
   Scroll reveal, star field, & chapter navigation highlight
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─── 1. GENERATE STAR FIELD ──────────────────────────────
    const starsContainer = document.getElementById('starsContainer');
    const STAR_COUNT = 180;

    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 3 + 1;          // 1–4 px
        const x    = Math.random() * 100;             // % left
        const y    = Math.random() * 100;             // % top
        const dur  = (Math.random() * 3 + 2).toFixed(1); // 2–5s
        const delay = (Math.random() * 5).toFixed(1);

        star.style.width  = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left   = `${x}%`;
        star.style.top    = `${y}%`;
        star.style.setProperty('--dur', `${dur}s`);
        star.style.animationDelay = `${delay}s`;

        starsContainer.appendChild(star);
    }

    // ─── 2. SCROLL REVEAL FOR TIMELINE ITEMS ─────────────────
    const items = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    items.forEach(item => revealObserver.observe(item));

    // ─── 3. CHAPTER NAV ACTIVE STATE ─────────────────────────
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(items);

    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const targetId = entry.target.id;
            const correspondingLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);

            if (entry.isIntersecting && correspondingLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // ─── 4. SMOOTH SCROLL FOR NAV LINKS ──────────────────────
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // ─── 5. HERO PARALLAX (subtle) ───────────────────────────
    const hero = document.getElementById('hero');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        if (scrollY < window.innerHeight) {
            // Start from center (50%) and shift down gently
            const offset = 50 + scrollY * 0.04;
            hero.style.backgroundPosition = `center ${offset}%`;
        }
    }, { passive: true });
});
