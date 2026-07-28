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
        // Allow various phone formats: +1234567890, (123) 456-7890, 123-456-7890, etc.
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

                        resultMessage.className = 'form-result success-message';
                        resultMessage.innerHTML = `
                            <div class="result-content">
                                <i class="fas fa-check-circle"></i>
                                <p><strong>Message Sent Successfully!</strong></p>
                                <span>Thank you for reaching out. I will get back to you soon.</span>
                            </div>
                        `;

                        // Reset form
                        form.reset();

                        // Reset input styles and floating labels
                        const allInputs = form.querySelectorAll('input, textarea');
                        allInputs.forEach(function (input) {
                            input.classList.remove('success', 'error');
                            // Update floating label after reset
                            const formGroup = input.closest('.form-group');
                            if (formGroup) {
                                const label = formGroup.querySelector('.floating-label');
                                if (label) {
                                    label.classList.remove('active');
                                }
                            }
                        });

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

                    resultMessage.className = 'form-result error-message';
                    resultMessage.innerHTML = `
                        <div class="result-content">
                            <i class="fas fa-exclamation-circle"></i>
                            <p><strong>Please complete the required fields.</strong></p>
                            <span>Please check the form for errors and try again.</span>
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
// Initialize on DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
});
