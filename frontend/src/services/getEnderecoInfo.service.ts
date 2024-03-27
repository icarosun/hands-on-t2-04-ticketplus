import axios from "axios";

export async function getEnderecoInfo (cep: string) {
    return await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
}