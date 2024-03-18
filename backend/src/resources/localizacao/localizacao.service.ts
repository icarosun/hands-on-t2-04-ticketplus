export async function getLocalizacaoByCEP (CEP: string) {
    return await fetch(`https://viacep.com.br/ws/${CEP}/json/`).then((res) => {
        return res.json().then((data) => {
            console.log(data)
            return data;
        })
    })
}
