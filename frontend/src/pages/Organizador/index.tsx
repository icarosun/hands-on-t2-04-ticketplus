import { ModalCriaAlteraEvento } from "../../components/ModalCriaAlteraEvento";
import { TiposCriaAlteraEventoModal } from "../../utils/tipoCriaAlteraEventoModal.constants";

const PaginaOrganizador = () => {
    return (
        <ModalCriaAlteraEvento tipoModal={TiposCriaAlteraEventoModal.EDITA}/>
    )
}

export default PaginaOrganizador