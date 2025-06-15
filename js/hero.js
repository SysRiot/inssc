document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.hero__track');
    const slides = document.querySelectorAll('.hero__slide');
    let currentIndex = 0;
    let isAnimating = false;

    // Función para mover el carrusel
    const moveToSlide = (index) => {
        if (isAnimating) return;
        isAnimating = true;

        // Actualizar el índice actual
        currentIndex = index;
        if (currentIndex >= slides.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = slides.length - 1;

        // Mover el carrusel
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Resetear la animación después de la transición
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    };

    // Función para el carrusel automático
    const startAutoSlide = () => {
        setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 5000); // Cambiar cada 5 segundos
    };

    // Inicializar el carrusel
    const initCarousel = () => {
        // Clonar el primer y último slide
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);

        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);

        // Re-seleccionar todos los slides, incluyendo clones
        const allSlides = document.querySelectorAll('.hero__slide');

        // Ajustar el ancho del track
        track.style.width = `${allSlides.length * 100}%`;

        // Cada slide ocupa el 100% del ancho
        allSlides.forEach(slide => {
            slide.style.flex = "0 0 100%";
        });

        // Posicionarse en el primer slide real
        currentIndex = 1;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Iniciar carrusel
        startAutoSlide();
    };


    // Inicializar cuando el DOM esté listo
    initCarousel();

    // Manejar el redimensionamiento de la ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 250);
    });
}); 