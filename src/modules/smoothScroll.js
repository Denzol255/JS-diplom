const smoothScroll = () => {
  const onMenuLinkClick = (target, e) => {
    if (target.dataset.goto && document.querySelector(target.dataset.goto)) {
      const gotoBlock = document.querySelector(target.dataset.goto),
        gotoBlockValue =
          gotoBlock.getBoundingClientRect().top +
          pageYOffset -
          document.querySelector(".header-wrapper").offsetHeight;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  };

  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".menu-link[data-goto]")) {
      onMenuLinkClick(target, event);
    }
  });
};

export default smoothScroll;
