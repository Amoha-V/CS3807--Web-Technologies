document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Form fields
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const eventCheckboxes = document.querySelectorAll('input[name="event"]');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const ageError = document.getElementById('ageError');
    const eventError = document.getElementById('eventError');
    
    // Validation functions
    function validateName() {
        const nameValue = fullName.value.trim();
        const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z-]+)+$/;
        
        if (!nameValue) {
            showError(fullName, nameError, 'Full name is required');
            return false;
        }
        
        if (!nameRegex.test(nameValue)) {
            showError(fullName, nameError, 'Please enter first and last name');
            return false;
        }
        
        const nameParts = nameValue.split(' ');
        if (nameParts.some(part => part.length < 2)) {
            showError(fullName, nameError, 'Each name part must be at least 2 characters');
            return false;
        }
        
        showSuccess(fullName, nameError);
        return true;
    }
    
    function validateEmail() {
        const emailValue = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailValue) {
            showError(email, emailError, 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(emailValue)) {
            showError(email, emailError, 'Please enter a valid email');
            return false;
        }
        
        showSuccess(email, emailError);
        return true;
    }
    
    function validatePhone() {
        const phoneValue = phone.value.trim();
        // Remove all non-digit characters
        const digitsOnly = phoneValue.replace(/\D/g, '');
        
        if (!phoneValue) {
            showError(phone, phoneError, 'Phone number is required');
            return false;
        }
        
        if (digitsOnly.length !== 10) {
            showError(phone, phoneError, 'Phone number must be 10 digits');
            return false;
        }
        
        showSuccess(phone, phoneError);
        return true;
    }
    
    function validateAge() {
        const ageValue = age.value;
        
        if (!ageValue) {
            showError(age, ageError, 'Age is required');
            return false;
        }
        
        const ageNum = parseInt(ageValue);
        if (isNaN(ageNum)) {
            showError(age, ageError, 'Please enter a valid number');
            return false;
        }
        
        if (ageNum < 18) {
            showError(age, ageError, 'You must be at least 18 years old');
            return false;
        }
        
        if (ageNum > 120) {
            showError(age, ageError, 'Please enter a valid age');
            return false;
        }
        
        showSuccess(age, ageError);
        return true;
    }
    
    function validateEvents() {
        const checkedEvents = Array.from(eventCheckboxes).filter(cb => cb.checked);
        
        if (checkedEvents.length === 0) {
            showError(eventCheckboxes[0], eventError, 'Please select at least one event');
            return false;
        }
        
        showSuccess(eventCheckboxes[0], eventError);
        return true;
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
    }
    
    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isAgeValid = validateAge();
        const isEventValid = validateEvents();
        
        return isNameValid && isEmailValid && isPhoneValid && isAgeValid && isEventValid;
    }
    
    // Real-time validation
    fullName.addEventListener('input', validateName);
    email.addEventListener('input', validateEmail);
    phone.addEventListener('input', validatePhone);
    age.addEventListener('input', validateAge);
    eventCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateEvents);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Form is valid, proceed with submission
            alert('Registration successful! Thank you.');
            form.reset();
            submitBtn.disabled = true;
            
            // Reset all visual feedback
            document.querySelectorAll('input, select, textarea').forEach(el => {
                el.classList.remove('success', 'error');
            });
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
        }
    });
    
    // Enable/disable submit button based on form validity
    form.addEventListener('input', function() {
        submitBtn.disabled = !validateForm();
    });
});