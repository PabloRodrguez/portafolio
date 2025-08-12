document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".portfolio__menu");
  const options = [...document.querySelectorAll(".portfolio__option")];
  const items = [...document.querySelectorAll(".gallery__item")];

  // Util: obtiene la(s) categoría(s) del item
  // Soporta: <span class="gallery__category">Video</span>
  // Opcional: <figure data-category="video, web">
  const getItemCategories = (item) => {
    const data = item.dataset.category;
    if (data) {
      return data
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    }
    const tag = item.querySelector(".gallery__category");
    return tag ? [tag.textContent.trim().toLowerCase()] : [];
  };

  const showItem = (el) => {
    el.classList.remove("is-hidden");
    // Si quieres forzar reflow para animación: void el.offsetWidth;
  };

  const hideItem = (el) => {
    el.classList.add("is-hidden");
  };

  const setActive = (targetLi) => {
    options.forEach((li) => li.classList.remove("portfolio__option--active"));
    targetLi.classList.add("portfolio__option--active");
  };

  const filter = (filterValue) => {
    const f = filterValue.trim().toLowerCase();
    items.forEach((item) => {
      const cats = getItemCategories(item);
      const match = f === "todos" || cats.includes(f);
      match ? showItem(item) : hideItem(item);
    });
  };

  // Delegación de eventos en el menú
  menu?.addEventListener("click", (e) => {
    const link = e.target.closest(".portfolio__link");
    if (!link) return;
    e.preventDefault();

    // El <li> contenedor (para la clase --active)
    const li = link.closest(".portfolio__option");
    if (li) setActive(li);

    // Lee el filtro desde data-filter o desde el texto del link
    const filterValue = link.dataset.filter ?? link.textContent;
    filter(filterValue);
  });

  // Filtro inicial (opcional): deja "Todos"
  filter("Todos");
});
