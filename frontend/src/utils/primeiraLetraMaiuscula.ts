export const primeiraLetraMaiuscula = (palavra: string): string => {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1)
}