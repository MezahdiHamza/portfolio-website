document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const messageDiv = document.getElementById('formMessage');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    messageDiv.textContent = '';
    messageDiv.className = 'form-message';

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        messageDiv.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        messageDiv.className = 'form-message success';
        form.reset();
      } else {
        messageDiv.textContent = data.error || 'Failed to send message. Please try again.';
        messageDiv.className = 'form-message error';
      }
    } catch (error) {
      console.error('Error:', error);
      messageDiv.textContent = 'Network error. Please check if the server is running.';
      messageDiv.className = 'form-message error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});

