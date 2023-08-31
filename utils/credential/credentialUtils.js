const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const qr = require('qrcode');

registerFont('fonts/Poppins-Black.ttf', { family: 'Poppins', weight: '900' });
registerFont('fonts/Poppins-Italic.ttf', { family: 'Poppins', weight: '600' });
registerFont('fonts/Poppins-Regular.ttf', { family: 'Poppins', weight: '900' });

// Definir as dimensões da imagem
const canvasWidth = 1440;
const canvasHeight = 2362;

// Criar um novo canvas
const canvas = createCanvas(canvasWidth, canvasHeight);
const context = canvas.getContext('2d');

// Preencher o canvas com uma cor branca
context.fillStyle = 'white';
context.fillRect(0, 0, canvasWidth, canvasHeight);

// Adicionar uma área preta
const blackY = 2068;
const blackHeight = 294;
context.fillStyle = '#F2B705';
context.fillRect(0, blackY, canvasWidth, blackHeight);

// Carregar a imagem JOGOSUNI_2023.png
loadImage('JOGOSUNI_2023.png').then((image) => {
    // Adicionar a imagem nas coordenadas especificadas
    const imageX = 808;
    const imageY = 74;
    const imageWidth = 492;
    const imageHeight = 723;
    context.drawImage(image, imageX, imageY, imageWidth, imageHeight);

    context.fillStyle = '#000000';
    context.font = '900 90px Poppins';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText('JOÃO DE', 864, 864, 428, 180);

    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.font = '600 italic 90px Poppins';
    context.fillText('ALENCAR', 864, 964, 428, 180);

    loadImage('assinatura.jpg').then((assinatura) => {
        // Adicionar a imagem de assinatura
        context.drawImage(assinatura, 1021, 1503, 297, 249);

        context.fillStyle = '#F26241';
        context.font = '900 300px Poppins';
        context.fillText('DR', 842, 950, 424, 450);

        loadImage('outra_imagem.png').then((image) => {
            const imageWidth = 683;
            const imageHeight = 846;
            const imageX = 89;
            const imageY = 441;
            const borderRadius = 8;

            // Arredondar as bordas da imagem
            context.save();
            context.beginPath();
            context.moveTo(imageX + borderRadius, imageY);
            context.lineTo(imageX + imageWidth - borderRadius, imageY);
            context.quadraticCurveTo(imageX + imageWidth, imageY, imageX + imageWidth, imageY + borderRadius);
            context.lineTo(imageX + imageWidth, imageY + imageHeight - borderRadius);
            context.quadraticCurveTo(imageX + imageWidth, imageY + imageHeight, imageX + imageWidth - borderRadius, imageY + imageHeight);
            context.lineTo(imageX + borderRadius, imageY + imageHeight);
            context.quadraticCurveTo(imageX, imageY + imageHeight, imageX, imageY + imageHeight - borderRadius);
            context.lineTo(imageX, imageY + borderRadius);
            context.quadraticCurveTo(imageX, imageY, imageX + borderRadius, imageY);
            context.closePath();
            context.clip();
            context.drawImage(image, imageX, imageY, imageWidth, imageHeight);
            context.restore();

            // Carregar a terceira imagem
            loadImage('outra_imagem2.png').then((thirdImage) => {
                // Adicionar a terceira imagem nas coordenadas especificadas
                const thirdImageX = 480;
                const thirdImageY = 1378;
                const thirdImageWidth = 480;
                const thirdImageHeight = 493;
                context.drawImage(thirdImage, thirdImageX, thirdImageY, thirdImageWidth, thirdImageHeight);

                // Adicionar um texto com a fonte Poppins Black
                const textX = 120;
                const textY = 1400;
                context.fillStyle = 'black';
                context.font = '900 300px "Poppins"';
                context.textAlign = 'left';
                context.textBaseline = 'top';
                context.fillText('M', textX, textY, 286);

                qr.toDataURL('https://seusite.com', (err, url) => {
                    if (err) throw err;

                    loadImage(url).then((qrCode) => {
                        const qrCodeSize = 300; // Tamanho do QR code
                        context.drawImage(qrCode, 50, 50, qrCodeSize, qrCodeSize);

                        // Salvar o canvas como uma imagem
                        const outputFile = 'output.png';
                        const stream = canvas.createPNGStream();
                        const out = fs.createWriteStream(outputFile);
                        stream.pipe(out);
                        out.on('finish', () => console.log('Imagem gerada com sucesso!'));

                        console.log(`Gerando imagem ${canvasWidth}x${canvasHeight} com áreas preta, três imagens e um texto para ${outputFile}`);
                    });
                });
            });
        });
    });
})
