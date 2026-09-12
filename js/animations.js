/* ==========================================================================
   Ahmed Ali - Professional Portfolio
   Animations JavaScript
   ========================================================================== */

// ==========================================================================
// Typing Animation
// ==========================================================================
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');

    typingElements.forEach(element => {
        const text = element.textContent.trim();
        const words = text.split('|');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 150;
        const deleteSpeed = 80;
        const pauseBetween = 2000;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                charIndex--;
                element.textContent = currentWord.substring(0, charIndex);
                if (charIndex > 0) {
                    setTimeout(type, deleteSpeed);
                } else {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(type, 500);
                }
            } else {
                charIndex++;
                element.textContent = currentWord.substring(0, charIndex);
                if (charIndex < currentWord.length) {
                    setTimeout(type, typeSpeed);
                } else {
                    isDeleting = true;
                    setTimeout(type, pauseBetween);
                }
            }
        }

        // Start typing animation
        if (words.length > 1) {
            type();
        }
    });
}

// ==========================================================================
// Hero Background Shapes Animation
// ==========================================================================
function initHeroShapes() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const shapeCount = 6;
    const shapes = [];

    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.classList.add('hero-shape');

        // Random properties
        const size = Math.random() * 60 + 40;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const animationTypes = ['shape-float', 'shape-pulse', 'shape-rotate', 'shape-wiggle'];
        const animType = animationTypes[Math.floor(Math.random() * animationTypes.length)];

        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${posX}%`;
        shape.style.top = `${posY}%`;
        shape.style.animationDelay = `${delay}s`;
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationName = animType;

        // Shape styles
        const shapeStyles = [
            'circle',
            'square',
            'triangle',
            'hexagon',
            'diamond'
        ];

        const shapeStyle = shapeStyles[Math.floor(Math.random() * shapeStyles.length)];
        shape.classList.add(`shape-${shapeStyle}`);

        hero.appendChild(shape);
        shapes.push(shape);
    }

    // Add CSS for shapes dynamically
    const style = document.createElement('style');
    style.textContent = `
    .hero-shape {
      position: absolute;
      z-index: 0;
      opacity: 0.1;
      background: var(--clr-primary-gradient);
      filter: blur(1px);
    }
    .shape-circle { border-radius: 50%; }
    .shape-square { border-radius: 8px; }
    .shape-triangle {
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      border-bottom: 50px solid var(--clr-primary);
      background: none;
      width: 0;
      height: 0;
    }
    .shape-hexagon {
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    }
    .shape-diamond {
      transform: rotate(45deg);
    }
    .shape-diamond::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: 8px;
    }
  `;
    document.head.appendChild(style);
}

// ==========================================================================
// Scroll Reveal with Stagger
// ==========================================================================
function initStaggerReveal() {
    const staggerContainers = document.querySelectorAll('.stagger-children');

    const staggerObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                container.classList.add('animated');
                obs.unobserve(container);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    staggerContainers.forEach(container => {
        staggerObserver.observe(container);
    });
}

// ==========================================================================
// Parallax Effect
// ==========================================================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (!parallaxElements.length) return;

    // Only on desktop
    if (window.innerWidth < 768) return;

    const handleScroll = () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = scrollY * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });
    };

    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    handleScroll();
}

// ==========================================================================
// Floating Animation for Hero Elements
// ==========================================================================
function initFloatAnimation() {
    const floatElements = document.querySelectorAll('.float');

    floatElements.forEach(el => {
        const amplitude = Math.random() * 10 + 5;
        const frequency = Math.random() * 0.02 + 0.01;
        const speed = Math.random() * 2 + 1;

        let startTime = null;

        function animate(time) {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            const y = Math.sin(elapsed * frequency * speed) * amplitude;
            el.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    });
}

// ==========================================================================
// Gradient Background Animation
// ==========================================================================
function initGradientBackground() {
    const gradientElements = document.querySelectorAll('.gradient-bg');

    gradientElements.forEach(el => {
        el.style.background = 'linear-gradient(270deg, var(--clr-primary), var(--clr-primary-dark), var(--clr-accent), var(--clr-primary))';
        el.style.backgroundSize = '400% 400%';
        el.style.animation = 'gradient-shift 15s ease infinite';
    });
}

// ==========================================================================
// Animated Progress Bars
// ==========================================================================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const progressObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.dataset.percent || '0';

                // Set CSS variable for animation
                bar.style.setProperty('--progress-width', percent + '%');

                // Animate
                bar.classList.add('progress-animated');

                obs.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ==========================================================================
// Circular Progress Animation
// ==========================================================================
function initCircularProgress() {
    const circles = document.querySelectorAll('.circular-progress');

    const circleObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percent = parseInt(circle.dataset.percent) || 0;
                const radius = 54;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (percent / 100) * circumference;

                const svg = circle.querySelector('svg');
                if (svg) {
                    const circleEl = svg.querySelector('circle');
                    if (circleEl) {
                        circleEl.style.strokeDasharray = circumference;
                        circleEl.style.strokeDashoffset = circumference;
                        circleEl.style.transition = 'stroke-dashoffset 1.5s ease-out';
                        circleEl.style.strokeDashoffset = offset;
                    }
                }

                // Percentage display removed

                obs.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });

    circles.forEach(circle => {
        circleObserver.observe(circle);
    });
}

// ==========================================================================
// Animated Statistics
// ==========================================================================
function initAnimatedStats() {
    const statElements = document.querySelectorAll('.stat-number');

    const statObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target) || 0;
                const suffix = el.dataset.suffix || '';
                const duration = parseInt(el.dataset.duration) || 2000;
                const step = target / (duration / 16);
                let count = 0;

                const updateCount = () => {
                    count += step;
                    if (count < target) {
                        el.textContent = Math.floor(count).toLocaleString() + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = target.toLocaleString() + suffix;
                    }
                };

                updateCount();
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(el => {
        statObserver.observe(el);
    });
}

// ==========================================================================
// Page Transition
// ==========================================================================
function initPageTransitions() {
    // Add fade-in class to body on page load
    document.body.classList.add('page-enter');

    // Handle link clicks for smooth transitions
    document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('/') || href.startsWith('./') || href.endsWith('.html')) {
                e.preventDefault();
                document.body.classList.remove('page-enter');
                document.body.style.opacity = '0';

                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// ==========================================================================
// Initialize All Animations on DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initHeroShapes();
    initStaggerReveal();
    initParallax();
    initFloatAnimation();
    initGradientBackground();
    initProgressBars();
    initCircularProgress();
    initAnimatedStats();
    initPageTransitions();
});

// ==========================================================================
// Window Resize Handler
// ==========================================================================
window.addEventListener('resize', () => {
    initParallax();
});

// ==========================================================================
// Export for module usage
// ==========================================================================
window.Animations = {
    initTypingAnimation,
    initHeroShapes,
    initStaggerReveal,
    initParallax,
    initFloatAnimation,
    initGradientBackground,
    initProgressBars,
    initCircularProgress,
    initAnimatedStats,
    initPageTransitions
};
