// ./assets/js/contact.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form.contact__form[name="contact"]');
  if (!form) return;

  const nameEl = document.getElementById("name");
  const mailEl = document.getElementById("mail");
  const subjectEl = document.getElementById("subject");
  const msgEl = document.getElementById("mensaje");
  const submitBtn = form.querySelector(".form__button");

  const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const setLoading = (loading) => {
    submitBtn.disabled = loading;
    submitBtn.dataset.loading = loading ? "1" : "0";
    submitBtn.value = loading ? "Enviando..." : "Enviar Mensaje";
  };

  const showToast = (text, type = "success") => {
    let toast = document.createElement("div");
    toast.className = `contact__toast contact__toast--${type}`;
    toast.textContent = text;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("is-show"));
    setTimeout(() => {
      toast.classList.remove("is-show");
      setTimeout(() => toast.remove(), 300);
    }, 2600);
  };

  const setFieldState = (el, ok, msg = "") => {
    el.classList.toggle("is-error", !ok);
    el.classList.toggle("is-valid", ok);
    let hint = el.parentElement.querySelector(".form__hint");
    if (!hint) {
      hint = document.createElement("small");
      hint.className = "form__hint";
      el.parentElement.appendChild(hint);
    }
    hint.textContent = ok ? "" : msg;
  };

  const validate = () => {
    const vName = nameEl.value.trim().length >= 2;
    setFieldState(nameEl, vName, "Ingresa tu nombre.");

    const vMail = emailRE.test(mailEl.value.trim());
    setFieldState(mailEl, vMail, "Ingresa un email válido.");

    const vSubject = subjectEl.value.trim().length >= 3;
    setFieldState(subjectEl, vSubject, "Indica un asunto.");

    const vMsg = msgEl.value.trim().length >= 10;
    setFieldState(msgEl, vMsg, "Escribe al menos 10 caracteres.");

    return vName && vMail && vSubject && vMsg;
  };

  form.addEventListener("input", (e) => {
    if (e.target.matches(".form__input, .form__input--textarea")) validate();
  }, true);

  // helper para form-urlencoded
  const encode = (data) =>
    Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Revisa los campos.", "error");
      return;
    }

    // construimos el payload para Netlify
    const payload = {
      "form-name": form.getAttribute("name"),
      name: nameEl.value.trim(),
      email: mailEl.value.trim(),
      subject: subjectEl.value.trim(),
      message: msgEl.value.trim(),
      // añadimos un campo 'mail_subject' que verás en el correo:
      mail_subject: `Correo Portafolio ${subjectEl.value.trim()}`
    };

    setLoading(true);
    try {
      // Envío AJAX a Netlify (captura sin recargar)
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload)
      });

      if (res.ok) {
        form.reset();
        form.querySelectorAll(".is-valid,.is-error,.form__hint").forEach(el => {
          el.classList?.remove("is-valid", "is-error");
          if (el.classList?.contains("form__hint")) el.remove();
        });
        showToast("¡Mensaje enviado! Te responderé pronto.");
      } else {
        throw new Error("Respuesta no OK");
      }
    } catch (err) {
      console.error(err);
      showToast("No se pudo enviar. Intenta nuevamente.", "error");
    } finally {
      setLoading(false);
    }
  });
});
