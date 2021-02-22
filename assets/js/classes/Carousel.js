import { qs, qsAll } from '../dom-helpers';

class Carousel {
  constructor() {
    if (!qs('.carousel')) return;

    this.carousel = qs('.carousel');
    this.slides = qsAll('.events-carousel__slide', this.carousel);
    this.prevButton = qs('.events-carousel__arrow--prev');
    this.nextButton = qs('.events-carousel__arrow--next');

    this._run();
  }

  _run() {
    this.slides.forEach((slide, i) => {
      slide.dataset.index = i;
    });

    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());

    document.addEventListener('keyup', (e) => {
      if (document.activeElement.classList.contains('events-carousel')) {
        this._handleArrows(e.key);
      }
    });
  }

  prev() {
    const currentSlide = this.getActiveSlide();
    const currentIndex = this.getCurrentSlideIndex(currentSlide);

    if (this.slides[currentIndex - 1]) {
      this.setActiveSlide(this.slides[currentIndex - 1]);
    } else {
      this.setActiveSlide(this.slides[this.slides.length - 1]);
    }
  }

  next() {
    const currentSlide = this.getActiveSlide();
    const currentIndex = this.getCurrentSlideIndex(currentSlide);

    if (this.slides[currentIndex + 1]) {
      this.setActiveSlide(this.slides[currentIndex + 1]);
    } else {
      this.setActiveSlide(this.slides[0]);
    }
  }

  getActiveSlide() {
    return qs('.events-carousel__slide:not(.hidden)', this.carousel);
  }

  getCurrentSlideIndex(slide) {
    return parseInt(slide.dataset.index, 10);
  }

  setActiveSlide(newActiveSlide) {
    this.slides.forEach((slide) => {
      slide.classList.add('hidden');
      slide.removeAttribute('aria-current');
    });

    newActiveSlide.classList.remove('hidden');
    newActiveSlide.setAttribute('aria-current', 'true');
  }

  _handleArrows(key) {
    if (key === 'ArrowLeft') {
      this.prev();
    }

    if (key === 'ArrowRight') {
      this.next();
    }
  }
}

export default Carousel;
