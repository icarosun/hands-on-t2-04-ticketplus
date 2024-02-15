import fs from 'fs';

export function excluiImagem (caminhoPasta: string) {
    if (!fs.existsSync(caminhoPasta)) {
        fs.rmSync(caminhoPasta, {
            recursive: true,
            force: true
        });
    }
}