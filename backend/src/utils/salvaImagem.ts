import fs from 'fs';

export function salvaImagem (caminhoPasta: string, imagemBase64: string) {
    if (!fs.existsSync(caminhoPasta)) {
        fs.mkdirSync(caminhoPasta);
    }
    const buffer = Buffer.from(imagemBase64, 'base64')
    let nomeImagem = ''
    if (caminhoPasta.includes('events')) nomeImagem = 'cartaz.jpg'
    else nomeImagem = 'avatar.jpg'
    fs.writeFileSync(`${caminhoPasta}/${nomeImagem}`, buffer)
}
