import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import ModalCadastraEditaEvento from "../ModalCadastraEditaEvento"
import { TiposCriaAlteraEventoModal } from "../../utils/tipoCriaAlteraEventoModal.constants";
import { cadastraEvento } from '../../services/cadatraEvento.service';

const ModalCadastraEvento = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [erroCadastro, setErroCadastro] = useState<string | null>(null);

    const estadoModalCadastroEdicao = useSelector((state: any) => state.ModalCadastroEdicaoReducer);

    useEffect(() => {
        setOpen(estadoModalCadastroEdicao.openModalCadastro);
    }, [estadoModalCadastroEdicao])

    const handleCadastraEvento = () => {
        try {
            const imagemElement: any = document.querySelector("#imagem-form-input") as HTMLInputElement;
            var reader = new FileReader();
            const imagemFile = imagemElement.files[0];
            reader.readAsDataURL(imagemFile);
            reader.onloadend = function() {
                const imageBase64 = reader.result as string;
                const tituloElement = document.querySelector("#titulo-form-input") as HTMLInputElement;
                const descricaoElement = document.querySelector("#descricao-form-input") as HTMLInputElement;
                const localizacaoElement = document.querySelector("#localizacao-form-input") as HTMLInputElement;
                const precoElement = document.querySelector("#preco-form-input") as HTMLInputElement;
                const titulo: string = tituloElement.value;
                const descricao: string = descricaoElement.value;
                const localizacao: string = localizacaoElement.value;
                const preco: number = parseFloat(precoElement.value);
                const dadosRequisicao = {
                    imageBase64,
                    titulo,
                    descricao,
                    localizacao,
                    preco
                };
                cadastraEvento(dadosRequisicao);
            }
        } catch (error) {
            alert("Erro ao tentar cadastrar o evento. Tente novamente mais tarde.");
            console.log(error);
        }
    }


    return (
        <>
            <ModalCadastraEditaEvento
                open={open}
                tipoModal={TiposCriaAlteraEventoModal.CADASTRA}
                onClick={handleCadastraEvento}
            />
            {erroCadastro && <Alert severity="error">{erroCadastro}</Alert>}
        </>
    )

}

export default ModalCadastraEvento;