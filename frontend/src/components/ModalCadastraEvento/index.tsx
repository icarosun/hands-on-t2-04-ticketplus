import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ModalCadastraEditaEvento from "../ModalCadastraEditaEvento"
import { TiposCriaAlteraEventoModal } from "../../utils/tipoCriaAlteraEventoModal.constants";

const ModalCadastraEvento = () => {

    const [open, setOpen] = useState<boolean>(false);

    const estadoModalCadastroEdicao = useSelector((state: any) => state.ModalCadastroEdicaoReducer);

    useEffect(() => {
        setOpen(estadoModalCadastroEdicao.openModalCadastro);
    }, [estadoModalCadastroEdicao])


    return (
        <ModalCadastraEditaEvento
            open={open}
            tipoModal={TiposCriaAlteraEventoModal.CADASTRA}
        />
    )
}

export default ModalCadastraEvento;