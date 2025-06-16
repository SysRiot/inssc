const canvas = document.getElementById('certCanvas');
const ctx = canvas.getContext('2d');
const plantilla = new Image();
plantilla.src = '/cosas/imagenes/certificadooficial.png';

plantilla.onload = () => {
  canvas.width = plantilla.naturalWidth;
  canvas.height = plantilla.naturalHeight;
  ctx.drawImage(plantilla, 0, 0);
};

function generarCertificado() {
  const nombre = document.getElementById('nombre').value.trim();
  const actividad = document.getElementById('actividad').value.trim();

  if (!nombre || !actividad) {
    alert("Por favor, completa ambos campos.");
    return;
  }

  // Cargar la fuente antes de dibujar
  document.fonts.load('10pt "Alex Brush"').then(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(plantilla, 0, 0);

    const xTexto1 = (1667 + 336) / 2;
    const yTexto1 = (660 + 700) / 2;
    const anchoMaxTexto1 = 1667 - 336;

    const xTexto2 = (228 + 1819) / 2;
    const yTexto2 = (935 + 975) / 2;
    const anchoMaxTexto2 = 1819 - 228;

    ajustarYMostrarTexto(nombre, "Alex Brush", 95, 20, anchoMaxTexto1, xTexto1, yTexto1);
    ajustarYMostrarTexto(actividad, "Alex Brush", 150, 20, anchoMaxTexto2, xTexto2, yTexto2);

    // Descargar automáticamente el certificado
    const enlace = document.createElement('a');
    enlace.href = canvas.toDataURL('image/png');
    enlace.download = `Certificado_${nombre.replace(/\s+/g, '_')}.png`;
    enlace.click();
  });
}

function ajustarYMostrarTexto(texto, fuente, tamañoInicial, tamañoMinimo, anchoMaximo, x, y) {
  let fontSize = tamañoInicial;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000';

  do {
    ctx.font = `${fontSize}px "${fuente}"`;
    const medida = ctx.measureText(texto);
    if (medida.width <= anchoMaximo || fontSize <= tamañoMinimo) break;
    fontSize -= 2;
  } while (true);

  ctx.fillText(texto, x, y);
}
