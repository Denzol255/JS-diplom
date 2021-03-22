const slider = () => {
  const slide = document.querySelectorAll(".item"),
    table = document.querySelectorAll(".table"),
    slider = document.querySelector(".top-slider");
  let currentSlide = 0,
    interval,
    dot;

  const createDots = () => {
    const dots = document.createElement("ul");
    dots.classList.add("slick-dots");
    slider.append(dots);
    for (let i = 0; i < slide.length; i++) {
      dot = document.createElement("li");
      dot.classList.add("dot");
      if (i === 0) {
        dot.classList.add("slick-active");
      }
      document.querySelector(".slick-dots").append(dot);
    }
  };
  createDots();

  setInterval(() => {
    table[currentSlide].classList.add("active");
  }, 0);

  const allDots = document.querySelectorAll(".dot");

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    slide[currentSlide].style.display = "none";
    prevSlide(slide, currentSlide, "slide-active");
    prevSlide(table, currentSlide, "active");
    prevSlide(allDots, currentSlide, "slick-active");
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    slide[currentSlide].style.display = "block";
    nextSlide(slide, currentSlide, "slide-active");
    nextSlide(table, currentSlide, "active");
    nextSlide(allDots, currentSlide, "slick-active");
  };

  const startSlide = () => {
    interval = setInterval(autoPlaySlide, 3000);
  };

  startSlide();

  const stopSlide = () => {
    clearInterval(interval);
  };

  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.matches(".dot")) {
      return;
    }

    slide[currentSlide].style.display = "none";
    prevSlide(slide, currentSlide, "slide-active");
    prevSlide(table, currentSlide, "active");
    prevSlide(allDots, currentSlide, "slick-active");

    if (target.matches(".top-slider .dot")) {
      allDots.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }
    slide[currentSlide].style.display = "block";
    nextSlide(slide, currentSlide, "slide-active");
    nextSlide(table, currentSlide, "active");
    nextSlide(allDots, currentSlide, "slick-active");
  });

  document.body.addEventListener("mouseover", (event) => {
    if (event.target.matches(".top-slider .dot")) {
      stopSlide();
    }
  });

  document.body.addEventListener("mouseout", (event) => {
    if (event.target.matches(".top-slider .dot")) {
      startSlide();
    }
  });
};
export default slider;
