const toggleModal = () => {
  const callbackBtn = document.querySelector(".callback-btn"),
    modalOverlay = document.querySelector(".modal-overlay"),
    modalCallback = document.querySelector(".modal-callback");
  function animate({ timing, draw, duration }) {
    const start = performance.now();

    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }

      const progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }
  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target.matches(".callback-btn") ||
      target.matches(".button-services") ||
      target.matches(".fancyboxModal")
    ) {
      if (window.innerWidth > 768) {
        modalOverlay.style.display = "block";
        modalCallback.style.display = "block";
        animate({
          duration: 1000,
          timing(timeFraction) {
            return Math.pow(timeFraction, 3);
          },
          draw(progress) {
            modalCallback.style.left =
              progress * (document.documentElement.clientWidth / 2) + "px";
          },
        });
        document.body.classList.add("scroll--lock");
      } else {
        modalOverlay.style.display = "block";
        modalCallback.style.display = "block";
      }
    } else if (
      target.closest(".modal-close") ||
      target.matches(".modal-overlay")
    ) {
      modalOverlay.style.display = "none";
      modalCallback.setAttribute("style", "display:none");
      document.body.classList.remove("scroll--lock");
    }
  });
};

export default toggleModal;
