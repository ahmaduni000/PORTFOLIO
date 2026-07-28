/* ==========================================================================
   Ahmed Ali - Professional Portfolio
   Main JavaScript
   ========================================================================== */

// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navbarNav = document.querySelector('.navbar-nav');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const loader = document.querySelector('.loader');
const backToTop = document.querySelector('.back-to-top');
const scrollProgress = document.querySelector('.scroll-progress');
const cursor = document.querySelector('.cursor');

// ==========================================================================
// Loading Screen - Beautiful Enhanced
// ==========================================================================
function initLoader() {
    if (!loader) return;

    const percentEl = document.getElementById('loader-percent');
    const stageEl = document.getElementById('loader-stage');
    const progressBar = document.querySelector('.loader-progress-bar');
    const ringProgress = document.getElementById('loader-ring-progress');
    const ringCircumference = 339.292; // 2 * PI * 54
    let progress = 0;
    let progressInterval;
    let animationFrame;

    // Loading stages for immersive feel
    const stages = [
        { at: 0, text: 'Initializing...' },
        { at: 15, text: 'Loading assets...' },
        { at: 30, text: 'Configuring modules...' },
        { at: 45, text: 'Establishing connection...' },
        { at: 60, text: 'Optimizing performance...' },
        { at: 75, text: 'Applying styles...' },
        { at: 90, text: 'Almost ready...' }
    ];
    let currentStageIndex = 0;

    // Smooth easing function - cubic bezier style
    function easeProgress(p) {
        // Custom easing: fast start, smooth middle, slow end
        if (p < 0.3) return p * 1.8;
        if (p < 0.7) return 0.54 + (p - 0.3) * 0.9;
        return 0.9 + (p - 0.7) * 0.33;
    }

    // Animate percentage counter with smooth easing
    function startProgressCounter() {
        const startTime = Date.now();
        const duration = 3500; // 3.5 seconds for full animation

        function animate() {
            const elapsed = Date.now() - startTime;
            const rawProgress = Math.min(elapsed / duration, 1);
            const eased = easeProgress(rawProgress);
            progress = eased * 100;

            if (progress > 99) progress = 99;

            // Update percentage with smooth number animation
            if (percentEl) {
                const displayProgress = Math.floor(progress);
                percentEl.textContent = displayProgress + '%';
                // Add a subtle scale pulse on each number change
                percentEl.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    percentEl.style.transform = 'scale(1)';
                }, 50);
            }

            // Update progress bar width
            if (progressBar) {
                progressBar.style.width = Math.floor(progress) + '%';
            }

            // Update SVG ring progress
            if (ringProgress) {
                const offset = ringCircumference - (ringCircumference * progress / 100);
                ringProgress.style.strokeDashoffset = offset;
            }

            // Update stage text
            if (stageEl) {
                const nextStage = currentStageIndex + 1 < stages.length ? stages[currentStageIndex + 1] : null;
                if (nextStage && progress >= nextStage.at) {
                    currentStageIndex++;
                    stageEl.textContent = stages[currentStageIndex].text;
                    stageEl.style.opacity = '0';
                    stageEl.style.transform = 'translateY(5px)';
                    setTimeout(() => {
                        stageEl.style.opacity = '1';
                        stageEl.style.transform = 'translateY(0)';
                        stageEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                }
            }

            if (rawProgress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Reached 99%, wait for load event
                progressInterval = setInterval(() => {
                    // Tiny increments to keep it alive
                    if (progress < 99) {
                        progress += Math.random() * 0.3 + 0.05;
                        if (progress > 99) progress = 99;
                        if (percentEl) percentEl.textContent = Math.floor(progress) + '%';
                        if (progressBar) progressBar.style.width = Math.floor(progress) + '%';
                        if (ringProgress) {
                            const offset = ringCircumference - (ringCircumference * progress / 100);
                            ringProgress.style.strokeDashoffset = offset;
                        }
                    }
                }, 200);
            }
        }

        animationFrame = requestAnimationFrame(animate);
    }

    // Complete the progress with a smooth finish
    function completeProgress() {
        if (progressInterval) clearInterval(progressInterval);
        if (animationFrame) cancelAnimationFrame(animationFrame);

        // Smoothly animate to 100
        let finishProgress = progress;
        const finishInterval = setInterval(() => {
            finishProgress += (100 - finishProgress) * 0.15 + 0.5;
            if (finishProgress >= 100) {
                finishProgress = 100;
                clearInterval(finishInterval);
            }
            progress = finishProgress;
            if (percentEl) {
                percentEl.textContent = Math.floor(finishProgress) + '%';
                percentEl.style.transform = 'scale(1.15)';
                setTimeout(() => {
                    percentEl.style.transform = 'scale(1)';
                }, 80);
            }
            if (progressBar) {
                progressBar.style.width = Math.floor(finishProgress) + '%';
            }
            if (ringProgress) {
                const offset = ringCircumference - (ringCircumference * finishProgress / 100);
                ringProgress.style.strokeDashoffset = offset;
            }
            if (stageEl && finishProgress >= 100) {
                stageEl.textContent = 'Welcome!';
                stageEl.style.color = '#06b6d4';
                // Brand reveal animation
                const logo = document.querySelector('.loader-logo');
                if (logo) logo.classList.add('loader-brand-reveal');
                stageEl.style.opacity = '0';
                setTimeout(() => {
                    stageEl.style.opacity = '1';
                    stageEl.style.transition = 'opacity 0.4s ease';
                }, 50);
            }
        }, 30);
    }

    // Hide loader with animation
    function hideLoader() {
        completeProgress();
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 500);
        }, 500);
    }

    // Start progress counter
    startProgressCounter();

    // On window load - complete and hide
    window.addEventListener('load', hideLoader);

    // Fallback: hide loader after 6 seconds max
    setTimeout(() => {
        if (loader.parentNode && !loader.classList.contains('loader-hidden')) {
            hideLoader();
        }
    }, 6000);
}

