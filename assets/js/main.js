/**
 * Main Application JavaScript
 * Handles form submissions, password toggle, and AJAX requests
 */

// Show Alert Message
function showAlert(message, type = 'success') {
    if (window.__alertTimeout) {
        clearTimeout(window.__alertTimeout);
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} fade-in`;
    alertDiv.textContent = message;
    
    const alertContainer = document.getElementById('alertContainer');
    const container = alertContainer || document.querySelector('.login-body') || document.querySelector('.dashboard-container') || document.body;

    const existingAlert = container.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    if (alertContainer) {
        alertContainer.appendChild(alertDiv);
    } else {
        container.insertBefore(alertDiv, container.firstChild);
    }
    
    window.__alertTimeout = setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Check password match and provide visual feedback
function checkPasswordMatch() {
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('registerConfirmPassword');
    const matchIndicator = document.getElementById('passwordMatch');
    
    if (!passwordInput || !confirmPasswordInput || !matchIndicator) return;
    
    const password = passwordInput.getAttribute('data-plaintext') || passwordInput.value;
    const confirmPassword = confirmPasswordInput.getAttribute('data-plaintext') || confirmPasswordInput.value;
    
    if (!confirmPassword) {
        matchIndicator.textContent = '';
        return;
    }
    
    if (password === confirmPassword && password.length > 0) {
        matchIndicator.textContent = '✓ Passwords match';
        matchIndicator.style.color = '#48bb78';
    } else if (password !== confirmPassword) {
        matchIndicator.textContent = '✗ Passwords do not match';
        matchIndicator.style.color = '#f56565';
    }
}

// Cipher alphabet for encryption - Custom symbol mapping
const cipherMap = {
    'A': '=', 'B': '!', 'C': '*', 'D': '/', 'E': ',',
    'F': '#', 'G': ';', 'H': ':', 'I': "'", 'J': '+',
    'K': '?', 'L': '-', 'M': '<', 'N': '&', 'O': '@',
    'P': '>', 'Q': "'", 'R': '(', 'S': '|', 'T': ']',
    'U': '{', 'V': '`', 'W': '_', 'X': '~', 'Y': '%',
    'Z': '$',
    'a': '=', 'b': '!', 'c': '*', 'd': '/', 'e': ',',
    'f': '#', 'g': ';', 'h': ':', 'i': "'", 'j': '+',
    'k': '?', 'l': '-', 'm': '<', 'n': '&', 'o': '@',
    'p': '>', 'q': "'", 'r': '(', 's': '|', 't': ']',
    'u': '{', 'v': '`', 'w': '_', 'x': '~', 'y': '%',
    'z': '$',
    '0': 'K', '1': 'J', '2': 'T', '3': 'A', '4': 'M',
    '5': 'R', '6': 'L', '7': 'E', '8': 'S', '9': 'D',
    ' ': '.'
};

// Encrypt text to cipher
function encryptText(text) {
    return text.split('').map(char => cipherMap[char] || char).join('');
}

// Toggle Password Visibility - Three states: Hidden → Decrypted → Encrypted → Hidden
function togglePasswordVisibility(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    
    if (!input) return;
    
    // Always get the plaintext from data attribute first, then input value
    let plainValue = input.getAttribute('data-plaintext') || input.value;
    const currentState = input.getAttribute('data-visibility-state') || 'hidden';
    
    let nextState;
    
    if (currentState === 'hidden') {
        // Hidden → Show Decrypted (plain text)
        nextState = 'decrypted';
        button.textContent = '🔒';
        button.setAttribute('data-state', 'Decrypted');
        button.setAttribute('title', 'Showing plaintext password - Click to show encrypted');
        input.type = 'text';
        input.value = plainValue;
        input.style.letterSpacing = '0px';
        input.style.fontFamily = 'Arial, sans-serif';
        input.style.color = '#000000';
    } else if (currentState === 'decrypted') {
        // Decrypted → Show Encrypted (cipher text)
        nextState = 'encrypted';
        button.textContent = '🔐';
        button.setAttribute('data-state', 'Encrypted');
        button.setAttribute('title', 'Showing encrypted password - Click to hide');
        input.type = 'text';
        const encryptedValue = encryptText(plainValue);
        input.value = encryptedValue;
        input.style.letterSpacing = '3px';
        input.style.fontFamily = 'monospace';
        input.style.color = '#ff0000';
    } else {
        // Encrypted → Hide (show dots)
        nextState = 'hidden';
        button.textContent = '👁️‍🗨️';
        button.setAttribute('data-state', 'Hidden');
        button.setAttribute('title', 'Password hidden - Click to show decrypted');
        input.type = 'password';
        input.value = plainValue;
        input.style.letterSpacing = '0px';
        input.style.fontFamily = 'Arial, sans-serif';
        input.style.color = '#000000';
    }
    
    // Always store the plaintext for next toggle
    input.setAttribute('data-plaintext', plainValue);
    input.setAttribute('data-visibility-state', nextState);
}

