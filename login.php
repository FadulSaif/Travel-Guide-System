<?php
session_start();
require_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        exit("Email and password are required.");
    }

    $stmt = $conn->prepare("SELECT user_id, user_name, password, user_type FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        exit("Invalid email or password.");
    }

    $stmt->bind_result($user_id, $user_name, $hashedPassword, $user_type);
    $stmt->fetch();

    if (!password_verify($password, $hashedPassword)) {
        exit("Invalid email or password.");
    }

    $_SESSION['user_id'] = $user_id;
    $_SESSION['user_name'] = $user_name;
    $_SESSION['user_type'] = $user_type;

    echo "success";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - TravelGuide</title>
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
    <section class="auth-section" aria-label="Login">
        <div class="container">
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to your TravelGuide account</p>
                    </div>
                    <div id="formMessage"></div>
                    <form id="loginForm" class="auth-form" aria-label="Login Form">
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
                        <div class="form-options">
                            <label class="checkbox-label">
                                <input type="checkbox" id="rememberMe" name="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Sign In</button>
                    </form>
                    <div class="auth-footer">
                        <p>Don't have an account? <a href="register.php">Sign up here</a></p>
                    </div>
                </div>
                <div class="auth-image">
                    <div class="image-overlay">
                        <h2>Discover Amazing Destinations</h2>
                        <p>Join thousands of travelers who trust TravelGuide for their adventures</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>

    <?php include 'footer.php'; ?>

    <script src="js/login.js"></script>
    <script src="script.js"></script>
</body>
</html> 