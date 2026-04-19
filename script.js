document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    
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

    // 2. Initial Hero Animations
    const tl = gsap.timeline();
    tl.from('.hero-title span', { y: 100, opacity: 0, duration: 1.5, ease: "expo.out" })
      .from('.hero-title', { scale: 1.2, duration: 2, ease: "expo.out" }, "-=1.5")
      .from('.hero-subtitle', { opacity: 0, letterSpacing: "20px", duration: 1, ease: "power2.out" }, "-=1")
      .from('.logo-badge', { y: -20, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=1");

    // 3. Scroll Animations for Categories
    const categories = document.querySelectorAll('.menu-category');
    categories.forEach(cat => {
        gsap.from(cat.querySelector('.category-title'), {
            scrollTrigger: {
                trigger: cat,
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(cat.querySelectorAll('.menu-item'), {
            scrollTrigger: {
                trigger: cat.querySelector('.menu-grid'),
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
    });

    // 4. Sticky Nav Active State Fix
    const sections = document.querySelectorAll('.menu-category');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 5. Modal Logic Refresh
    const fabButton = document.getElementById('whatsappFab');
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeModal');

    const openModal = (modal) => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    fabButton.addEventListener('click', () => openModal(contactModal));
    closeContactModal.addEventListener('click', () => closeModal(contactModal));
    contactModal.addEventListener('click', (e) => { if (e.target === contactModal) closeModal(contactModal); });

    // Product Modal Logic
    const productModal = document.getElementById('productModal');
    const closeProductModal = document.getElementById('closeProductModal');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.item-img').src;
            const title = item.querySelector('h3').innerText;
            const price = item.querySelector('.price').innerText;
            const desc = item.querySelector('.item-description').innerText;

            document.getElementById('pmImg').src = img;
            document.getElementById('pmTitle').innerText = title;
            document.getElementById('pmPrice').innerText = price;
            document.getElementById('pmDesc').innerText = desc;

            openModal(productModal);
        });
    });

    closeProductModal.addEventListener('click', () => closeModal(productModal));
    productModal.addEventListener('click', (e) => { if (e.target === productModal) closeModal(productModal); });
});
