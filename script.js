// Space Explorer - Optimized JavaScript
(function () {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initCometCursor();
        initStarField();
        initShootingStars();
        initImpactEffects();
        initCarousel();
        initSmoothScroll();
        initStatsCounter();
        initPlanetModal();
        initFormEffects();
        initParallax();
        console.log('🚀 Space Explorer loaded!');
    }

    // Comet Cursor
    function initCometCursor() {
        const cursor = document.getElementById('cometCursor');
        if (!cursor || window.matchMedia('(max-width: 480px)').matches) return;

        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, angle = 0;

        document.addEventListener('mousemove', (e) => {
            const dx = e.clientX - mouseX;
            const dy = e.clientY - mouseY;
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                angle = Math.atan2(dy, dx) * (180 / Math.PI);
            }
        });

        function animate() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursor.style.transform = `translate(-50%, -50%) rotate(${angle + 180}deg)`;
            requestAnimationFrame(animate);
        }
        animate();

        // Hover effects
        document.querySelectorAll('button, a, .planet-card, .galaxy-card, .timeline-item, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Star Field
    function initStarField() {
        const container = document.getElementById('starsContainer');
        if (!container) return;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                --opacity: ${Math.random() * 0.5 + 0.3};
                --duration: ${Math.random() * 3 + 2}s;
            `;
            fragment.appendChild(star);
        }
        container.appendChild(fragment);
    }

    // Shooting Stars
    function initShootingStars() {
        const container = document.getElementById('shootingStars');
        if (!container) return;

        function createShootingStar() {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            const duration = Math.random() * 1 + 0.5;
            star.style.cssText = `
                left: ${Math.random() * 80}%;
                top: ${Math.random() * 50}%;
                animation-duration: ${duration}s;
            `;
            container.appendChild(star);
            setTimeout(() => star.remove(), duration * 1000);
        }

        setInterval(createShootingStar, 3000);
        createShootingStar();
    }

    // Impact Effects
    function initImpactEffects() {
        const impactContainer = document.getElementById('impactContainer');
        if (!impactContainer) return;

        document.querySelectorAll('.cosmic-btn, .planet-btn, .carousel-btn, .social-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                createImpact(rect.left + rect.width / 2, rect.top + rect.height / 2, impactContainer);
                this.classList.add('impacted');
                setTimeout(() => this.classList.remove('impacted'), 500);
            });
        });
    }

    function createImpact(x, y, container) {
        const impact = document.createElement('div');
        impact.className = 'impact-effect';
        impact.style.left = x + 'px';
        impact.style.top = y + 'px';

        // Rings
        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            ring.className = 'impact-ring';
            impact.appendChild(ring);
        }

        // Particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'impact-particle';
            const angle = (i / 12) * 360;
            const distance = 80 + Math.random() * 40;
            particle.style.setProperty('--tx', Math.cos(angle * Math.PI / 180) * distance + 'px');
            particle.style.setProperty('--ty', Math.sin(angle * Math.PI / 180) * distance + 'px');
            particle.style.background = ['#fbbf24', '#f97316', '#ec4899', '#fff'][Math.floor(Math.random() * 4)];
            impact.appendChild(particle);
        }

        // Crater
        const crater = document.createElement('div');
        crater.className = 'crater-mark';
        impact.appendChild(crater);

        container.appendChild(impact);
        setTimeout(() => impact.remove(), 1500);
    }

    // Facts Carousel
    function initCarousel() {
        const facts = document.querySelectorAll('.fact-card');
        const dotsContainer = document.getElementById('carouselDots');
        const prevBtn = document.getElementById('prevFact');
        const nextBtn = document.getElementById('nextFact');

        if (!facts.length || !dotsContainer) return;

        let currentIndex = 0;

        // Create dots
        facts.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            facts[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            currentIndex = (index + facts.length) % facts.length;
            facts[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }

        prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
        setInterval(() => goToSlide(currentIndex + 1), 5000);
    }

    // Smooth Scroll
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Scroll spy
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const sections = document.querySelectorAll('section[id]');
                    let currentSection = '';
                    sections.forEach(section => {
                        if (window.scrollY >= section.offsetTop - 100) {
                            currentSection = section.id;
                        }
                    });
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Stats Counter
    function initStatsCounter() {
        const stats = document.querySelectorAll('.stat-card');
        let animated = false;

        function formatNumber(num) {
            if (num >= 1e9) return (num / 1e9).toFixed(0) + 'B+';
            if (num >= 1e6) return (num / 1e6).toFixed(0) + 'M+';
            return num.toString();
        }

        function animateStats() {
            if (animated) return;
            const statsSection = document.querySelector('.stats-section');
            if (!statsSection) return;

            if (statsSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
                animated = true;
                stats.forEach((card, index) => {
                    const target = parseInt(card.dataset.target) || 0;
                    const numEl = card.querySelector('.stat-number');
                    let current = 0;
                    const increment = target / 50;

                    setTimeout(() => {
                        const timer = setInterval(() => {
                            current = Math.min(current + increment, target);
                            numEl.textContent = formatNumber(Math.floor(current));
                            if (current >= target) clearInterval(timer);
                        }, 40);
                    }, index * 200);
                });
            }
        }

        window.addEventListener('scroll', animateStats, { passive: true });
        animateStats();
    }

    // Planet Modal
    const planetData = {
        mercury: { emoji: '☿️', name: 'Mercury', details: 'The smallest planet, orbiting closest to the Sun in just 88 Earth days.' },
        venus: { emoji: '🌕', name: 'Venus', details: 'Earth\'s twin with a toxic atmosphere, making it the hottest planet.' },
        earth: { emoji: '🌍', name: 'Earth', details: 'Our home planet, the only known world with life and liquid water.' },
        mars: { emoji: '🔴', name: 'Mars', details: 'The Red Planet with seasons, polar ice caps, and volcanoes.' },
        jupiter: { emoji: '🟤', name: 'Jupiter', details: 'The largest planet with the iconic Great Red Spot storm.' },
        saturn: { emoji: '🪐', name: 'Saturn', details: 'Famous for its beautiful rings of ice and rock particles.' }
    };

    function initPlanetModal() {
        const modal = document.getElementById('planetModal');
        const closeBtn = document.getElementById('closeModal');
        const modalVisual = document.getElementById('modalPlanetVisual');
        const modalName = document.getElementById('modalPlanetName');
        const modalDetails = document.getElementById('modalDetails');

        document.querySelectorAll('.planet-card').forEach(card => {
            card.querySelector('.planet-btn')?.addEventListener('click', () => {
                const data = planetData[card.dataset.planet];
                if (data && modal) {
                    modalVisual.textContent = data.emoji;
                    modalName.textContent = data.name;
                    modalDetails.innerHTML = `<p>${data.details}</p>`;
                    modal.classList.add('active');
                }
            });
        });

        closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
        modal?.addEventListener('click', (e) => e.target === modal && modal.classList.remove('active'));
        document.addEventListener('keydown', (e) => e.key === 'Escape' && modal?.classList.remove('active'));
    }

    // Form Effects
    function initFormEffects() {
        const form = document.getElementById('contactForm');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const btnText = btn.querySelector('.btn-text');
            const originalText = btnText.textContent;

            btnText.textContent = '📡 Transmitting...';
            btn.disabled = true;

            setTimeout(() => {
                btnText.textContent = '✅ Message Sent!';
                setTimeout(() => {
                    btnText.textContent = originalText;
                    btn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Parallax
    function initParallax() {
        const stars = document.getElementById('starsContainer');
        const heroVisual = document.querySelector('.hero-visual');
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (stars) stars.style.transform = `translateY(${scrolled * 0.3}px)`;
                    if (heroVisual && scrolled < window.innerHeight) {
                        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
})();
