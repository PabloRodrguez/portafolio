const posts = [
    {
      title: "¿Cómo crear un sitio web moderno y eficiente?",
      date: "2025-08-09",
      category: "Desarrollo",
      image: "./assets/img/articulo-1.jpg",
      url: "./entries/sitiowebmoderno.html"
    },
    {
      title: "Guía rápida para optimizar performance en la web",
      date: "2025-07-15",
      category: "Desarrollo",
      image: "./assets/img/articulo-2.jpg",
      url: "./entries/performance-rapida.html"
    },
    {
      title: "Accesibilidad: pequeñas mejoras, gran impacto",
      date: "2025-06-30",
      category: "Desarrollo",
      image: "./assets/img/articulo-3.jpg",
      url: "./entries/accesibilidad-mejoras.html"
    },
    {
      title: "SEO técnico para sitios estáticos",
      date: "2025-05-22",
      category: "Desarrollo",
      image: "./assets/img/articulo-4.jpg",
      url: "./entries/seo-tecnico.html"
    }
  ];

  const $list = document.querySelector("#blogArticles");
  const $tpl = document.querySelector("#post-card");

  // Ordena por fecha descendente (opcional)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const fmt = (iso) => {
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  for (const post of posts) {
    const node = document.importNode($tpl.content, true);

    node.querySelector('[data-ref="category"]').textContent = post.category;
    node.querySelectorAll('[data-ref="link"]').forEach(a => {
      a.href = post.url;
      a.setAttribute('aria-label', post.title);
    });

    const img = node.querySelector('[data-ref="image"]');
    img.src = post.image;
    img.alt = `Imagen blog: ${post.title}`;

    const time = node.querySelector('[data-ref="time"]');
    time.dateTime = post.date;           // ISO, p. ej. 2025-08-09
    time.textContent = fmt(post.date);   // Mostrado, p. ej. 09-08-2025

    node.querySelector('[data-ref="title"]').textContent = post.title;

    $list.appendChild(node);
  }