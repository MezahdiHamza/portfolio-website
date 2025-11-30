/**
 * Portfolio Filtering Functionality
 */

(function() {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  class PortfolioFilter {
    constructor() {
      this.filters = $$('.filter-btn');
      this.projects = $$('.project-card');
      
      if (this.filters.length === 0 || this.projects.length === 0) return;
      
      this.init();
    }

    init() {
      this.filters.forEach(filter => {
        filter.addEventListener('click', (e) => {
          e.preventDefault();
          const category = filter.dataset.filter;
          this.filterProjects(category);
          this.updateActiveFilter(filter);
        });
      });
    }

    filterProjects(category) {
      this.projects.forEach(project => {
        const projectCategories = project.dataset.category.split(' ');
        
        if (category === 'all' || projectCategories.includes(category)) {
          project.style.display = '';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
          }, 10);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 300);
        }
      });
    }

    updateActiveFilter(activeFilter) {
      this.filters.forEach(filter => {
        filter.classList.remove('active');
      });
      activeFilter.classList.add('active');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfolioFilter());
  } else {
    new PortfolioFilter();
  }

})();

