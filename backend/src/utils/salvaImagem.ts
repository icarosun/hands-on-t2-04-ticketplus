import fs from 'fs';
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

export function salvaImagem (caminhoPasta: string, imagemBase64: string): string {
    if (!fs.existsSync(caminhoPasta)) {
        fs.mkdirSync(caminhoPasta);
    }
    const buffer = Buffer.from(imagemBase64, 'base64')
    let nomeImagem = ''
    if (caminhoPasta.includes('events')) nomeImagem = 'cartaz.jpg'
    else nomeImagem = 'avatar.jpg'
    fs.writeFileSync(`${caminhoPasta}/${nomeImagem}`, buffer)
    return ''
}
