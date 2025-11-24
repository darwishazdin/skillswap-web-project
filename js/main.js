// Main JavaScript file - handles common functionality across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Initialize auth functionality
    initializeAuth();
    
    // Profile page functionality
    initializeProfilePage();
    
    // Contact form functionality
    initializeContactForm();

    // Check auth status for protected pages
    checkPageAuth();
});

// Auth functionality
function initializeAuth() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === targetTab + 'Form') {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simulate login - in real app, this would call an API
            if (email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                alert('Login successful!');
                window.location.href = 'profile.html';
            }
        });
    }
    
    // Signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (name && email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', name);
                alert('Account created successfully!');
                window.location.href = 'profile.html';
            }
        });
    }
}

function checkPageAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const protectedPages = ['profile.html', 'exchange.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && isLoggedIn !== 'true') {
        // Show login required message
        const loginRequired = document.getElementById('loginRequired');
        const content = document.getElementById('profileContent') || document.getElementById('exchangeContent');
        
        if (loginRequired && content) {
            loginRequired.style.display = 'block';
            content.style.display = 'none';
        }
    } else if (isLoggedIn === 'true') {
        // Update navigation for logged in users
        updateNavigationForLoggedInUser();
    }
}

function updateNavigationForLoggedInUser() {
    const authNavItem = document.getElementById('authNavItem');
    const loginButtons = document.querySelectorAll('.login-btn');
    
    if (authNavItem) {
        authNavItem.innerHTML = '<a href="#" id="logoutLink" class="nav-link login-btn">Logout</a>';
        document.getElementById('logoutLink').addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    loginButtons.forEach(btn => {
        if (btn.id !== 'logoutLink') {
            btn.textContent = 'Logout';
            btn.href = '#';
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
        }
    });
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfile');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
}

// Profile page functionality
function initializeProfilePage() {
    const addTeachForm = document.getElementById('addTeachForm');
    const addLearnForm = document.getElementById('addLearnForm');
    const profileForm = document.getElementById('profileForm');
    const profileSetup = document.getElementById('profileSetup');
    const profileDisplay = document.getElementById('profileDisplay');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Check if user is logged in and has profile
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (isLoggedIn === 'true') {
        if (savedProfile) {
            // Show existing profile
            displayProfile(JSON.parse(savedProfile));
            if (profileSetup) profileSetup.style.display = 'none';
            if (profileDisplay) profileDisplay.style.display = 'block';
        } else if (profileSetup) {
            // Show profile setup
            profileSetup.style.display = 'block';
        }
        
        // Update navigation
        updateNavigationForLoggedInUser();
    }
    
    // Profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userProfile = {
                name: document.getElementById('userName').value,
                location: document.getElementById('userLocation').value,
                bio: document.getElementById('userBio').value
            };
            
            // Save to localStorage
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            
            // Display the profile
            displayProfile(userProfile);
            
            // Switch views
            if (profileSetup) profileSetup.style.display = 'none';
            if (profileDisplay) profileDisplay.style.display = 'block';
            
            alert('Profile created successfully!');
        });
    }
    
    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Add skill to teach
    if (addTeachForm) {
        addTeachForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const skillInput = this.querySelector('.skill-input');
            const levelSelect = this.querySelector('.level-select');
            
            if (skillInput.value && levelSelect.value) {
                addSkillToList('teach', skillInput.value, levelSelect.value);
                skillInput.value = '';
                levelSelect.value = '';
            }
        });
    }

    // Add skill to learn
    if (addLearnForm) {
        addLearnForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const skillInput = this.querySelector('.skill-input');
            const levelSelect = this.querySelector('.level-select');
            
            if (skillInput.value && levelSelect.value) {
                addSkillToList('learn', skillInput.value, levelSelect.value);
                skillInput.value = '';
                levelSelect.value = '';
            }
        });
    }

    // Remove skill functionality
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
}

function displayProfile(profile) {
    const displayName = document.getElementById('displayName');
    const displayLocation = document.getElementById('displayLocation');
    const displayBio = document.getElementById('displayBio');
    
    if (displayName) displayName.textContent = profile.name;
    if (displayLocation) displayLocation.textContent = `📍 ${profile.location}`;
    if (displayBio) displayBio.textContent = profile.bio;
}

function addSkillToList(type, skillName, level) {
    const skillsList = document.getElementById(type === 'teach' ? 'teachSkillsList' : 'learnSkillsList');
    if (skillsList) {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <span class="skill-name">${skillName}</span>
            <span class="skill-level ${level}">${level.charAt(0).toUpperCase() + level.slice(1)}</span>
            <button class="btn-remove">×</button>
        `;
        
        skillsList.appendChild(skillItem);
        
        // Add event listener to new remove button
        skillItem.querySelector('.btn-remove').addEventListener('click', function() {
            this.parentElement.remove();
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            if (name && email && message) {
                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
}

// Utility function for form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});