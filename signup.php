<?php
require_once 'includes/config.php';

redirectIfLoggedIn();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account - Elite Homes</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="auth-page auth-login auth-signup">
    <div class="login-container">
        <div class="login-scene">
            <section class="login-showcase">
                <p class="login-kicker">Elite Homes</p>
                <h1>Create Your Account</h1>
                <p class="login-showcase-text">
                    Join to save listings, manage preferences, and access your real estate dashboard in one place.
                </p>
            </section>

            <div class="login-wrapper">
                <div class="login-header">
                    <p class="login-panel-kicker">Get started in minutes</p>
                    <h2>Sign Up</h2>
                    <span>Create your account to continue.</span>
                </div>

                <div class="login-body">
                    <div id="alertContainer"></div>
                    <form onsubmit="handleRegister(event)" id="signupForm">
                        <div class="signup-grid">
                            <div class="form-group">
                                <label for="registerUsername">Username</label>
                                <input type="text" id="registerUsername" placeholder="Choose a unique username"
                                       pattern="[a-zA-Z0-9_]{3,20}" title="3-20 characters, letters, numbers, underscore only" required>
                                <small class="form-helper">3-20 characters (letters, numbers, underscore)</small>
                            </div>

                            <div class="form-group">
                                <label for="registerEmail">Email Address</label>
                                <input type="email" id="registerEmail" placeholder="Enter your email" required>
                                <small class="form-helper">&nbsp;</small>
                            </div>

                            <div class="form-group">
                                <label for="registerFullName">Full Name</label>
                                <input type="text" id="registerFullName" placeholder="Enter your full name" required>
                                <small class="form-helper">&nbsp;</small>
                            </div>

                            <div class="form-group">
                                <label for="registerPhone">Phone Number <span class="optional">(Optional)</span></label>
                                <input type="tel" id="registerPhone" placeholder="(555) 123-4567">
                                <small class="form-helper">&nbsp;</small>
                            </div>
                        </div>

                        <div class="signup-password-grid">
                            <div class="form-group password-wrapper">
                                <label for="registerPassword">Password</label>
                                <div class="password-field-row">
                                    <input type="password" id="registerPassword" class="password-field" placeholder="Create a strong password"
                                           minlength="6" required
                                           data-plaintext="" data-visibility-state="hidden"
                                           oninput="updatePasswordStrength(this.value); this.setAttribute('data-plaintext', this.value); checkPasswordMatch();">
                                    <button type="button" id="registerPasswordToggle" class="password-toggle" data-input="registerPassword" onclick="togglePasswordVisibility('registerPassword', 'registerPasswordToggle')">Show</button>
                                </div>
                                <small id="passwordStrength" class="form-helper"></small>
                            </div>

                            <div class="form-group password-wrapper">
                                <label for="registerConfirmPassword">Confirm Password</label>
                                <div class="password-field-row">
                                    <input type="password" id="registerConfirmPassword" class="password-field" placeholder="Confirm your password"
                                           minlength="6" required
                                           data-plaintext="" data-visibility-state="hidden"
                                           oninput="this.setAttribute('data-plaintext', this.value); checkPasswordMatch();">
                                    <button type="button" id="registerConfirmPasswordToggle" class="password-toggle" data-input="registerConfirmPassword" onclick="togglePasswordVisibility('registerConfirmPassword', 'registerConfirmPasswordToggle')">Show</button>
                                </div>
                                <small id="passwordMatch" class="form-helper"></small>
                            </div>
                        </div>

                        <div class="login-tip">
                            <strong>Tip:</strong> Click the password toggle to switch between hidden, decrypted, and encrypted views.
                        </div>

                        <button type="submit" class="btn-primary">Create My Account</button>
                    </form>

                    <div class="form-footer">
                        <p>Already have an account? <a href="login.php">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/main.js"></script>
    <script>
        function updatePasswordStrength(password) {
            const strengthEl = document.getElementById('passwordStrength');
            let strength = 'Weak';
            let color = '#f56565';

            if (password.length >= 8) {
                if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
                    strength = 'Strong';
                    color = '#48bb78';
                } else if (/[a-z]/.test(password) || /[A-Z]/.test(password) || /[0-9]/.test(password)) {
                    strength = 'Medium';
                    color = '#f6ad55';
                }
            }

            strengthEl.textContent = `Password strength: ${strength}`;
            strengthEl.style.color = color;
        }
    </script>
</body>
</html>
