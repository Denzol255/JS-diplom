const accordeon = () => {
  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".element .title")) {
      if (target.parentElement.classList.contains("active")) {
        target.parentElement.classList.remove("active");
        target.nextElementSibling.style.display = "none";
      } else {
        document.querySelectorAll(".accordeon .element").forEach((elem) => {
          elem.classList.remove("active");
          elem.children[1].style.display = "none";
        });
        target.parentElement.classList.add("active");
        target.nextElementSibling.style.display = "block";
      }
    }
  });
};
export default accordeon;
