document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Lucide Icons Safely
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 1. Custom Cursor Logic (Only on Desktop)
    const cursor = document.querySelector('.custom-cursor');
    if (cursor && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        const interactiveElements = document.querySelectorAll('a, button, .menu-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 3, backgroundColor: 'rgba(255, 77, 0, 0.2)', backdropFilter: 'blur(4px)', border: '1px solid var(--accent)' });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, backgroundColor: 'var(--accent)', backdropFilter: 'none', border: 'none' });
            });
        });
    }

    // 2. GSAP Animations with Safety Checks
    if (typeof gsap !== 'undefined') {
        // Register Plugins if available
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero Animations
        const tl = gsap.timeline();
        const heroTitle = document.querySelector('.hero-title span');
        if (heroTitle) {
            tl.from('.hero-title span', { y: 100, autoAlpha: 0, duration: 1.5, ease: "expo.out" });
        }
        tl.from('.hero-title', { scale: 1.1, duration: 2, ease: "expo.out" }, "-=1.5");
        tl.from('.hero-subtitle', { autoAlpha: 0, letterSpacing: "20px", duration: 1, ease: "power2.out" }, "-=1");

        // Scroll Animations for Categories
        const categories = document.querySelectorAll('.menu-category');
        categories.forEach(cat => {
            const title = cat.querySelector('.category-title');
            const items = cat.querySelectorAll('.menu-item');

            if (title && typeof ScrollTrigger !== 'undefined') {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: cat,
                        start: "top 85%",
                    },
                    x: -30,
                    autoAlpha: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }

            if (items.length > 0 && typeof ScrollTrigger !== 'undefined') {
                gsap.from(items, {
                    scrollTrigger: {
                        trigger: cat.querySelector('.menu-grid') || cat,
                        start: "top 90%",
                    },
                    y: 30,
                    autoAlpha: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            }
        });
    }

    // 3. Sticky Nav Logic
    const sections = document.querySelectorAll('.menu-category');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateNav);
    updateNav(); // Initial check

    // 4. Modal Logic
    const fabButton = document.getElementById('whatsappFab');
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeModal');
    const productModal = document.getElementById('productModal');
    const closeProductModal = document.getElementById('closeProductModal');

    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (fabButton) fabButton.addEventListener('click', () => openModal(contactModal));
    if (closeContactModal) closeContactModal.addEventListener('click', () => closeModal(contactModal));
    if (contactModal) contactModal.addEventListener('click', (e) => { if (e.target === contactModal) closeModal(contactModal); });

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.item-img')?.src || '';
            const title = item.querySelector('h3')?.innerText || '';
            const price = item.querySelector('.price')?.innerText || '';
            const desc = item.querySelector('.item-description')?.innerText || '';

            const pmImg = document.getElementById('pmImg');
            if (pmImg) pmImg.src = img;
            const pmTitle = document.getElementById('pmTitle');
            if (pmTitle) pmTitle.innerText = title;
            const pmPrice = document.getElementById('pmPrice');
            if (pmPrice) pmPrice.innerText = price;
            const pmDesc = document.getElementById('pmDesc');
            if (pmDesc) pmDesc.innerText = desc;

            openModal(productModal);
        });
    });

    if (closeProductModal) closeProductModal.addEventListener('click', () => closeModal(productModal));
    if (productModal) productModal.addEventListener('click', (e) => { if (e.target === productModal) closeModal(productModal); });
});
