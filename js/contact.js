/* ==========================================================================
    Ahmed Ali - Professional Portfolio
    Contact Form JavaScript
    ========================================================================== */

// ==========================================================================
// Contact Form Validation
// ==========================================================================
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const fullNameInput = form.querySelector('#full-name');
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');
    const messageInput = form.querySelector('#message');
    const submitBtn = form.querySelector('#submit-btn');
    const charCounter = document.getElementById('charCounter');
    const formResult = document.getElementById('formResult');

    // ==========================================================================
    // Floating Label Management
    // ==========================================================================
    function updateFloatingLabel(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        const label = formGroup.querySelector('.floating-label');
        if (!label) return;
        if (input.value.trim() !== '' || input === document.activeElement) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    }

    // Initialize all floating labels
    const allInputs = form.querySelectorAll('input, textarea');
    allInputs.forEach(function (input) {
        // Set initial state
        updateFloatingLabel(input);

        // Add event listeners
        input.addEventListener('focus', function () {
            updateFloatingLabel(input);
        });

        input.addEventListener('blur', function () {
            updateFloatingLabel(input);
        });

        input.addEventListener('input', function () {
            updateFloatingLabel(input);
        });
    });

    // ==========================================================================
    // Character Counter for Message
    // ==========================================================================
    if (messageInput && charCounter) {
        messageInput.addEventListener('input', function () {
            const count = messageInput.value.length;
            charCounter.textContent = count + '/500';
            charCounter.style.display = 'block';

            if (count >= 500) {
                charCounter.className = 'char-counter limit';
            } else if (count >= 400) {
                charCounter.className = 'char-counter warning';
            } else {
                charCounter.className = 'char-counter';
            }
        });
    }

    // ==========================================================================
    // Validation Helpers
    // ==========================================================================
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'flex';
        }

        input.classList.add('error');
        input.classList.remove('success');
    }

    function showSuccess(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            errorElement.style.display = 'none';
        }

        input.classList.add('success');
        input.classList.remove('error');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(String(phone));
    }

    function validateFullName(name) {
        return name.trim().length >= 2;
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    // ==========================================================================
    // Real-time Validation
    // ==========================================================================
    if (fullNameInput) {
        fullNameInput.addEventListener('blur', function () {
            if (!validateFullName(fullNameInput.value)) {
                showError(fullNameInput, 'Please enter your full name (at least 2 characters)');
            } else {
                showSuccess(fullNameInput);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
            } else {
                showSuccess(emailInput);
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('blur', function () {
            if (phoneInput.value && !validatePhone(phoneInput.value)) {
                showError(phoneInput, 'Please enter a valid phone number');
            } else {
                showSuccess(phoneInput);
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', function () {
            if (!validateMessage(messageInput.value)) {
                showError(messageInput, 'Please enter a message (at least 10 characters)');
            } else {
                showSuccess(messageInput);
            }
        });
    }

    // ==========================================================================
    // Form Submission
    // ==========================================================================
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // Validate all fields
            if (fullNameInput && !validateFullName(fullNameInput.value)) {
                showError(fullNameInput, 'Please enter your full name (at least 2 characters)');
                isValid = false;
            } else if (fullNameInput) {
                showSuccess(fullNameInput);
            }

            if (emailInput && !validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else if (emailInput) {
                showSuccess(emailInput);
            }

            if (phoneInput && phoneInput.value && !validatePhone(phoneInput.value)) {
                showError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            } else if (phoneInput) {
                showSuccess(phoneInput);
            }

            if (messageInput && !validateMessage(messageInput.value)) {
                showError(messageInput, 'Please enter a message (at least 10 characters)');
                isValid = false;
            } else if (messageInput) {
                showSuccess(messageInput);
            }

            // Show loading state on button
            if (submitBtn) {
                submitBtn.classList.add('loading');
            }

            // Show result message
            const resultMessage = document.querySelector('.form-result');
            if (resultMessage) {
                resultMessage.style.display = 'block';

                if (isValid) {
                    // Simulate API call delay
                    setTimeout(function () {
                        if (submitBtn) {
                            submitBtn.classList.remove('loading');
                        }

                        resultMessage.className = 'form-result toast success-message';
                        resultMessage.innerHTML = `
                            <div class="result-content">
                                <i class="fas fa-check-circle"></i>
                                <div style="text-align: left;">
                                    <p><strong>Message Sent Successfully!</strong></p>
                                    <span>Thank you for reaching out. I will get back to you soon.</span>
                                </div>
                            </div>
                        `;

                        // Reset form
                        form.reset();

                        // Reset input styles and floating labels
                        const allInputs = form.querySelectorAll('input, textarea');
                        allInputs.forEach(function (input) {
                            input.classList.remove('success', 'error');
                            const formGroup = input.closest('.form-group');
                            if (formGroup) {
                                const label = formGroup.querySelector('.floating-label');
                                if (label) {
                                    label.classList.remove('active');
                                }
                            }
                        });

                        // Reset character counter
                        if (charCounter) {
                            charCounter.textContent = '0/500';
                            charCounter.className = 'char-counter';
                        }

                        // Scroll to result
                        resultMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                        // Hide result after delay
                        setTimeout(function () {
                            resultMessage.style.display = 'none';
                        }, 5000);
                    }, 1500);
                } else {
                    if (submitBtn) {
                        submitBtn.classList.remove('loading');
                    }

                    resultMessage.className = 'form-result toast error-message';
                    resultMessage.innerHTML = `
                        <div class="result-content">
                            <i class="fas fa-exclamation-circle"></i>
                            <div style="text-align: left;">
                                <p><strong>Please complete the required fields.</strong></p>
                                <span>Please check the form for errors and try again.</span>
                            </div>
                        </div>
                    `;

                    // Scroll to first error
                    const firstError = form.querySelector('.error');
                    if (firstError) {
                        firstError.focus();
                    }

                    // Hide result after delay
                    setTimeout(function () {
                        resultMessage.style.display = 'none';
                    }, 5000);
                }
            } else {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                }
            }
        });
    }
}

// ==========================================================================
// Particle System for Header Background
// ==========================================================================
function initParticleSystem() {
    const container = document.getElementById('particleContainer');
    if (!container) return;

    const particleCount = 30;
    const headerSection = container.parentElement;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = (60 + Math.random() * 40) + '%';
        particle.style.animationDuration = (4 + Math.random() * 6) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = '0';
        container.appendChild(particle);
    }
}

