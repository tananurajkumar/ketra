/**
* Template Name: PhotoFolio
* Template URL: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 200);
      setTimeout(() => {
        preloader.remove();
      }, 500);
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 300,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  // Modern Contact Form Enhancement
  function initModernContactForm() {
    const form = document.querySelector('.modern-contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('.modern-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Add floating label animation
    const floatingLabels = form.querySelectorAll('.form-floating');
    floatingLabels.forEach(floating => {
      const input = floating.querySelector('.form-control');
      const label = floating.querySelector('label');

      // Check if input has value on page load
      if (input.value.trim() !== '') {
        label.classList.add('active');
      }

      input.addEventListener('focus', () => {
        label.classList.add('active');
      });

      input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
          label.classList.remove('active');
        }
      });

      input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      });
    });

    // Form submission with loading state
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      btnText.classList.add('d-none');
      btnLoading.classList.remove('d-none');
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form submission logic)
      setTimeout(() => {
        // Reset button state
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
        submitBtn.disabled = false;
        
        // Show success message (you can customize this)
        showFormMessage('success', 'Thank you! Your message has been sent successfully.');
        
        // Reset form
        form.reset();
        floatingLabels.forEach(floating => {
          const label = floating.querySelector('label');
          label.classList.remove('active');
        });
      }, 2000);
    });
  }

  // Show form messages
  function showFormMessage(type, message) {
    const form = document.querySelector('.modern-contact-form');
    if (!form) return;

    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
    messageDiv.innerHTML = `
      <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
      ${message}
    `;
    
    // Add to form
    form.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }

  // Initialize modern contact form when DOM is loaded
  document.addEventListener('DOMContentLoaded', initModernContactForm);

})();