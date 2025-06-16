// js/cleanUrls.js
document.addEventListener("DOMContentLoaded", function () {
    // Cambiar todos los enlaces que terminen en .html para quitarlo
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href.endsWith(".html")) {
            link.setAttribute("href", href.replace(".html", ""));
        }
    });

    // Si el usuario entra a /pagina sin extensión, redirige a /pagina.html
    const path = window.location.pathname;
    if (!path.endsWith("/") && !path.endsWith(".html")) {
        fetch(path + ".html")
            .then(res => {
                if (res.ok) {
                    window.location.replace(path + ".html");
                }
            });
    }
});
