import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

async function convertImages() {
    console.log("🎨 Starting Intelligent Image Optimization (WebP)...");

    if (!fs.existsSync(publicDir)) {
        console.error("❌ Public directory not found!");
        return;
    }

    const files = fs.readdirSync(publicDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    for (const file of imageFiles) {
        const inputPath = path.join(publicDir, file);
        const outputFilename = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const outputPath = path.join(publicDir, outputFilename);

        const inputStats = fs.statSync(inputPath);

        try {
            await sharp(inputPath)
                .webp({ quality: 80, effort: 6 }) // Best effort compression
                .toFile(outputPath);

            const outputStats = fs.statSync(outputPath);
            const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(2);

            console.log(`✅ Converted ${file} -> ${outputFilename} | Savings: ${savings}% (${(inputStats.size / 1024).toFixed(1)}k -> ${(outputStats.size / 1024).toFixed(1)}k)`);

        } catch (err) {
            console.error(`❌ Error converting ${file}:`, err);
        }
    }
    console.log("✨ All images optimized for Google-Grade Speed.");
}

convertImages();
