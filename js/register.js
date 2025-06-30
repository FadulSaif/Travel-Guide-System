class RegisterForm {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.usernameInput = document.getElementById('username');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.confirmPasswordInput = document.getElementById('confirmPassword');
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.formMessage = document.getElementById('formMessage');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const isUsernameValid = this.validateUsername();
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        const isConfirmPasswordValid = this.validateConfirmPassword();
        const isTermsValid = this.validateTerms();

        if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isTermsValid) return;

        this.setLoadingState(true);

        try {
            const result = await this.sendRegistrationToServer();
            if (result.success) {
                this.showMessage("Account created successfully! Redirecting to login...", 'success');
                setTimeout(() => {
                    window.location.href = 'login.php?registered=1';
                }, 2000);
            } else {
                this.showMessage(result.message, 'error');
                if (result.message.toLowerCase().includes("email")) {
                    this.emailInput.focus();
                    this.emailInput.classList.add('error');
                }
            }
        } catch (error) {
            this.showMessage('An unexpected error occurred. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    async sendRegistrationToServer() {
        const formData = new FormData(this.form);
        const response = await fetch('register.php', {
            method: 'POST',
            body: formData
        });

        const text = await response.text();
        if (response.ok && !text.includes("failed")) {
            return { success: true };
        } else {
            return { success: false, message: text };
        }
    }

    validateUsername() {
        const username = this.usernameInput.value.trim();

        if (!username) {
            this.showError(this.usernameInput, 'usernameError', 'Username is required');
            return false;
        }

        const allowed = /^[\p{L}\p{N} ]+$/u;
        if (!allowed.test(username)) {
            this.showError(this.usernameInput, 'usernameError', 'Only letters, numbers, and spaces are allowed');
            return false;
        }

        this.clearError(this.usernameInput, 'usernameError');
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

        this.clearError(this.emailInput, 'emailError');
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

        this.clearError(this.passwordInput, 'passwordError');
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

        this.clearError(this.confirmPasswordInput, 'confirmPasswordError');
        return true;
    }

    validateTerms() {
        const agreeTerms = document.getElementById('agreeTerms');

        if (!agreeTerms.checked) {
            this.showError(agreeTerms, 'termsError', 'You must agree to the Terms of Service');
            return false;
        }

        this.clearError(agreeTerms, 'termsError');
        return true;
    }

    showError(input, errorId, message) {
        input.classList.add('error');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearError(input, errorId) {
        input.classList.remove('error');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    showMessage(message, type) {
        if (!this.formMessage) {
            this.formMessage = document.createElement('div');
            this.formMessage.id = 'formMessage';
            this.form.appendChild(this.formMessage);
        }
        this.formMessage.textContent = message;
        this.formMessage.style.color = type === 'success' ? 'green' : 'red';
        this.formMessage.style.marginTop = '1rem';
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Creating Account...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Create Account';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RegisterForm();
});
