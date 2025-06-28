class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
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
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (!isEmailValid || !isPasswordValid) return;

        this.setLoadingState(true);

        try {
            const result = await this.sendLoginToServer();

            if (result.success) {
                this.showMessage("Login successful! Redirecting...", "success");
                setTimeout(() => {
                    window.location.href = "index.php";
                }, 1500);
            } else {
                this.showMessage(result.message, "error");
                this.passwordInput.value = '';
                this.passwordInput.focus();
            }
        } catch (err) {
            this.showMessage("An unexpected error occurred.", "error");
        } finally {
            this.setLoadingState(false);
        }
    }

    async sendLoginToServer() {
        const formData = new FormData(this.form);
        const response = await fetch("login.php", {
            method: "POST",
            body: formData
        });

        const text = await response.text();
        if (text.trim() === "success") {
            return { success: true };
        } else {
            return { success: false, message: text };
        }
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.showError(this.emailInput, "emailError", "Email is required");
            return false;
        }
        if (!regex.test(email)) {
            this.showError(this.emailInput, "emailError", "Invalid email format");
            return false;
        }

        this.clearError(this.emailInput, "emailError");
        return true;
    }

    validatePassword() {
        const password = this.passwordInput.value;

        if (!password) {
            this.showError(this.passwordInput, "passwordError", "Password is required");
            return false;
        }
        if (password.length < 6) {
            this.showError(this.passwordInput, "passwordError", "Password must be at least 6 characters");
            return false;
        }

        this.clearError(this.passwordInput, "passwordError");
        return true;
    }

    showError(input, errorId, message) {
        input.classList.add("error");
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add("show");
        }
    }

    clearError(input, errorId) {
        input.classList.remove("error");
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove("show");
        }
    }

    showMessage(message, type) {
        if (this.formMessage) {
            this.formMessage.textContent = message;
            this.formMessage.style.color = type === "success" ? "green" : "red";
            this.formMessage.style.marginBottom = "1rem";
        }
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = "Signing in...";
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = "Sign In";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new LoginForm();
});
