const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const qr = require('qrcode');

// Definir as dimensões da imagem
const canvasWidth = 400;
const canvasHeight = 400;

// Criar um novo canvas
const canvas = createCanvas(canvasWidth, canvasHeight);
const context = canvas.getContext('2d');

// Preencher o canvas com uma cor branca
context.fillStyle = 'white';
context.fillRect(0, 0, canvasWidth, canvasHeight);

// Adicionar um ícone no canto esquerdo
loadImage('unipro.png').then((icon) => {
  const iconSize = 40; // Tamanho do ícone
  context.drawImage(icon, 20, 20, iconSize, iconSize);

  // Adicionar um QR code no centro
  qr.toDataURL('https://seusite.com', (err, url) => {
    if (err) throw err;
  
    loadImage(url).then((qrCode) => {
      const qrCodeSize = 120; // Tamanho do QR code
      const qrCodeX = (canvasWidth - qrCodeSize) / 2;
      const qrCodeY = (canvasHeight - qrCodeSize) / 2;
      context.drawImage(qrCode, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
  
      // Adicionar a imagem de assinatura no canto direito
      loadImage('assinatura.jpg').then((assinatura) => {
        const assinaturaWidth = 120;
        const assinaturaHeight = 100;
        const assinaturaX = canvasWidth - assinaturaWidth - 20; // Canto direito
        const assinaturaY = (canvasHeight - assinaturaHeight) / 2;
        context.drawImage(assinatura, assinaturaX, assinaturaY, assinaturaWidth, assinaturaHeight);
  
        // Salvar o canvas como uma imagem
        const outputFile = 'output.png';
        const stream = canvas.createPNGStream();
        const out = fs.createWriteStream(outputFile);
        stream.pipe(out);
        out.on('finish', () => console.log('Imagem gerada com sucesso!'));
  
        console.log(`Gerando imagem ${canvasWidth}x${canvasHeight} com ícone, QR code e assinatura para ${outputFile}`);
      });
    });
  });
});
