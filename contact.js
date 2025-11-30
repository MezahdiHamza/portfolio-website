/**
 * Contact Form Handler
 * Handles form submission, validation, and user feedback
 */

class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.messageDiv = document.getElementById('formMessage');
    this.submitBtn = this.form?.querySelector('.submit-btn');
    
    if (!this.form) return;
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.setupValidation();
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove previous error styling
    field.classList.remove('error');

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Show error if invalid
    if (!isValid) {
      field.classList.add('error');
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    // Create error message element
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #f87171; font-size: 0.85rem; margin-top: 5px; display: block;';
    field.parentElement.appendChild(errorElement);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Clear previous messages
    this.clearMessage();

    // Validate form
    if (!this.validateForm()) {
      this.showMessage('Please fill in all required fields correctly.', 'error');
      return;
    }

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Show loading state
    this.setLoadingState(true);

    try {
      const response = await this.submitForm(formData);

      if (response.ok) {
        const data = await response.json();
        this.showMessage(
          data.message || 'Message sent successfully! I\'ll get back to you soon.',
          'success'
        );
        this.form.reset();
        this.clearFieldErrors();
      } else {
        const data = await response.json().catch(() => ({}));
        this.showMessage(
          data.error || 'Failed to send message. Please try again later.',
          'error'
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showMessage(
        'Network error. Please check your connection and try again.',
        'error'
      );
    } finally {
      this.setLoadingState(false);
    }
  }

  async submitForm(formData) {
    const API_URL = 'http://localhost:3000/api/contact';
    
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      // Add timeout handling
      signal: AbortSignal.timeout(10000) // 10 second timeout
    }).catch(error => {
      if (error.name === 'TimeoutError') {
        throw new Error('Request timeout. Please try again.');
      }
      throw error;
    });
  }

  setLoadingState(isLoading) {
    if (!this.submitBtn) return;

    this.submitBtn.disabled = isLoading;
    
    if (isLoading) {
      this.originalButtonText = this.submitBtn.textContent;
      this.submitBtn.textContent = 'Sending...';
      this.submitBtn.style.opacity = '0.7';
    } else {
      this.submitBtn.textContent = this.originalButtonText || 'Send Message';
      this.submitBtn.style.opacity = '1';
    }
  }

  showMessage(message, type) {
    this.messageDiv.textContent = message;
    this.messageDiv.className = `form-message ${type}`;
    this.messageDiv.setAttribute('role', 'alert');
    this.messageDiv.setAttribute('aria-live', 'polite');
    
    // Scroll to message if needed
    this.messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  clearMessage() {
    this.messageDiv.textContent = '';
    this.messageDiv.className = 'form-message';
    this.messageDiv.removeAttribute('role');
  }

  clearFieldErrors() {
    const errorFields = this.form.querySelectorAll('.field-error');
    errorFields.forEach(error => error.remove());
    
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.classList.remove('error'));
  }
}

// Initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});
