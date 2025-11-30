/**
 * Main JavaScript File
 * Handles navigation, mobile menu, and progressive enhancement
 */

(function() {
  'use strict';

  // Feature detection
  const supportsLocalStorage = typeof Storage !== 'undefined';
  const supportsIntersectionObserver = 'IntersectionObserver' in window;

  /**
   * Mobile Navigation Handler
   */
  class MobileNav {
    constructor() {
      this.hamburger = document.querySelector('.hamburger');
      this.menu = document.getElementById('menu');
      
      if (!this.hamburger || !this.menu) return;
      
      this.init();
    }

    init() {
      this.hamburger.addEventListener('click', () => this.toggle());
      this.hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.menu.contains(e.target) && !this.hamburger.contains(e.target)) {
          this.close();
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });
    }

    toggle() {
      const isExpanded = this.hamburger.getAttribute('aria-expanded') === 'true';
      this.hamburger.setAttribute('aria-expanded', !isExpanded);
      this.menu.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        this.open();
      } else {
        this.close();
      }
    }

    open() {
      this.menu.classList.add('open');
      this.hamburger.setAttribute('aria-expanded', 'true');
      this.menu.setAttribute('aria-expanded', 'true');
    }

    close() {
      this.menu.classList.remove('open');
      this.hamburger.setAttribute('aria-expanded', 'false');
      this.menu.setAttribute('aria-expanded', 'false');
    }

    isOpen() {
      return this.hamburger.getAttribute('aria-expanded') === 'true';
    }
  }

  /**
   * Remove inline event handlers and attach proper event listeners
   */
  function removeInlineHandlers() {
    // Find all buttons with onclick
    const buttons = document.querySelectorAll('button[onclick]');
    buttons.forEach(button => {
      const onclick = button.getAttribute('onclick');
      if (onclick && onclick.includes('window.location.href')) {
        const url = onclick.match(/href='([^']+)'/)?.[1] || onclick.match(/href="([^"]+)"/)?.[1];
        if (url) {
          button.removeAttribute('onclick');
          button.addEventListener('click', () => {
            window.location.href = url;
          });
        }
      }
    });
  }

  /**
   * Lazy load images with Intersection Observer
   */
  function initLazyLoading() {
    if (!supportsIntersectionObserver) {
      // Fallback: load all images
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
      return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || href === '#main-content') {
          e.preventDefault();
          const target = document.querySelector(href) || document.querySelector('#main-content');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Update URL without jumping
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  /**
   * Initialize active page highlighting
   */
  function initActivePage() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    const links = document.querySelectorAll('#menu a');
    links.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPage || (currentPage === '' && linkPath === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Initialize all features when DOM is ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialize features
    new MobileNav();
    removeInlineHandlers();
    initLazyLoading();
    initSmoothScroll();
    initActivePage();
  }

  // Start initialization
  init();

})();

