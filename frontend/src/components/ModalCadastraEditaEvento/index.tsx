import {
    ChangeEvent,
    useState,
    useEffect
} from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    Modal,
    Card,
    CardHeader,
    CardContent,
    Alert,
} from '@mui/material';
import FormInput from '../FormInput';
import Button from '@mui/joy/Button';
import { TiposCriaAlteraEventoModal } from '../../utils/tipoCriaAlteraEventoModal.constants';
import {
    setOpenModalCadastroState,
    setOpenModalEdicaoState
} from '../../redux/slices/modalCadastroEdicao.slice';

interface State {
    titulo: string;
    descricao: string;
    localizacao: string;
    preco: number | string;
}

interface ModalCadastraEditaEventoProps {
    open: boolean;
    tipoModal: 
        TiposCriaAlteraEventoModal.CADASTRA
        | TiposCriaAlteraEventoModal.EDITA
    onClick: any;
}

const ModalCadastraEditaEvento = (props: ModalCadastraEditaEventoProps)  => {
    const dispatch = useDispatch();

    const [mostraErroCadastro, setMostraErroCadastro] = useState<boolean>(false);
    const [mensagemErro, setMensagemErro] = useState<string>("");
    const [values, setValues] = useState<State>({
        titulo: "",
        descricao: "",
        localizacao: "",
        preco: ""
    })

    const estadoModalCadastroEdicao = useSelector((state: any) => state.ModalCadastroEdicaoReducer);

    useEffect(() => {
        setMostraErroCadastro(estadoModalCadastroEdicao.mostraErroCadastro);
        setMensagemErro(estadoModalCadastroEdicao.mensagemErro);
    }, [estadoModalCadastroEdicao])

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClose = () => {
        dispatch(setOpenModalCadastroState({
            openModalCadastro: false
        }));
        dispatch(setOpenModalEdicaoState({
            openModalEdicao: false
        }));
    }

    let titulo = "";
    let labelBotao = "";
    if (props.tipoModal === TiposCriaAlteraEventoModal.CADASTRA) {
        titulo = "Cadastro de Evento";
        labelBotao = "Cadastrar";
    } else {
        titulo = "Edição de Evento";
        labelBotao = "Atualizar";
    }

    return (
        <>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={{
                    position: 'absolute',
                    maxWidth: 450, // Largura relativa ao modal
                    maxHeight: 650, // Altura relativa ao modal
                    bgcolor: '#fff',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: 3,
                    boxShadow: 20,
                    padding: "0px 0px 30px"
                }}>
                    <CardHeader
                        title={titulo}
                        sx={{
                            textAlign: 'center',
                            paddingBottom: 0
                        }}
                    />
                    <hr />
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} style={{ marginLeft: 70, marginRight: 70 }}>
                            <FormInput
                                label="Imagem"
                                id="imagem-form-input"
                                type="file"
                                key={`input-1`}
                            />
                            <FormInput
                                label="Título"
                                id="titulo-form-input"
                                value={values.titulo}
                                onChange={handleChange("titulo")}
                                type="text"
                                key={`input-2`}
                            />
                            <FormInput
                                label="Descrição"
                                id="descricao-form-input"
                                value={values.descricao}
                                onChange={handleChange("descricao")}
                                type="text"
                                multiline={true}
                                minRows={2}
                                key={`input-3`}
                            />
                            <FormInput
                                label="Localização"
                                id="localizacao-form-input"
                                value={values.localizacao}
                                onChange={handleChange("localizacao")}
                                type="text"
                                key={`input-4`}
                            />
                            <FormInput
                                label="Preço"
                                id="preco-form-input"
                                value={values.preco}
                                onChange={handleChange("preco")}
                                type="number"
                                key={`input-5`}
                            />
                            <Button
                                fullWidth
                                variant='solid'
                                onClick={props.onClick}
                            >
                                {labelBotao}
                            </Button>
                            {mostraErroCadastro
                                &&
                            <Alert
                                severity="error"
                                sx={{
                                    marginTop: 1.5
                                }}
                            >
                                {mensagemErro}
                            </Alert>}
                        </form>
                    </CardContent>
                </Card>
            </Modal>
        </>
    )
}

export default ModalCadastraEditaEvento;