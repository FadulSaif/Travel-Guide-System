<?php
require_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';

    if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
        exit("All fields are required.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("Invalid email format.");
    }

    if ($password !== $confirmPassword) {
        exit("Passwords do not match.");
    }

    $check = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        exit("Email already registered.");
    }

    $check->close();

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (user_name, email, password, user_type) VALUES (?, ?, ?, 1)");
    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo "success";
    } else {
        exit("Registration failed: " . $conn->error);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - TravelGuide</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/auth.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header" role="banner">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <h1 id="siteTitle" class="site-title-gradient">TravelGuide</h1>
                </div>
                <?php include 'navbar.php'; ?>
                <div class="mobile-menu-toggle" aria-label="Open navigation menu" aria-expanded="false" tabindex="0" role="button">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </header>

    <main>
    <section class="auth-section" aria-label="Register">
        <div class="container">
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <h1>Create Account</h1>
                        <p>Join TravelGuide and start your journey</p>
                    </div>
                     <div id="formMessage"></div>
                    <form id="registerForm" class="auth-form" action="register.php" method="POST" aria-label="Register Form">
                        <div class="form-group">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" id="username" name="username" class="form-input" required aria-required="true" aria-label="Username">
                            <div class="error-message" id="usernameError"></div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Email Address</label>
                            <input type="email" id="email" name="email" class="form-input" required aria-required="true" aria-label="Email Address">
                            <div class="error-message" id="emailError"></div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" name="password" class="form-input" required aria-required="true" aria-label="Password">
                            <div class="error-message" id="passwordError"></div>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" class="form-input" required aria-required="true" aria-label="Confirm Password">
                            <div class="error-message" id="confirmPasswordError"></div>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="agreeTerms" name="agreeTerms" required aria-required="true">
                                I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
                            </label>
                            <div class="error-message" id="termsError"></div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Create Account</button>
                    </form>

                    <div class="auth-footer">
                        <p>Already have an account? <a href="login.php">Sign in here</a></p>
                    </div>
                </div>
                <div class="auth-image">
                    <div class="image-overlay">
                        <h2>Start Your Adventure</h2>
                        <p>Create your account and unlock access to thousands of amazing destinations, personalized recommendations, and exclusive travel deals.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>

    <?php include 'footer.php'; ?>

    <script src="script.js"></script>
    <script src="js/register.js"></script>
</body>
</html> 