// Listen for input changes to always capture plaintext
document.addEventListener('input', function(e) {
    if (e.target && e.target.type === 'password') {
        // Store plaintext when user types
        e.target.setAttribute('data-plaintext', e.target.value);
    } else if (e.target && e.target.classList && e.target.classList.contains('password-field')) {
        // For text inputs showing password
        const state = e.target.getAttribute('data-visibility-state');
        if (state === 'decrypted' || state === 'encrypted') {
            e.target.setAttribute('data-plaintext', e.target.value);
        }
    }
}, true);

// Get Selected Tab
function getActiveTab() {
    return document.getElementById('loginForm').style.display === 'none' ? 'register' : 'login';
}

// Switch Form Tab
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    
    if (tab === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        if (loginTab) loginTab.classList.remove('active');
        if (registerTab) registerTab.classList.add('active');
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        if (loginTab) loginTab.classList.add('active');
        if (registerTab) registerTab.classList.remove('active');
    }
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    
    const username = usernameInput.value.trim();
    // Get the plaintext password from data attribute (or current value if not hidden)
    const password = passwordInput.getAttribute('data-plaintext') || passwordInput.value;
    
    if (!username || !password) {
        showAlert('Please fill in all fields', 'warning');
        return;
    }
    
    const button = document.querySelector('#loginForm button[type="submit"]');
    button.disabled = true;
    button.innerHTML = '<span class="loading"></span> Logging in...';
    
    fetch('api/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'login',
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert(data.message, 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.php';
            }, 1500);
        } else {
            showAlert(data.message, 'error');
            button.disabled = false;
            button.innerHTML = 'Login';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('An error occurred. Please try again.', 'error');
        button.disabled = false;
        button.innerHTML = 'Login';
    });
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const fullName = document.getElementById('registerFullName').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('registerConfirmPassword');
    
    const password = passwordInput.getAttribute('data-plaintext') || passwordInput.value;
    const confirmPassword = confirmPasswordInput.getAttribute('data-plaintext') || confirmPasswordInput.value;
    
    if (!username || !email || !fullName || !password || !confirmPassword) {
        showAlert('Please fill in all required fields', 'warning');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters', 'warning');
        return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'warning');
        return;
    }
    
    const button = document.querySelector('#signupForm button[type="submit"]');
    button.disabled = true;
    button.innerHTML = '<span class="loading"></span> Creating Account...';
    
    fetch('api/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'register',
            username: username,
            email: email,
            full_name: fullName,
            password: password,
            phone: phone
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert(data.message, 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.php';
            }, 1500);
        } else {
            showAlert(data.message, 'error');
            button.disabled = false;
            button.innerHTML = 'Create My Account';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('An error occurred. Please try again.', 'error');
        button.disabled = false;
        button.innerHTML = 'Create My Account';
    });
}

// Logout
function logout() {
    fetch('api/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'logout'
        })
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = 'login.php';
    });
}

// Add event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form
    const registerForm = document.getElementById('signupForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Password toggle buttons
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(button => {
        button.addEventListener('click', function() {
            const inputId = this.getAttribute('data-input');
            const buttonId = this.id;
            togglePasswordVisibility(inputId, buttonId);
        });
    });
});
