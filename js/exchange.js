// Exchange page functionality
document.addEventListener('DOMContentLoaded', function() {
    const exchangeForm = document.getElementById('exchangeForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const newRequestBtn = document.getElementById('newRequestBtn');

    if (exchangeForm) {
        exchangeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const skillToLearn = document.getElementById('skillSelect').value;
            const skillToOffer = document.getElementById('offerSelect').value;
            const preferredDate = document.getElementById('preferredDate').value;
            const preferredTime = document.getElementById('preferredTime').value;
            const meetingType = document.getElementById('meetingType').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!skillToLearn || !skillToOffer || !preferredDate || !preferredTime || !meetingType) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show confirmation message
            exchangeForm.style.display = 'none';
            confirmationMessage.style.display = 'block';

            // Here you would typically send the data to a server
            console.log('Exchange request submitted:', {
                skillToLearn,
                skillToOffer,
                preferredDate,
                preferredTime,
                meetingType,
                message
            });
        });
    }

    if (newRequestBtn) {
        newRequestBtn.addEventListener('click', function() {
            confirmationMessage.style.display = 'none';
            exchangeForm.style.display = 'block';
            exchangeForm.reset();
        });
    }

    // Set minimum date to today
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Real-time form validation
    const formInputs = exchangeForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            field.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.style.borderColor = 'var(--error-color)';
                return false;
            }
        }
        
        field.style.borderColor = 'var(--success-color)';
        return true;
    }
});