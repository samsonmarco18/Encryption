<?php
require_once 'includes/config.php';

redirectIfLoggedIn();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Real Estate Portal</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="auth-page auth-login">
    <div class="login-container">
        <div class="login-scene">
            <section class="login-showcase">
                <p class="login-kicker">Elite Homes</p>
                <h1>Explore Luxury Living</h1>
                <p class="login-showcase-text">
                    Find elegant properties, secure your account instantly, and step into a smoother real estate experience.
                </p>
            </section>

            <div class="login-wrapper">
                <div class="login-header">
                    <p class="login-panel-kicker">Sign in to continue</p>
                    <h2>Welcome Back</h2>
                    <span>Access your property dashboard and saved homes.</span>
                </div>
                
                <div class="login-body">
                    <div id="loginForm" class="form-section active">
                        <div id="alertContainer"></div>
                        <form onsubmit="handleLogin(event)" id="loginFormElement">
                            <div class="form-group">
                                <label for="loginUsername">Username or Email</label>
                                <input type="text" id="loginUsername" placeholder="Enter your username or email" required>
                            </div>
                            
                            <div class="form-group password-wrapper">
                                <div class="password-label-row">
                                    <label for="loginPassword">Password</label>
                                    <a href="#" class="inline-link">Forgot password?</a>
                                </div>
                                <div class="password-field-row">
                                    <input type="password" id="loginPassword" class="password-field" placeholder="Enter your password" required
                                           data-plaintext="" data-visibility-state="hidden"
                                           oninput="this.setAttribute('data-plaintext', this.value)">
                                    <button type="button" id="loginPasswordToggle" class="password-toggle" data-input="loginPassword" onclick="togglePasswordVisibility('loginPassword', 'loginPasswordToggle')">Show</button>
                                </div>
                            </div>
                            
                            <div class="login-tip">
                                <strong>Tip:</strong> Click the password toggle to switch between hidden, decrypted, and encrypted views.
                            </div>
                            
                            <button type="submit" class="btn-primary">Sign In</button>
                        </form>
                        
                        <div class="form-footer">
                            <p>Don't have an account? <a href="signup.php">Create one here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="assets/js/main.js"></script>
</body>
</html>
