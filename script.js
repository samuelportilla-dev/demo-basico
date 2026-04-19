document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader & Initialization Logic
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader-progress');
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                initPremiumAnimations();
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 200);

    function initPremiumAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // 2. Custom Cursor Tracking
        const cursor = document.querySelector('.custom-cursor');
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 6,
                y: e.clientY - 6,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        // Cursor scaling on interactables
        document.querySelectorAll('a, button, .menu-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 4, backgroundColor: 'rgba(255, 60, 0, 0.1)', border: '1px solid #FF3C00' });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, backgroundColor: '#FF3C00', border: 'none' });
            });
        });

        // 3. Hero Section Entrance
        const heroTl = gsap.timeline();
        heroTl.from('.hero-title span', { y: 100, opacity: 0, duration: 1.5, ease: "expo.out" })
              .from('.premium-badge', { y: -20, opacity: 0, duration: 1 }, "-=1")
              .from('.hero-subtitle', { opacity: 0, letterSpacing: "30px", duration: 1.2 }, "-=1")
              .from('.hero-cta', { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");

        // 4. Menu Items Reveal
        const categories = document.querySelectorAll('.menu-category');
        categories.forEach(cat => {
            gsap.from(cat.querySelector('.category-title'), {
                scrollTrigger: {
                    trigger: cat,
                    start: "top 85%",
                },
                x: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out"
            });

            gsap.from(cat.querySelectorAll('.menu-item'), {
                scrollTrigger: {
                    trigger: cat.querySelector('.menu-grid'),
                    start: "top 90%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                clearProps: "all" // Ensures visibility if something goes wrong
            });
        });

        // 5. Sticky Nav Active State
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 250) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(current)) {
                    link.classList.add("active");
                }
            });
        });
    }

    // Modal Logic
    const fab = document.getElementById('whatsappFab');
    const contactModal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('closeModal');

    fab.onclick = () => contactModal.classList.add('active');
    closeBtn.onclick = () => contactModal.classList.remove('active');
    contactModal.onclick = (e) => { if(e.target === contactModal) contactModal.classList.remove('active'); };
});
