document.querySelector(".user-info__btn").addEventListener("click", function(e) {
    e.preventDefault(); // evita que recargue la página
    const fileUrl = "assets/docs/cv-pablo-rodriguez.pdf"; // ruta a tu archivo
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "CV-Pablo-Rodriguez.pdf"; // nombre que tendrá al descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

