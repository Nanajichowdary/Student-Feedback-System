let currentRole = '';

        // Function to dynamically open the login forms
        function openLoginForm(role) {
            currentRole = role;
            const loginContainer = document.getElementById('login-container');
            const loginTitle = document.getElementById('login-title');
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            usernameInput.value = '';
            passwordInput.value = '';

            if (role === 'student') {
                loginTitle.innerText = "Student Login";
            } else if (role === 'teacher') {
                loginTitle.innerText = "Teacher Login";
            } else if (role === 'admin') {
                loginTitle.innerText = "Admin Login";
            }

            loginContainer.style.display = 'block';
        }

        // Function to validate and submit login
        function submitLogin() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Username validation
            if (!username) {
                alert('Please enter a valid username/email');
                return;
            }

            // Password validation - ensure only special characters are allowed
            const passwordRegex = /^[^0-9a-zA-Z]+$/;

            if (!passwordRegex.test(password)) {
                alert('Password should only contain special characters');
                return;
            }

            alert(`Login successful for ${currentRole} portal!`);
        }