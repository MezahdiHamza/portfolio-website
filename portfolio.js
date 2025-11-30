/**
 * Portfolio Slider Controller
 * Handles navigation, indicators, and responsive behavior for project cards
 */

class PortfolioSlider {
  constructor() {
    this.cardsWrapper = document.getElementById('cardsWrapper');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.indicators = document.getElementById('indicators');
    this.cards = document.querySelectorAll('.project-card');
    
    this.currentIndex = 0;
    this.totalCards = this.cards.length;
    this.cardsPerView = this.getCardsPerView();
    this.isTransitioning = false;
    
    this.init();
  }

  init() {
    if (this.totalCards === 0) return;
    
    this.createIndicators();
    this.setupEventListeners();
    this.updateSlider();
    this.handleResize();
  }

  getCardsPerView() {
    const width = window.innerWidth;
    if (width >= 1200) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  createIndicators() {
    this.indicators.innerHTML = '';
    const totalSlides = Math.max(1, this.totalCards - this.cardsPerView + 1);
    
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('indicator');
      indicator.setAttribute('role', 'tab');
      indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
      indicator.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      
      if (i === 0) indicator.classList.add('active');
      
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.indicators.appendChild(indicator);
    }
  }

  updateIndicators() {
    const indicatorElements = this.indicators.querySelectorAll('.indicator');
    indicatorElements.forEach((ind, index) => {
      const isActive = index === this.currentIndex;
      ind.classList.toggle('active', isActive);
      ind.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  goToSlide(index) {
    if (this.isTransitioning) return;
    
    const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
    this.currentIndex = Math.max(0, Math.min(index, maxIndex));
    
    this.updateSlider();
    this.updateIndicators();
  }

  updateSlider() {
    if (this.totalCards === 0) return;
    
    const cardWidth = 100 / this.cardsPerView;
    const translateX = -(this.currentIndex * cardWidth);
    
    this.cardsWrapper.style.transform = `translateX(${translateX}%)`;
    
    // Prevent transition during resize
    if (!this.isTransitioning) {
      this.cardsWrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
  }

  nextSlide() {
    if (this.isTransitioning) return;
    
    const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
    if (this.currentIndex < maxIndex) {
      this.goToSlide(this.currentIndex + 1);
    } else {
      this.goToSlide(0);
    }
  }

  prevSlide() {
    if (this.isTransitioning) return;
    
    const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    } else {
      this.goToSlide(maxIndex);
    }
  }

  setupEventListeners() {
    // Button navigation
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.prevBtn.addEventListener('click', () => this.prevSlide());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSlide();
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;

    this.cardsWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartTime = Date.now();
    }, { passive: true });

    this.cardsWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const touchDuration = Date.now() - touchStartTime;
      this.handleSwipe(touchStartX, touchEndX, touchDuration);
    }, { passive: true });

    // Window resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.handleResize(), 250);
    });
  }

  handleSwipe(startX, endX, duration) {
    const swipeThreshold = 50;
    const swipeSpeed = 300; // ms
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold && duration < swipeSpeed) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  handleResize() {
    this.isTransitioning = true;
    this.cardsWrapper.style.transition = 'none';
    
    const newCardsPerView = this.getCardsPerView();
    const maxIndex = Math.max(0, this.totalCards - newCardsPerView);
    
    if (this.currentIndex > maxIndex) {
      this.currentIndex = maxIndex;
    }
    
    this.cardsPerView = newCardsPerView;
    this.createIndicators();
    this.updateSlider();
    this.updateIndicators();
    
    // Re-enable transitions after a brief delay
    setTimeout(() => {
      this.isTransitioning = false;
      this.cardsWrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }, 50);
  }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioSlider();
});
