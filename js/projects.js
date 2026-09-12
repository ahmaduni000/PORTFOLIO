/* ==========================================================================
   Ahmed Ali - Professional Portfolio
   Projects JavaScript
   ========================================================================== */

// ==========================================================================
// Project Data
// ==========================================================================
const projectsData = [
    {
        id: 'airline-reservation',
        title: 'Airline Reservation System',
        category: 'JavaScript',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description: 'A comprehensive airline reservation system with flight search, booking, seat selection, and passenger management using HTML, CSS, and vanilla JavaScript.',
        image: 'images/projects/airline-project.svg',
        demo: '#',
        github: 'https://github.com/ahmaduni000',
        featured: true,
        features: [
            'Flight search and booking',
            'Passenger information management',
            'Seat selection interface',
            'Booking confirmation',
            'Form validation',
            'Responsive design'
        ]
    },
    {
        id: 'hotel-management',
        title: 'Hotel Management System',
        category: 'JavaScript',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description: 'A modern hotel management system with room listing, booking, guest information, check-in/out, and pricing display built with HTML, CSS, and JavaScript.',
        image: 'images/projects/hotel-project.svg',
        demo: '#',
        github: 'https://github.com/ahmaduni000',
        featured: true,
        features: [
            'Room listing and categories',
            'Room availability checking',
            'Booking form with guest info',
            'Check-in/check-out management',
            'Pricing display',
            'Search and filter interface'
        ]
    },
    {
        id: 'personal-portfolio',
        title: 'Personal Portfolio',
        category: 'Web Design',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description: 'A modern personal portfolio website with responsive design, smooth animations, and interactive elements.',
        image: 'images/projects/portfolio-project.svg',
        demo: '#',
        github: 'https://github.com/ahmaduni000',
        featured: false,
        features: [
            'Responsive layout',
            'Smooth scrolling',
            'Animated elements',
            'Contact form'
        ]
    },
    {
        id: 'restaurant-website',
        title: 'Restaurant Website',
        category: 'Web Design',
        tags: ['HTML', 'CSS'],
        description: 'A modern restaurant website with menu display, online ordering, and reservation system.',
        image: 'images/projects/restaurant-project.svg',
        demo: '#',
        github: 'https://github.com/ahmaduni000',
        featured: false,
        features: [
            'Menu display',
            'Online ordering',
            'Reservation system',
            'Responsive design'
        ]
    },
    {
        id: 'ecommerce-website',
        title: 'E-Commerce Website',
        category: 'JavaScript',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description: 'A fully responsive e-commerce website with product listing, cart functionality, and checkout process.',
        image: 'images/projects/ecommerce-project.svg',
        demo: '#',
        github: 'https://github.com/ahmaduni000',
        featured: false,
        features: [
            'Product listing',
            'Shopping cart',
            'Checkout process',
            'Responsive design'
        ]
    },
    {
        id: 'todo-list',
        title: 'To-Do List',
        category: 'JavaScript',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description: 'An interactive to-do list application with task management, filtering, and local storage.',
        image: 'images/projects/todo-project.svg',
        demo: '#',
        github: 'https://github.com/ahmaduni000',
        featured: false,
        features: [
            'Task creation and deletion',
            'Task filtering',
            'Local storage',
            'Drag and drop'
        ]
    },
    {
        id: 'weather-website',
        title: 'Weather Website',
        category: 'JavaScript',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description: 'A weather website that displays current weather and forecasts using a weather API.',
        image: 'images/projects/weather-project.svg',
        demo: '#',
        github: 'https://github.com/ahmaduni000',
        featured: false,
        features: [
            'Current weather display',
            '5-day forecast',
            'Location search',
            'Responsive design'
        ]
    },
    {
        id: 'landing-page',
        title: 'Landing Page',
        category: 'Web Design',
        tags: ['HTML', 'CSS'],
        description: 'A modern landing page with hero section, features, testimonials, and call-to-action.',
        image: 'images/projects/landing-project.svg',
        demo: '#',
        github: 'https://github.com/ahmaduni000',
        featured: false,
        features: [
            'Hero section',
            'Features display',
            'Testimonials',
            'Call-to-action'
        ]
    },
    {
        id: 'python-automation',
        title: 'Python Automation Scripts',
        category: 'Python',
        tags: ['Python'],
        description: 'A collection of Python automation scripts for file management, data processing, web scraping, and task automation to improve productivity.',
        image: 'images/projects/python-project.svg',
        demo: '#',
        github: 'https://github.com/ahmaduni000',
        featured: true,
        features: [
            'File organization and management',
            'Data processing and analysis',
            'Web scraping automation',
            'Task scheduling and automation',
            'PDF and document processing',
            'Email automation'
        ]
    }
];

