document.addEventListener('DOMContentLoaded', function() {
  const cardsWrapper = document.getElementById('cardsWrapper');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.getElementById('indicators');
  const cards = document.querySelectorAll('.project-card');
  
  let currentIndex = 0;
  const totalCards = cards.length;
  const cardsPerView = getCardsPerView();

  // Create indicators
  function createIndicators() {
    indicators.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
      const indicator = document.createElement('span');
      indicator.classList.add('indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(i));
      indicators.appendChild(indicator);
    }
  }

  // Get number of cards per view based on screen size
  function getCardsPerView() {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Update indicators
  function updateIndicators() {
    const indicatorElements = document.querySelectorAll('.indicator');
    indicatorElements.forEach((ind, index) => {
      if (index === currentIndex) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalCards - cardsPerView;
    } else if (index > totalCards - cardsPerView) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    const translateX = -(currentIndex * (100 / cardsPerView));
    cardsWrapper.style.transform = `translateX(${translateX}%)`;
    updateIndicators();
  }

  // Next slide
  function nextSlide() {
    if (currentIndex < totalCards - cardsPerView) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  }

  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(totalCards - cardsPerView);
    }
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  cardsWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  cardsWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newCardsPerView = getCardsPerView();
      if (currentIndex > totalCards - newCardsPerView) {
        currentIndex = Math.max(0, totalCards - newCardsPerView);
      }
      goToSlide(currentIndex);
    }, 250);
  });

  // Auto-slide (optional - can be enabled)
  // let autoSlideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto-slide on hover
  // cardsWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  // cardsWrapper.addEventListener('mouseleave', () => {
  //   autoSlideInterval = setInterval(nextSlide, 5000);
  // });

  // Initialize
  createIndicators();
  goToSlide(0);
});