// ==========================================================================
// Navbar Scroll Effect
// ==========================================================================
function initNavbarScroll() {
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on load
}

// ==========================================================================
// Mobile Menu Toggle
// ==========================================================================
function initMobileMenu() {
    if (!menuToggle || !navbarNav) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navbarNav.classList.toggle('active');
        document.body.style.overflow = navbarNav.classList.contains('active')
            ? 'hidden'
            : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbarNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navbarNav.contains(e.target)) {
            menuToggle.classList.remove('active');
            navbarNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==========================================================================
// Active Navigation Link
// ==========================================================================
function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// ==========================================================================
// Theme Toggle (Dark/Light Mode)
// ==========================================================================
function initThemeToggle() {
    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');

        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// ==========================================================================
// Scroll Progress Indicator
// ==========================================================================
function initScrollProgress() {
    if (!scrollProgress) return;

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

// ==========================================================================
// Back to Top Button
// ==========================================================================
function initBackToTop() {
    if (!backToTop) return;

    const handleScroll = () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll);

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================================================
// Smooth Scrolling for Anchor Links
// ==========================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// Custom Cursor
// ==========================================================================
function initCustomCursor() {
    if (!cursor) return;

    // Only enable on desktop
    if (window.innerWidth < 768) {
        cursor.style.display = 'none';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        cursor.style.display = 'block';
    });

    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .card, .social-link, .nav-link');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            cursor.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            isHovering = false;
            cursor.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });
}

// ==========================================================================
// Scroll Reveal Animation
// ==========================================================================
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate;

                if (animationType) {
                    element.classList.add('animated');
                }

                // Add animation class
                if (element.dataset.animation) {
                    element.classList.add(element.dataset.animation);
                }

                obs.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Observe elements with stagger-children
    document.querySelectorAll('.stagger-children').forEach(container => {
        const childObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    container.classList.add('animated');
                    obs.unobserve(container);
                }
            });
        }, observerOptions);
        childObserver.observe(container);
    });
}

// ==========================================================================
// Animated Counters
// ==========================================================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = parseInt(counter.dataset.duration) || 2000;
                const step = target / (duration / 16);
                let count = 0;

                const updateCount = () => {
                    count += step;
                    if (count < target) {
                        counter.textContent = Math.floor(count).toLocaleString();
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };

                updateCount();
                obs.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ==========================================================================
// Skill Progress Animation
// ==========================================================================
function initSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.dataset.percent || '0';
                bar.style.width = percent + '%';
                obs.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ==========================================================================
// Utility Functions
// ==========================================================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================================================
// Initialize All Functions on DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbarScroll();
    initMobileMenu();
    initActiveNav();
    initThemeToggle();
    initScrollProgress();
    initBackToTop();
    initSmoothScroll();
    initCustomCursor();
    initScrollReveal();
    initCounters();
    initSkillProgress();
});

// ==========================================================================
// Window Resize Handler
// ==========================================================================
window.addEventListener('resize', debounce(() => {
    // Re-initialize cursor on resize
    initCustomCursor();

    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        if (menuToggle && navbarNav) {
            menuToggle.classList.remove('active');
            navbarNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));

// ==========================================================================
// Export for module usage (if needed)
// ==========================================================================
window.Portfolio = {
    debounce,
    throttle,
    initLoader,
    initNavbarScroll,
    initMobileMenu,
    initThemeToggle,
    initScrollProgress,
    initBackToTop,
    initSmoothScroll,
    initCustomCursor,
    initScrollReveal,
    initCounters,
    initSkillProgress
};
