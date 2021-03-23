const servicesCarousel = () => {
  class SliderCarousel {
    constructor({
      main,
      wrap,
      slides,
      next,
      prev,
      infinity = false,
      position = 0,
      slidesToShow = 3,
      responsive = [],
    }) {
      if (!main && !wrap) {
        console.warn("slider-carousel: Необходимо 2 свойства, 'main' и 'wrap'");
      }
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelectorAll(slides);
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.options = {
        position,
        infinity,
        widthSlide: Math.floor(100 / this.slidesToShow),
      };
      this.responsive = responsive;
    }
    init() {
      this.addGloClass();
      this.addStyle();
      if (this.prev && this.next) {
        this.controlSlider();
      } else {
        this.addArrow();
        this.controlSlider();
      }
      if (this.responsive) {
        this.responseInit();
      }
    }

    addGloClass() {
      this.main.classList.add("glo-slider");
      this.wrap.classList.add("glo-slider__wrap");
      for (const item of this.slides) {
        item.classList.add("glo-slider__item");
      }
    }

    addStyle() {
      let style = document.getElementById("sliderCarousel-style");
      if (!style) {
        style = document.createElement("style");
        style.id = "sliderCarousel-style";
      }
      style.textContent = `
			.glo-slider{
				overflow: hidden;
			}
			.glo-slider__wrap{
				display:flex;
				transition: transform 0.5s;
				will-change: transform;
			}
			.glo-slider__item{
				flex: 0 0 ${this.options.widthSlide}%;
				margin: auto 0;
			}`;

      document.head.append(style);
    }

    controlSlider() {
      this.prev.addEventListener("click", this.prevSlider.bind(this));
      this.next.addEventListener("click", this.nextSlider.bind(this));
    }

    prevSlider() {
      if (this.options.infinity || this.options.position > 0) {
        --this.options.position;
        if (this.options.position < 0) {
          this.options.position = this.slides.length - this.slidesToShow;
        }
        this.wrap.style.transform = `translateX(-${
          this.options.position * this.options.widthSlide
        }%)`;
      }
    }

    nextSlider() {
      if (
        this.options.infinity ||
        this.options.position < this.slides.length - this.slidesToShow
      ) {
        ++this.options.position;
        if (this.options.position > this.slides.length - this.slidesToShow) {
          this.options.position = 0;
        }
        this.wrap.style.transform = `translateX(-${
          this.options.position * this.options.widthSlide
        }%)`;
      }
    }

    addArrow() {
      this.arrowBlock = document.createElement("div");
      this.prev = document.createElement("button");
      this.next = document.createElement("button");

      this.arrowBlock.className = "glo-slider__arrow-block";
      this.prev.className = "glo-slider__prev";
      this.next.className = "glo-slider__next";

      this.main.append(this.arrowBlock);
      this.arrowBlock.append(this.prev);
      this.arrowBlock.append(this.next);

      const style = document.createElement("style");
      style.textContent = `
			.glo-slider__arrow-block{
				display: flex;
				justify-content: center;
			}
			.glo-slider__prev,
			.glo-slider__next{
				margin: 0 10px;
				border: 20px solid transparent;
				background-color: transparent;
			}
			.glo-slider__prev{
				border-right-color: #19b5fe;	
			}
			.glo-slider__next{
				border-left-color: #19b5fe;
			}
			.glo-slider__prev:hover,
			.glo-slider__next:hover,
			.glo-slider__prev:focus,
			.glo-slider__next:focus{
				outline: none,
				background-color: transparent;
			}`;

      document.head.append(style);
    }

    responseInit() {
      const slidesToShowDefault = this.slidesToShow;
      const allResponse = this.responsive.map((item) => item.breakpoint);
      const maxResponse = Math.max(...allResponse);
      const changeValueSlides = () => {
        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
        this.addStyle();
      };
      const checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;
        if (widthWindow < maxResponse) {
          for (let i = 0; i < allResponse.length; i++) {
            if (widthWindow < allResponse[i]) {
              this.slidesToShow = this.responsive[i].slidesToShow;
              changeValueSlides();
            }
          }
        } else {
          this.slidesToShow = slidesToShowDefault;
          changeValueSlides();
        }
      };

      checkResponse();

      window.addEventListener("resize", checkResponse);
    }
  }

  const carousel = new SliderCarousel({
    main: ".services-elements",
    wrap: ".services-carousel",
    slides: ".col-sm-6.col-md-4",
    prev: ".arrow-left",
    next: ".arrow-right",
    slidesToShow: 3,
    infinity: true,
    responsive: [
      {
        breakpoint: 1024,
        slidesToShow: 3,
      },
      {
        breakpoint: 768,
        slidesToShow: 2,
      },
      {
        breakpoint: 586,
        slidesToShow: 1,
      },
    ],
  });
  carousel.init();
};

export default servicesCarousel;
