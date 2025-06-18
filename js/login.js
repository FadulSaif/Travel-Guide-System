// Login functionality

class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadSavedCredentials();
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Password toggle
        this.passwordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
        
        // Real-time validation
        this.emailInput.addEventListener('blur', () => {
            this.validateEmail();
        });
        
        this.passwordInput.addEventListener('blur', () => {
            this.validatePassword();
        });
        
        // Clear errors on input
        this.emailInput.addEventListener('input', () => {
            this.clearError(this.emailInput, 'emailError');
        });
        
        this.passwordInput.addEventListener('input', () => {
            this.clearError(this.passwordInput, 'passwordError');
        });
        
        // Social login buttons
        const googleBtn = document.querySelector('.btn-google');
        const facebookBtn = document.querySelector('.btn-facebook');
        
        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                this.handleSocialLogin('Google');
            });
        }
        
        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                this.handleSocialLogin('Facebook');
            });
        }
    }
    
    togglePasswordVisibility() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        
        const eyeIcon = this.passwordToggle.querySelector('.eye-icon');
        if (type === 'text') {
            this.passwordToggle.classList.add('show');
            eyeIcon.textContent = '🙈';
        } else {
            this.passwordToggle.classList.remove('show');
            eyeIcon.textContent = '👁️';
        }
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
        
        if (password.length < 6) {
            this.showError(this.passwordInput, 'passwordError', 'Password must be at least 6 characters long');
            return false;
        }
        
        this.showSuccess(this.passwordInput, 'passwordError');
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
    
    async handleSubmit() {
        // Validate form
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        // Simulate API call
        try {
            const result = await this.simulateLogin();
            
            if (result.success) {
                this.handleLoginSuccess(result);
            } else {
                this.handleLoginError(result.message);
            }
        } catch (error) {
            this.handleLoginError('An unexpected error occurred. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    async simulateLogin() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        
        // Demo credentials (in a real app, this would be handled by the backend)
        const demoCredentials = {
            'demo@travelguide.com': 'password123',
            'user@example.com': 'password123',
            'admin@travelguide.com': 'admin123'
        };
        
        if (demoCredentials[email] && demoCredentials[email] === password) {
            return {
                success: true,
                user: {
                    id: 1,
                    email: email,
                    name: email.split('@')[0],
                    avatar: null
                }
            };
        } else {
            return {
                success: false,
                message: 'Invalid email or password. Please try again.'
            };
        }
    }
    
    handleLoginSuccess(result) {
        // Save user data to localStorage (in a real app, you'd use secure tokens)
        localStorage.setItem('user', JSON.stringify(result.user));
        
        // Save remember me preference
        const rememberMe = document.getElementById('rememberMe').checked;
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('savedEmail', this.emailInput.value.trim());
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedEmail');
        }
        
        // Show success message
        showMessage('Login successful! Redirecting to dashboard...', 'success');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }
    
    handleLoginError(message) {
        showMessage(message, 'error');
        
        // Clear password field on error
        this.passwordInput.value = '';
        this.passwordInput.focus();
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('btn-loading');
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Signing In...';
        } else {
            this.submitBtn.classList.remove('btn-loading');
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Sign In';
        }
    }
    
    handleSocialLogin(provider) {
        showMessage(`${provider} login is not implemented in this demo. Please use the form above.`, 'info');
    }
    
    loadSavedCredentials() {
        const rememberMe = localStorage.getItem('rememberMe');
        const savedEmail = localStorage.getItem('savedEmail');
        
        if (rememberMe === 'true' && savedEmail) {
            this.emailInput.value = savedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }
}

// Initialize login form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new LoginForm();
}); 