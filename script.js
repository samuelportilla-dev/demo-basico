document.addEventListener('DOMContentLoaded', () => {
    // 0. Immediate Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

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
        document.body.classList.add('cursor-initialized');

        // 1. Header Scroll Logic
        const header = document.querySelector('.global-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // 2. Cursor scaling
        document.querySelectorAll('a, button, .menu-item, .category-card-landing').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 4, backgroundColor: 'rgba(255, 60, 0, 0.1)', border: '1px solid #FF3C00' });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, backgroundColor: '#FF3C00', border: 'none' });
            });
        });

        // 3. Page Specific Entrance
        if (document.body.classList.contains('home-page')) {
            const landingTl = gsap.timeline();
            landingTl.from('.hero-bg-media', { scale: 1.2, duration: 2, ease: "power2.out" })
                     .from('.entrance-anim', { 
                        y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" 
                     }, "-=1.5");

            // 7. Hero Parallax
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroBg = document.querySelector('.hero-bg-media img');
                if (heroBg) {
                    heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0005})`;
                }
            });

            // Passion Section Reveal
            gsap.from('.img-reveal', {
                scrollTrigger: { trigger: '.passion-section', start: "top 70%" },
                scale: 1.3, opacity: 0, duration: 1.5, ease: "power2.out"
            });
            gsap.from('.passion-text > *', {
                scrollTrigger: { trigger: '.passion-section', start: "top 70%" },
                x: 50, opacity: 0, duration: 1, stagger: 0.2
            });

            // Stats Counter Logic
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                gsap.to(stat, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%"
                    }
                });
            });

            // Specials Reveal
            gsap.from('.special-card', {
                scrollTrigger: { trigger: '.specials-gallery', start: "top 80%" },
                y: 100, opacity: 0, duration: 1.2, stagger: 0.3, ease: "power3.out"
            });

            // Testimonials are now handled via CSS for better reliability
        }

        if (document.body.classList.contains('menu-page')) {
            gsap.from('.intro-content > *', {
                y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
            });

            const categories = document.querySelectorAll('.menu-category');
            categories.forEach(cat => {
                const titleNode = cat.querySelector('.category-title');
                if (titleNode) {
                    gsap.from(titleNode, {
                        scrollTrigger: { trigger: cat, start: "top 85%" },
                        x: -100, opacity: 0, duration: 1.2, ease: "power4.out"
                    });
                }

                gsap.from(cat.querySelectorAll('.menu-item'), {
                    scrollTrigger: { trigger: cat.querySelector('.menu-grid'), start: "top 90%" },
                    y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
                    clearProps: "all"
                });
            });

            // --- ITEM DETAIL MODAL LOGIC ---
            const detailModal = document.getElementById('detailModal');
            const closeDetail = document.getElementById('closeDetail');
            
            if (detailModal) {
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.addEventListener('click', () => {
                        // FIX: Only trigger modal on mobile screens
                        if (window.innerWidth > 768) return;

                        const title = item.querySelector('h3').innerText;
                        const price = item.querySelector('.price').innerText;
                        const desc = item.querySelector('.item-description').innerHTML;
                        const img = item.querySelector('.item-img').src;
                        
                        // Handle optional specs
                        const specsNode = item.querySelector('.item-specs');
                        const specs = specsNode ? specsNode.innerHTML : "";
                        
                        document.getElementById('detailTitle').innerText = title;
                        document.getElementById('detailPrice').innerText = price;
                        document.getElementById('detailDesc').innerHTML = desc;
                        document.getElementById('detailImg').src = img;
                        document.getElementById('detailSpecs').innerHTML = specs;
                        
                        // Specific pairing logic
                        const pairingIcon = document.getElementById('pairingIcon');
                        const pairingText = document.getElementById('pairingText');
                        if (title.toLowerCase().includes('brangus') || title.toLowerCase().includes('infarto')) {
                            pairingIcon.setAttribute('data-lucide', 'beer');
                            pairingText.innerText = "Sugerencia: Marida con nuestra Cerveza Artesanal Negra para potenciar los ahumados.";
                        } else {
                            pairingIcon.setAttribute('data-lucide', 'droplets');
                            pairingText.innerText = "Sugerencia: Acompaña con nuestra Limonada Cerezada para un toque refrescante.";
                        }
                        
                        lucide.createIcons();
                        detailModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    });
                });

                closeDetail.addEventListener('click', (e) => {
                    e.stopPropagation();
                    detailModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });

                detailModal.addEventListener('click', (e) => {
                    if (e.target === detailModal) {
                        detailModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        }

        if (document.body.classList.contains('about-page')) {
            gsap.from('.about-hero-content > *', {
                y: 50, opacity: 0, duration: 1.5, stagger: 0.3, ease: "expo.out"
            });

            gsap.from('.story-text > *', {
                scrollTrigger: { trigger: '.our-story', start: "top 70%" },
                x: -50, opacity: 0, duration: 1, stagger: 0.2
            });

            gsap.from('.story-gallery > *', {
                scrollTrigger: { trigger: '.our-story', start: "top 70%" },
                x: 50, opacity: 0, duration: 1.2, stagger: 0.3, ease: "power2.out"
            });

            gsap.from('.value-card', {
                scrollTrigger: { trigger: '.about-values', start: "top 95%" },
                y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: "back.out(1.7)"
            });

            gsap.from('.team-member', {
                scrollTrigger: { trigger: '.team-section', start: "top 80%" },
                scale: 0.8, opacity: 0, duration: 1, stagger: 0.3, ease: "power3.out"
            });

            gsap.from('.ritual-step', {
                scrollTrigger: { trigger: '.ritual-grid', start: "top 85%" },
                y: 40, opacity: 0, duration: 1, stagger: 0.3, ease: "power2.out"
            });

            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                const xVal = index % 2 === 0 ? -100 : 100;
                gsap.from(item, {
                    scrollTrigger: { trigger: item, start: "top 90%" },
                    x: xVal, opacity: 0, duration: 1.2, ease: "expo.out"
                });
            });

            gsap.from('.badge-item', {
                scrollTrigger: { trigger: '.quality-badges', start: "top 90%" },
                y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "back.out(2)"
            });

            gsap.from('.cta-box', {
                scrollTrigger: { trigger: '.nosotros-cta', start: "top 85%" },
                scale: 0.9, opacity: 0, duration: 1.5, ease: "elastic.out(1, 0.75)"
            });
        }

        if (document.body.classList.contains('contact-page')) {
            gsap.from('.contact-hero > *', {
                y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
            });

            gsap.from('.info-card', {
                scrollTrigger: { trigger: '.contact-info-panel', start: "top 85%" },
                x: -50, opacity: 0, duration: 1, stagger: 0.15, ease: "power2.out"
            });

            gsap.from('.contact-form-wrapper', {
                scrollTrigger: { trigger: '.contact-form-wrapper', start: "top 85%" },
                x: 50, opacity: 0, duration: 1, ease: "power2.out"
            });

            gsap.from('.faq-item', {
                scrollTrigger: { trigger: '.faq-bento', start: "top 90%" },
                y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
            });
        }


        // --- NEW: LUXURY ATMOSPHERE ENGINE ---
        
        // 5. Fire Particles Injection
        const particleContainer = document.getElementById('fireParticles');
        if (particleContainer) {
            const createParticle = () => {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                particle.style.left = `${Math.random() * 100}%`;
                const duration = Math.random() * 3 + 4;
                particle.style.animationDuration = `${duration}s`;
                particle.style.opacity = Math.random() * 0.5 + 0.2;
                
                particleContainer.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, duration * 1000);
            };
            
            const isMobile = window.matchMedia("(hover: none)").matches;
            setInterval(createParticle, isMobile ? 600 : 200);
        }

        // 6. Scroll Progress Bar
        const progressBar = document.querySelector('.scroll-progress');
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            if (progressBar) progressBar.style.width = scrolled + "%";
        });
    }

    // Modal Logic
    const fab = document.getElementById('whatsappFab');
    const contactModal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('closeModal');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinksDesktop = document.querySelector('.nav-links-desktop');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinksDesktop.classList.toggle('active');
            const isActive = navLinksDesktop.classList.contains('active');
            
            // Toggle body scroll
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
            
            mobileToggle.innerHTML = isActive ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            lucide.createIcons();
            
            if (isActive) {
                gsap.from('.nav-links-desktop li', {
                    x: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2
                });
            }
        });
    }

    // Safe Modal Logic
    if (fab && contactModal && closeBtn) {
        fab.onclick = () => contactModal.classList.add('active');
        closeBtn.onclick = () => contactModal.classList.remove('active');
        contactModal.onclick = (e) => { if(e.target === contactModal) contactModal.classList.remove('active'); };
    }
});
