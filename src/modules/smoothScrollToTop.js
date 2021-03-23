const smoothScrollToTop = () => {
  const anchor = document.querySelector("a[href='#top']");
  setInterval(() => {
    if (
      document.querySelector(".services-section").getBoundingClientRect().top -
        document.querySelector(".header-wrapper").offsetHeight <=
      0
    ) {
      anchor.style.display = "inline";
    } else {
      anchor.style.display = "none";
    }
  }, 0);

  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};
export default smoothScrollToTop;