// ==========================================================================
// Quick Reply Buttons
// ==========================================================================
function initQuickReplies() {
    const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
    const messageInput = document.querySelector('#message');

    quickReplyBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const replyText = btn.getAttribute('data-reply');
            if (messageInput && replyText) {
                // Append to existing message or set as new
                const currentValue = messageInput.value;
                if (currentValue.trim() === '') {
                    messageInput.value = replyText;
                } else {
                    messageInput.value = currentValue + ' ' + replyText;
                }
                // Trigger input event to update char counter
                messageInput.dispatchEvent(new Event('input'));
                // Focus the message field
                messageInput.focus();
                // Visual feedback
                btn.style.background = 'var(--clr-primary)';
                btn.style.color = 'var(--clr-white)';
                setTimeout(function () {
                    btn.style.background = '';
                    btn.style.color = '';
                }, 300);
            }
        });
    });
}

// ==========================================================================
// Ripple Effect on Buttons
// ==========================================================================
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.ripple');

    rippleElements.forEach(function (el) {
        el.addEventListener('click', function (e) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            ripple.style.position = 'fixed';

            el.style.position = 'relative';
            el.style.overflow = 'hidden';
            el.appendChild(ripple);

            setTimeout(function () {
                ripple.remove();
            }, 600);
        });
    });
}

// ==========================================================================
// Scroll Reveal Observer
// ==========================================================================
function initScrollRevealObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================================================
// Initialize on DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initParticleSystem();
    initQuickReplies();
    initRippleEffect();
    initScrollRevealObserver();
});
