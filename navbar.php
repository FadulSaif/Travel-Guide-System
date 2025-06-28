<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>

<nav class="nav" aria-label="Main Navigation">
    <ul class="nav-list">
        <li><a href="index.php" class="nav-link<?= basename($_SERVER['PHP_SELF']) === 'index.php' ? ' active' : '' ?>">Home</a></li>
        <li><a href="search.php" class="nav-link<?= basename($_SERVER['PHP_SELF']) === 'search.php' ? ' active' : '' ?>">Search</a></li>
        <?php if (isset($_SESSION['user_id'])): ?>
            <li><a href="dashboard.php" class="nav-link<?= basename($_SERVER['PHP_SELF']) === 'dashboard.php' ? ' active' : '' ?>">Dashboard</a></li>
            <li><a href="logout.php" class="nav-link">Logout</a></li>
            <li><span class="nav-link" style="cursor:default;">👋 Hello, <?= htmlspecialchars($_SESSION['user_name']) ?></span></li>
        <?php else: ?>
            <li><a href="login.php" class="nav-link<?= basename($_SERVER['PHP_SELF']) === 'login.php' ? ' active' : '' ?>">Login</a></li>
            <li><a href="register.php" class="nav-link<?= basename($_SERVER['PHP_SELF']) === 'register.php' ? ' active' : '' ?>">Register</a></li>
        <?php endif; ?>
    </ul>
</nav>