// ==========================================================================
// Project Filtering
// ==========================================================================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.dataset.filter;

            // Filter projects
            projectCards.forEach(card => {
                const categories = card.dataset.categories || '';

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    card.style.display = '';

                    // Add animation
                    card.style.animation = 'project-fade-in 0.5s ease forwards';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 500);
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==========================================================================
// Project Card Hover Effects
// ==========================================================================
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const image = card.querySelector('.project-image img');

        if (overlay) {
            card.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            });

            card.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
            });
        }

        if (image) {
            card.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.1)';
            });

            card.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        }
    });
}

// ==========================================================================
// Project Modal
// ==========================================================================
function initProjectModal() {
    const modal = document.querySelector('.project-modal');
    const modalTriggers = document.querySelectorAll('[data-project]');
    const modalClose = document.querySelector('.project-modal-close');

    if (!modal || !modalTriggers.length) return;

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = trigger.dataset.project;

            // Find project data
            const project = projectsData.find(p => p.id === projectId);
            if (!project) return;

            // Populate modal
            const modalTitle = modal.querySelector('.project-modal-title');
            const modalDescription = modal.querySelector('.project-modal-description');
            const modalImage = modal.querySelector('.project-modal-image img');
            const modalDemo = modal.querySelector('.project-modal-demo');
            const modalGithub = modal.querySelector('.project-modal-github');
            const modalTechList = modal.querySelector('.project-tech-list');
            const modalFeaturesList = modal.querySelector('.project-features-list');

            if (modalTitle) modalTitle.textContent = project.title;
            if (modalDescription) modalDescription.textContent = project.description;
            if (modalImage) {
                modalImage.src = project.image;
                modalImage.alt = project.title;
            }
            if (modalDemo) modalDemo.href = project.demo;
            if (modalGithub) modalGithub.href = project.github;

            // Populate technologies
            if (modalTechList && project.tags) {
                modalTechList.innerHTML = '';
                project.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'badge badge-primary';
                    span.textContent = tag;
                    modalTechList.appendChild(span);
                });
            }

            // Populate features
            if (modalFeaturesList && project.features) {
                modalFeaturesList.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.style.display = 'flex';
                    li.style.alignItems = 'center';
                    li.style.gap = 'var(--spacing-sm)';
                    li.style.color = 'var(--clr-text-light)';
                    li.innerHTML = '<i class="fas fa-check" style="color: var(--clr-primary);"></i> ' + feature;
                    modalFeaturesList.appendChild(li);
                });
            }

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ==========================================================================
// Project Details Page
// ==========================================================================
function initProjectDetails() {
    const projectDetailsSection = document.querySelector('.project-details');
    if (!projectDetailsSection) return;

    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id') || 'airline-reservation';

    // Find project
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    // Populate details
    const titleEl = projectDetailsSection.querySelector('.project-details-title');
    const descEl = projectDetailsSection.querySelector('.project-details-description');
    const imageEl = projectDetailsSection.querySelector('.project-details-image img');
    const demoBtn = projectDetailsSection.querySelector('.project-details-demo');
    const githubBtn = projectDetailsSection.querySelector('.project-details-github');

    if (titleEl) titleEl.textContent = project.title;
    if (descEl) descEl.textContent = project.description;
    if (imageEl) {
        imageEl.src = project.image;
        imageEl.alt = project.title;
    }
    if (demoBtn) demoBtn.href = project.demo;
    if (githubBtn) githubBtn.href = project.github;

    // Populate features list
    const featuresList = projectDetailsSection.querySelector('.project-features-list');
    if (featuresList && project.features) {
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }

    // Populate technologies
    const techContainer = projectDetailsSection.querySelector('.project-technologies');
    if (techContainer && project.tags) {
        techContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'badge badge-primary';
            span.textContent = tag;
            techContainer.appendChild(span);
        });
    }
}

// ==========================================================================
// Initialize on DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initProjectFilter();
    initProjectCardEffects();
    initProjectModal();
    initProjectDetails();
});

// ==========================================================================
// Export
// ==========================================================================
window.Projects = {
    projectsData,
    initProjectFilter,
    initProjectCardEffects,
    initProjectModal,
    initProjectDetails
};
