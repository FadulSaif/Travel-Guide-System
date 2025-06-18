// Register functionality

class RegisterForm {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.usernameInput = document.getElementById('username');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.confirmPasswordInput = document.getElementById('confirmPassword');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initializePasswordStrength();
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Password toggles
        this.passwordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility(this.passwordInput, this.passwordToggle);
        });
        
        this.confirmPasswordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility(this.confirmPasswordInput, this.confirmPasswordToggle);
        });
        
        // Real-time validation
        this.usernameInput.addEventListener('blur', () => {
            this.validateUsername();
        });
        
        this.emailInput.addEventListener('blur', () => {
            this.validateEmail();
        });
        
        this.passwordInput.addEventListener('blur', () => {
            this.validatePassword();
        });
        
        this.confirmPasswordInput.addEventListener('blur', () => {
            this.validateConfirmPassword();
        });
        
        // Password strength check
        this.passwordInput.addEventListener('input', () => {
            this.checkPasswordStrength();
            this.clearError(this.passwordInput, 'passwordError');
        });
        
        // Clear errors on input
        this.usernameInput.addEventListener('input', () => {
            this.clearError(this.usernameInput, 'usernameError');
        });
        
        this.emailInput.addEventListener('input', () => {
            this.clearError(this.emailInput, 'emailError');
        });
        
        this.confirmPasswordInput.addEventListener('input', () => {
            this.clearError(this.confirmPasswordInput, 'confirmPasswordError');
        });
        
        // Terms checkbox
        const agreeTerms = document.getElementById('agreeTerms');
        if (agreeTerms) {
            agreeTerms.addEventListener('change', () => {
                this.clearError(agreeTerms, 'termsError');
            });
        }
        
        // Social register buttons
        const googleBtn = document.querySelector('.btn-google');
        const facebookBtn = document.querySelector('.btn-facebook');
        
        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                this.handleSocialRegister('Google');
            });
        }
        
        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                this.handleSocialRegister('Facebook');
            });
        }
    }
    
    togglePasswordVisibility(input, toggle) {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        
        const eyeIcon = toggle.querySelector('.eye-icon');
        if (type === 'text') {
            toggle.classList.add('show');
            eyeIcon.textContent = '🙈';
        } else {
            toggle.classList.remove('show');
            eyeIcon.textContent = '👁️';
        }
    }
    
    validateUsername() {
        const username = this.usernameInput.value.trim();
        
        if (!username) {
            this.showError(this.usernameInput, 'usernameError', 'Username is required');
            return false;
        }
        
        if (username.length < 3) {
            this.showError(this.usernameInput, 'usernameError', 'Username must be at least 3 characters long');
            return false;
        }
        
        if (username.length > 20) {
            this.showError(this.usernameInput, 'usernameError', 'Username must be less than 20 characters');
            return false;
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            this.showError(this.usernameInput, 'usernameError', 'Username can only contain letters, numbers, and underscores');
            return false;
        }
        
        this.showSuccess(this.usernameInput, 'usernameError');
        return true;
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError(this.emailInput, 'emailError', 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError(this.emailInput, 'emailError', 'Please enter a valid email address');
            return false;
        }
        
        this.showSuccess(this.emailInput, 'emailError');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError(this.passwordInput, 'passwordError', 'Password is required');
            return false;
        }
        
        if (password.length < 8) {
            this.showError(this.passwordInput, 'passwordError', 'Password must be at least 8 characters long');
            return false;
        }
        
        if (!/(?=.*[a-z])/.test(password)) {
            this.showError(this.passwordInput, 'passwordError', 'Password must contain at least one lowercase letter');
            return false;
        }
        
        if (!/(?=.*[A-Z])/.test(password)) {
            this.showError(this.passwordInput, 'passwordError', 'Password must contain at least one uppercase letter');
            return false;
        }
        
        if (!/(?=.*\d)/.test(password)) {
            this.showError(this.passwordInput, 'passwordError', 'Password must contain at least one number');
            return false;
        }
        
        this.showSuccess(this.passwordInput, 'passwordError');
        return true;
    }
    
    validateConfirmPassword() {
        const password = this.passwordInput.value;
        const confirmPassword = this.confirmPasswordInput.value;
        
        if (!confirmPassword) {
            this.showError(this.confirmPasswordInput, 'confirmPasswordError', 'Please confirm your password');
            return false;
        }
        
        if (password !== confirmPassword) {
            this.showError(this.confirmPasswordInput, 'confirmPasswordError', 'Passwords do not match');
            return false;
        }
        
        this.showSuccess(this.confirmPasswordInput, 'confirmPasswordError');
        return true;
    }
    
    validateTerms() {
        const agreeTerms = document.getElementById('agreeTerms');
        
        if (!agreeTerms.checked) {
            this.showError(agreeTerms, 'termsError', 'You must agree to the Terms of Service and Privacy Policy');
            return false;
        }
        
        this.showSuccess(agreeTerms, 'termsError');
        return true;
    }
    
    showError(input, errorId, message) {
        input.classList.add('error');
        input.classList.remove('success');
        
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    showSuccess(input, errorId) {
        input.classList.remove('error');
        input.classList.add('success');
        
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    clearError(input, errorId) {
        input.classList.remove('error', 'success');
        
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    initializePasswordStrength() {
        // Add CSS for password strength indicator
        const style = document.createElement('style');
        style.textContent = `
            .password-strength {
                margin-top: 0.5rem;
            }
            
            .strength-bar {
                width: 100%;
                height: 4px;
                background: #e5e7eb;
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 0.25rem;
            }
            
            .strength-fill {
                height: 100%;
                width: 0%;
                transition: all 0.3s ease;
                border-radius: 2px;
            }
            
            .strength-fill.weak {
                background: #dc2626;
                width: 25%;
            }
            
            .strength-fill.fair {
                background: #f59e0b;
                width: 50%;
            }
            
            .strength-fill.good {
                background: #10b981;
                width: 75%;
            }
            
            .strength-fill.strong {
                background: #059669;
                width: 100%;
            }
            
            .strength-text {
                font-size: 0.75rem;
                color: #64748b;
            }
        `;
        document.head.appendChild(style);
    }
    
    checkPasswordStrength() {
        const password = this.passwordInput.value;
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        if (!password) {
            strengthFill.className = 'strength-fill';
            strengthText.textContent = 'Password strength';
            return;
        }
        
        let score = 0;
        
        // Length check
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        
        // Character variety checks
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 1;
        
        // Update strength indicator
        if (score <= 2) {
            strengthFill.className = 'strength-fill weak';
            strengthText.textContent = 'Weak';
        } else if (score <= 3) {
            strengthFill.className = 'strength-fill fair';
            strengthText.textContent = 'Fair';
        } else if (score <= 4) {
            strengthFill.className = 'strength-fill good';
            strengthText.textContent = 'Good';
        } else {
            strengthFill.className = 'strength-fill strong';
            strengthText.textContent = 'Strong';
        }
    }
    
    async handleSubmit() {
        // Validate all fields
        const isUsernameValid = this.validateUsername();
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        const isConfirmPasswordValid = this.validateConfirmPassword();
        const isTermsValid = this.validateTerms();
        
        if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isTermsValid) {
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        // Simulate API call
        try {
            const result = await this.simulateRegistration();
            
            if (result.success) {
                this.handleRegistrationSuccess(result);
            } else {
                this.handleRegistrationError(result.message);
            }
        } catch (error) {
            this.handleRegistrationError('An unexpected error occurred. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    async simulateRegistration() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const username = this.usernameInput.value.trim();
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        
        // Simulate email/username availability check
        const existingUsers = [
            { username: 'admin', email: 'admin@travelguide.com' },
            { username: 'demo', email: 'demo@travelguide.com' },
            { username: 'user', email: 'user@example.com' }
        ];
        
        const isUsernameTaken = existingUsers.some(user => user.username === username);
        const isEmailTaken = existingUsers.some(user => user.email === email);
        
        if (isUsernameTaken) {
            return {
                success: false,
                message: 'Username is already taken. Please choose a different one.'
            };
        }
        
        if (isEmailTaken) {
            return {
                success: false,
                message: 'Email is already registered. Please use a different email or try logging in.'
            };
        }
        
        // Simulate successful registration
        return {
            success: true,
            user: {
                id: Math.floor(Math.random() * 1000) + 100,
                username: username,
                email: email,
                name: username,
                avatar: null
            }
        };
    }
    
    handleRegistrationSuccess(result) {
        // Save user data to localStorage (in a real app, you'd use secure tokens)
        localStorage.setItem('user', JSON.stringify(result.user));
        
        // Show success message
        showMessage('Account created successfully! Welcome to TravelGuide!', 'success');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
    
    handleRegistrationError(message) {
        showMessage(message, 'error');
        
        // Focus on the first field with an error
        if (message.includes('Username')) {
            this.usernameInput.focus();
        } else if (message.includes('Email')) {
            this.emailInput.focus();
        }
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('btn-loading');
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Creating Account...';
        } else {
            this.submitBtn.classList.remove('btn-loading');
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Create Account';
        }
    }
    
    handleSocialRegister(provider) {
        showMessage(`${provider} registration is not implemented in this demo. Please use the form above.`, 'info');
    }
}

// Initialize register form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new RegisterForm();
}); 