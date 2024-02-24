import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ModalCadastraEditaEvento from "../ModalCadastraEditaEvento"
import { TiposCriaAlteraEventoModal } from "../../utils/tipoCriaAlteraEventoModal.constants";
import {
    setMensagemErro,
    setMostraErroCadastro
} from '../../redux/slices/modalCadastroEdicao.slice';
import {
    Box,
    Card,
    CardContent,
    Modal,
    Typography
} from '@mui/material';
import { Controls, Player } from '@lottiefiles/react-lottie-player';
import {
    updateEvento
} from '../../services/evento.service';

const ModalEditaEvento = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [idEdicaoEvento, setIdEdicaoEvento] = useState<number>(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const estadoModalCadastroEdicao = useSelector((state: any) => state.ModalCadastroEdicaoReducer);

    useEffect(() => {
        setOpen(estadoModalCadastroEdicao.openModalEdicao);
        setIdEdicaoEvento(estadoModalCadastroEdicao.idEdicaoEvento);
    }, [estadoModalCadastroEdicao]);

    const handleOpenModalSuccessMessage = () => {
        setShowSuccessMessage(true);
        setOpen(false);
    }

    const handleCloseModalSuccessMessage = () => {
        setShowSuccessMessage(false);
    }

    const mostraMensagemErro = (mensagemErro: string = "Erro ao tentar cadastrar o evento. Tente novamente mais tarde.") => {
        dispatch(setMensagemErro({
            mensagemErro: mensagemErro
        }));
        dispatch(setMostraErroCadastro({
            mostraErroCadastro: true
        }));
    }

    const handleEditaEvento = async () => {
        try {
            const imagemElement: any = document.querySelector("#imagem-form-input") as HTMLInputElement;
            if (imagemElement.files.length === 0) {
                mostraMensagemErro("Escolha um arquivo de imagem.");
                return;
            }
            var reader = new FileReader();
            const imagemFile = imagemElement.files[0];
            reader.readAsDataURL(imagemFile);
            reader.onloadend = async function() {
                try {
                    const imageBase64 = reader.result as string;
                    const tituloElement = document.querySelector("#titulo-form-input") as HTMLInputElement;
                    const descricaoElement = document.querySelector("#descricao-form-input") as HTMLInputElement;
                    const localizacaoElement = document.querySelector("#localizacao-form-input") as HTMLInputElement;
                    const precoElement = document.querySelector("#preco-form-input") as HTMLInputElement;
                    const titulo: string = tituloElement.value;
                    const descricao: string = descricaoElement.value;
                    const localizacao: string = localizacaoElement.value;
                    const precoString: string = precoElement.value;
                    if (titulo === "" || descricao === "" || localizacao === "" || precoString === "") {
                        mostraMensagemErro("Preencha todos os campos.");
                        return;
                    }
                    const preco: number = parseFloat(precoString);
                    await updateEvento(
                        idEdicaoEvento,
                        imageBase64,
                        titulo,
                        descricao,
                        localizacao,
                        preco
                    );
                    handleOpenModalSuccessMessage();
                    setTimeout(() => {
                        handleCloseModalSuccessMessage();
                        location.reload();
                    }, 2500);
                } catch (error) {
                    mostraMensagemErro("Erro ao tentar atualizar o evento. Tente novamente mais tarde.");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <ModalCadastraEditaEvento
                open={open}
                tipoModal={TiposCriaAlteraEventoModal.EDITA}
                onClick={handleEditaEvento}
            />
            <Modal
                open={showSuccessMessage}
                onClose={handleCloseModalSuccessMessage}
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
                    boxShadow: 20
                }}>
                    <CardContent sx={{ marginTop: 2.5, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ mb: 1 }}>
                            <Player
                                autoplay
                                loop
                                src="https://lottie.host/48c51d08-deb3-4480-a646-7d60b13642d7/8IhnHCZ5IN.json"
                                style={{ height: '80px', width: '80px', marginTop: 5 }}
                            >
                                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                            </Player>
                            <Typography variant='body1' sx={{ marginTop: 4 }}>Evento cadastrado com sucesso!</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
        </>
    )
}

export default ModalEditaEvento;