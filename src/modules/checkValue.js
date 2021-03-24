const checkValue = () => {
  const replaceReg = (item, reg) => {
    item.value = item.value.replace(reg, "").trim();
  };

  document.body.addEventListener(
    "blur",
    (event) => {
      const target = event.target;
      if (target.matches("[name = 'fio']")) {
        replaceReg(target, /[^а-яё]/gi);
      } else if (target.matches("[name = 'tel']")) {
        replaceReg(target, /[^\d+]/gi);
      }
    },
    true
  );
};
export default checkValue;
