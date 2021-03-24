/* eslint-disable arrow-body-style */
const sendForm = () => {
  const successMessage = "Спасибо, наш менеджер с вами скоро свяжется!",
    errorMessage = "Что-то пошло не так",
    loadMessage = "Загрузка...";

  const statusMessage = document.createElement("div");

  const postData = (body) => {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(body),
    });
  };

  const checkFields = (target, field, reg, warning, warnText) => {
    let flag = true;
    if (!reg.test(field.value)) {
      target.appendChild(warning);
      warning.style.cssText = "font-size: 20px; color: red";
      warning.textContent = warnText;
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      return true;
    } else {
      return false;
    }
  };

  document.addEventListener("submit", (event) => {
    const target = event.target,
      fieldName = document.querySelector("[name = 'fio']"),
      fieldPhone = document.querySelector("[name = 'tel']"),
      warnForPhone = `Полe "Телефон" может начинаться с '+' и должно содержать от 7 до 13 символов`,
      warnForName = `Полe "Ваше имя" должно содержать минимум 2 символа`;

    if (target.matches("form")) {
      event.preventDefault();
      const checkPhone = checkFields(
        target,
        fieldPhone,
        /\+?\d{7,13}/g,
        statusMessage,
        warnForPhone
      );
      const checkName = checkFields(
        target,
        fieldName,
        /.{2,}/g,
        statusMessage,
        warnForName
      );
      if (checkPhone && checkName) {
        statusMessage.style.cssText = "font-size: 20px; color: green";
        target.appendChild(statusMessage);
        const formData = new FormData(target);
        statusMessage.textContent = loadMessage;
        const body = {};

        formData.forEach((val, key) => {
          body[key] = val;
        });

        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("status network is not 200");
            }
            statusMessage.textContent = successMessage;
            setTimeout(() => {
              statusMessage.remove();
            }, 2000);
            setTimeout(() => {
              document.querySelector(".modal-overlay").style.display = "none";
              document
                .querySelector(".modal-callback")
                .setAttribute("style", "display:none");
              document.querySelector("body").classList.remove("scroll--lock");
            }, 3000);
            target.reset();
          })
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
      }
    }
  });
};

export default sendForm;
