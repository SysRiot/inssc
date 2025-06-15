// Elementos del DOM
const videoCards = document.querySelectorAll('.beca__card');

// Función para manejar la reproducción de video
const handleVideoPlayback = (card) => {
    const video = card.querySelector('video');
    
    // Reproducir video al hacer hover
    card.addEventListener('mouseenter', () => {
        video.play().catch(error => {
            console.log('Error al reproducir el video:', error);
        });
    });

    // Pausar video al quitar el hover
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });

    // Manejar clic en el video
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play().catch(error => {
                console.log('Error al reproducir el video:', error);
            });
        } else {
            video.pause();
        }
    });
};

// Inicializar funcionalidad de videos
const initVideos = () => {
    videoCards.forEach(card => {
        handleVideoPlayback(card);
    });
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const becaCards = document.querySelectorAll('.beca__card');

    const handleBecaCard = (card) => {
        const gif = card.querySelector('.beca__gif');
        const audio = card.querySelector('.beca__audio');
        let isPlaying = false;

        // Función para reproducir el audio
        const play = () => {
            if (!isPlaying) {
                // Reproducir audio
                audio.currentTime = 0;
                audio.play().catch(error => {
                    console.log('Error al reproducir el audio:', error);
                });
                isPlaying = true;
            }
        };

        // Función para pausar el audio
        const pause = () => {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
            }
        };

        // Evento cuando el mouse entra en la tarjeta
        card.addEventListener('mouseenter', play);

        // Evento cuando el mouse sale de la tarjeta
        card.addEventListener('mouseleave', pause);

        // Evento cuando se hace clic en la tarjeta
        card.addEventListener('click', () => {
            if (isPlaying) {
                pause();
            } else {
                play();
            }
        });
    };

    // Inicializar todas las tarjetas de becas
    becaCards.forEach(handleBecaCard);
}); 