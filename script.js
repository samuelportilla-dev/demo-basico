document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('scroll-visible');
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${(index % 2) * 0.1}s`; 
        observer.observe(item);
    });

    // Intersection Observer for Sticky Nav Active State
    const sections = document.querySelectorAll('.menu-category');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserverOptions = {
        root: null,
        rootMargin: '-100px 0px -40% 0px', // Trigger when section hits middle-top of screen
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active to the corresponding link
                const id = entry.target.getAttribute('id');
                const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (matchingLink) {
                    matchingLink.classList.add('active');
                    // Ensure the link is scrolled into view (useful on mobile horizontal nav)
                    matchingLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // General Contact Modal Logic
    const fabButton = document.getElementById('whatsappFab');
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeModal');

    fabButton.addEventListener('click', () => { contactModal.classList.add('active'); });
    closeContactModal.addEventListener('click', () => { contactModal.classList.remove('active'); });
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) contactModal.classList.remove('active');
    });

    // Product Modal Logic
    const productModal = document.getElementById('productModal');
    const closeProductModal = document.getElementById('closeProductModal');
    const pmImg = document.getElementById('pmImg');
    const pmTitle = document.getElementById('pmTitle');
    const pmPrice = document.getElementById('pmPrice');
    const pmDesc = document.getElementById('pmDesc');

    // Make every menu item clickable
    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Extract info from DOM
            const img = item.querySelector('.item-img').src;
            const title = item.querySelector('h3').innerText;
            const price = item.querySelector('.price').innerText;
            const desc = item.querySelector('.item-description').innerText;

            // Populate the modal
            pmImg.src = img;
            pmTitle.innerText = title;
            pmPrice.innerText = price;
            pmDesc.innerText = desc;

            // Show modal
            productModal.classList.add('active');
        });
    });

    closeProductModal.addEventListener('click', () => { productModal.classList.remove('active'); });
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) productModal.classList.remove('active');
    });
});
