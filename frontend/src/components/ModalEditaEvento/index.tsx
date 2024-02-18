import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ModalCadastraEditaEvento from "../ModalCadastraEditaEvento"
import { TiposCriaAlteraEventoModal } from "../../utils/tipoCriaAlteraEventoModal.constants";

const ModalEditaEvento = () => {

    const [open, setOpen] = useState<boolean>(false);

    const estadoModalCadastroEdicao = useSelector((state: any) => state.ModalCadastroEdicaoReducer);

    useEffect(() => {
        setOpen(estadoModalCadastroEdicao.openModalEdicao);
    }, [estadoModalCadastroEdicao]);

    const handleEditaEvento = () => {

    }


    return (
        <ModalCadastraEditaEvento
            open={open}
            tipoModal={TiposCriaAlteraEventoModal.EDITA}
            onClick={handleEditaEvento}
        />
    )
}

export default ModalEditaEvento;