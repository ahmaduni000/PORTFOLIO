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
const backToTop = document.querySelector('.back-to-top');
const scrollProgress = document.querySelector('.scroll-progress');
const cursor = document.querySelector('.cursor');

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
    initNavbarScroll();
    initMobileMenu();
    initActiveNav();
    initLoader();
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
// Loading Screen
// ==========================================================================
function initLoader() {
    const loaderContainer = document.getElementById('loader-container');
    if (!loaderContainer) return;

    const progressBar = loaderContainer.querySelector('.loader-progress-bar');
    const percentageEl = loaderContainer.querySelector('.loader-percentage');

    let progress = 0;
    const maxProgress = 100;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= maxProgress) {
            progress = maxProgress;
            clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
        percentageEl.textContent = progress + '%';
    }, 100);

    // Fade out loader when page is fully loaded
    window.addEventListener('load', () => {
        clearInterval(interval);
        progress = maxProgress;
        progressBar.style.width = '100%';
        percentageEl.textContent = '100%';

        setTimeout(() => {
            loaderContainer.classList.add('fade-out');
            setTimeout(() => {
                loaderContainer.style.display = 'none';
            }, 500);
        }, 300);
    });
}

// ==========================================================================
// Export for module usage (if needed)
// ==========================================================================
window.Portfolio = {
    debounce,
    throttle,
    initNavbarScroll,
    initMobileMenu,
    initThemeToggle,
    initScrollProgress,
    initBackToTop,
    initSmoothScroll,
    initCustomCursor,
    initScrollReveal,
    initCounters,
    initSkillProgress,
    initLoader
};
