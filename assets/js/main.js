/**
 * Main JavaScript File
 * Modern ES6+ code with all features
 */

(function() {
  'use strict';

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ============================================
  // THEME TOGGLE (Dark/Light Mode)
  // ============================================

  class ThemeToggle {
    constructor() {
      this.toggle = $('#theme-toggle');
      this.html = document.documentElement;
      this.currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      
      if (this.toggle) {
        this.init();
      }
    }

    init() {
      this.setTheme(this.currentTheme);
      this.toggle.addEventListener('click', () => this.toggleTheme());
      this.toggle.setAttribute('data-theme', this.currentTheme);
    }

    setTheme(theme) {
      this.html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      if (this.toggle) {
        this.toggle.setAttribute('data-theme', theme);
      }
    }

    toggleTheme() {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.currentTheme = newTheme;
      this.setTheme(newTheme);
    }
  }

  // ============================================
  // MOBILE NAVIGATION
  // ============================================

  class MobileNav {
    constructor() {
      this.hamburger = $('#hamburger');
      this.menu = $('#navbar-menu');
      
      if (this.hamburger && this.menu) {
        this.init();
      }
    }

    init() {
      this.hamburger.addEventListener('click', () => this.toggle());
      this.hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!this.menu.contains(e.target) && !this.hamburger.contains(e.target)) {
          this.close();
        }
      });

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });

      // Close on link click (mobile)
      if (window.innerWidth <= 768) {
        const links = this.menu.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('click', () => this.close());
        });
      }
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
      document.body.style.overflow = 'hidden';
    }

    close() {
      this.menu.classList.remove('open');
      this.hamburger.setAttribute('aria-expanded', 'false');
      this.menu.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    isOpen() {
      return this.hamburger.getAttribute('aria-expanded') === 'true';
    }
  }

  // ============================================
  // STICKY NAVBAR
  // ============================================

  class StickyNavbar {
    constructor() {
      this.navbar = $('#navbar');
      if (!this.navbar) return;

      this.init();
    }

    init() {
      const handleScroll = debounce(() => {
        if (window.scrollY > 50) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }
      }, 10);

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }
  }

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================

  class ScrollToTop {
    constructor() {
      this.button = $('#scroll-top');
      if (!this.button) return;

      this.init();
    }

    init() {
      const handleScroll = debounce(() => {
        if (window.scrollY > 300) {
          this.button.classList.add('visible');
        } else {
          this.button.classList.remove('visible');
        }
      }, 10);

      window.addEventListener('scroll', handleScroll);
      this.button.addEventListener('click', () => this.scrollToTop());
      handleScroll(); // Initial check
    }

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // ============================================
  // REVEAL ANIMATIONS (Intersection Observer)
  // ============================================

  class RevealAnimations {
    constructor() {
      this.elements = $$('.reveal');
      if (this.elements.length === 0) return;

      this.init();
    }

    init() {
      if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements
        this.elements.forEach(el => el.classList.add('visible'));
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      this.elements.forEach(el => observer.observe(el));
    }
  }

  // ============================================
  // SKILL BARS ANIMATION
  // ============================================

  class SkillBars {
    constructor() {
      this.skills = $$('.skill-item');
      if (this.skills.length === 0) return;

      this.init();
    }

    init() {
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const skill = entry.target;
            const percentage = skill.dataset.skill || 0;
            const progress = skill.querySelector('.skill-progress');
            
            if (progress) {
              progress.style.width = `${percentage}%`;
              skill.classList.add('visible');
            }
            
            observer.unobserve(skill);
          }
        });
      }, {
        threshold: 0.5
      });

      this.skills.forEach(skill => observer.observe(skill));
    }
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================

  class SmoothScroll {
    constructor() {
      this.init();
    }

    init() {
      const links = $$('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href === '#' || href === '#main-content') {
            e.preventDefault();
            const target = document.querySelector(href) || document.querySelector('#main-content');
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        });
      });
    }
  }

  // ============================================
  // ACTIVE NAVIGATION HIGHLIGHTING
  // ============================================

  class ActiveNav {
    constructor() {
      this.init();
    }

    init() {
      const currentPath = window.location.pathname;
      const currentPage = currentPath.split('/').pop() || 'index.html';
      
      const links = $$('.navbar-link');
      links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage || (currentPage === '' && linkPath === 'index.html')) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  }

  // ============================================
  // COPYRIGHT YEAR AUTO-UPDATE
  // ============================================

  class CopyrightYear {
    constructor() {
      this.yearElement = $('#copyright-year');
      if (this.yearElement) {
        this.yearElement.textContent = new Date().getFullYear();
      }
    }
  }

  // ============================================
  // PAGE LOAD ANIMATION
  // ============================================

  class PageLoader {
    constructor() {
      this.init();
    }

    init() {
      // Add fade-in class to body
      document.body.classList.add('fade-in');
      
      // Remove any loading states
      window.addEventListener('load', () => {
        document.body.classList.remove('loading');
      });
    }
  }

  // ============================================
  // REMOVE INLINE HANDLERS
  // ============================================

  function removeInlineHandlers() {
    const buttons = $$('button[onclick]');
    buttons.forEach(button => {
      const onclick = button.getAttribute('onclick');
      if (onclick && onclick.includes('window.location.href')) {
        const url = onclick.match(/href=['"]([^'"]+)['"]/)?.[1];
        if (url) {
          button.removeAttribute('onclick');
          button.addEventListener('click', () => {
            window.location.href = url;
          });
        }
      }
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialize all features
    new ThemeToggle();
    new MobileNav();
    new StickyNavbar();
    new ScrollToTop();
    new RevealAnimations();
    new SkillBars();
    new SmoothScroll();
    new ActiveNav();
    new CopyrightYear();
    new PageLoader();
    removeInlineHandlers();
  }

  // Start initialization
  init();

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reinitialize mobile nav if needed
      if (window.innerWidth > 768) {
        const menu = $('#navbar-menu');
        if (menu) {
          menu.setAttribute('aria-expanded', 'false');
          menu.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    }, 250);
  });

})();

