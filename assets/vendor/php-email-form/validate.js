/**
* Custom Form Validation - Modified for submit-form.com
* Based on PHP Email Form Validation - v3.9
* Author: BootstrapMade.com (Modified)
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      // Show loading state
      showLoading(thisForm);

      let formData = new FormData( thisForm );

      // Submit to submit-form.com
      submitForm(thisForm, action, formData);
    });
  });

  function submitForm(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`); 
      }
    })
    .then(data => {
      hideLoading(thisForm);
      showSuccess(thisForm, 'Your message has been sent successfully!');
      thisForm.reset(); 
    })
    .catch((error) => {
      hideLoading(thisForm);
      displayError(thisForm, 'Sorry, there was an error sending your message. Please try again.');
      console.error('Form submission error:', error);
    });
  }

  function showLoading(thisForm) {
    const submitBtn = thisForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
  }

  function hideLoading(thisForm) {
    const submitBtn = thisForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send';
    }
  }

  function showSuccess(thisForm, message) {
    // Create success message element if it doesn't exist
    let successElement = thisForm.querySelector('.success-message');
    if (!successElement) {
      successElement = document.createElement('div');
      successElement.className = 'success-message';
      successElement.style.cssText = 'color: #27a776; margin-top: 10px; padding: 10px; background: rgba(39, 167, 118, 0.1); border-radius: 4px;';
      thisForm.appendChild(successElement);
    }
    
    successElement.innerHTML = message;
    successElement.style.display = 'block';
    
    // Hide error message if it exists
    const errorElement = thisForm.querySelector('.error-message');
    if (errorElement) {
      errorElement.style.display = 'none';
    }

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      successElement.style.display = 'none';
    }, 5000);
  }

  function displayError(thisForm, error) {
    // Create error message element if it doesn't exist
    let errorElement = thisForm.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.style.cssText = 'color: #dc3545; margin-top: 10px; padding: 10px; background: rgba(220, 53, 69, 0.1); border-radius: 4px;';
      thisForm.appendChild(errorElement);
    }
    
    errorElement.innerHTML = error;
    errorElement.style.display = 'block';
    
    // Hide success message if it exists
    const successElement = thisForm.querySelector('.success-message');
    if (successElement) {
      successElement.style.display = 'none';
    }

    // Auto-hide error message after 5 seconds
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  }

})();
