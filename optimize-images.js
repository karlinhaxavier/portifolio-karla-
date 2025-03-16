const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'img');
const outputDir = path.join(__dirname, 'img', 'optimized');

// Criar diretório de saída se não existir
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Configurações de otimização
const config = {
    jpeg: { quality: 80 },
    png: { quality: 80 },
    webp: { quality: 80 }
};

// Processar todas as imagens no diretório
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Erro ao ler o diretório:', err);
        return;
    }

    files.forEach(file => {
        const inputPath = path.join(inputDir, file);
        const ext = path.extname(file).toLowerCase();

        // Pular se não for uma imagem
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
            return;
        }

        // Otimizar e converter para WebP
        const filename = path.basename(file, ext);
        const outputPathWebp = path.join(outputDir, `${filename}.webp`);
        const outputPathOriginal = path.join(outputDir, file);

        // Processar para WebP
        sharp(inputPath)
            .webp(config.webp)
            .toFile(outputPathWebp)
            .then(() => console.log(`Convertido para WebP: ${outputPathWebp}`))
            .catch(err => console.error(`Erro ao converter ${file} para WebP:`, err));

        // Otimizar formato original
        sharp(inputPath)
            .jpeg(config.jpeg)
            .png(config.png)
            .toFile(outputPathOriginal)
            .then(() => console.log(`Otimizado: ${outputPathOriginal}`))
            .catch(err => console.error(`Erro ao otimizar ${file}:`, err));
    });
});
