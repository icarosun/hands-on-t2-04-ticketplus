import { ChangeEvent, useState } from 'react';
import {
    Modal,
    Card,
    CardHeader,
    CardContent,
} from '@mui/material';
import FormInput from '../FormInput';
import Button from '@mui/joy/Button';
import { TiposCriaAlteraEventoModal } from '../../utils/tipoCriaAlteraEventoModal.constants';

interface State {
    titulo: string;
    descricao: string;
    localizacao: string;
    preco: number | null;
}

interface ModalCriaAlteraEventoProps {
    tipoModal: 
        TiposCriaAlteraEventoModal.CADASTRA
        | TiposCriaAlteraEventoModal.EDITA
}

export const ModalCriaAlteraEvento = (props: ModalCriaAlteraEventoProps)  => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<State>({
        titulo: "",
        descricao: "",
        localizacao: "",
        preco: null
    })

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    let titulo = "";
    const botaoModal:any[] = [];
    if (props.tipoModal === TiposCriaAlteraEventoModal.CADASTRA) {
        titulo = "Cadastro de Evento";
        botaoModal.push(
            <Button
                fullWidth
                variant='solid'
            >
                Cadastrar
            </Button>
        );
    } else {
        titulo = "Edição de Evento";
        botaoModal.push(
            <Button
                fullWidth
                variant='solid'
            >
                Atualizar
            </Button>
        );
    }

    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
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
                            />
                            <FormInput
                                label="Título"
                                id="titulo-form-input"
                                value={values.titulo}
                                onChange={handleChange("titulo")}
                                type="text"
                            />
                            <FormInput
                                label="Descrição"
                                id="descricao-form-input"
                                value={values.descricao}
                                onChange={handleChange("descricao")}
                                type="text"
                                multiline={true}
                                minRows={2}
                            />
                            <FormInput
                                label="Localização"
                                id="localizacao-form-input"
                                value={values.localizacao}
                                onChange={handleChange("localizacao")}
                                type="text"
                            />
                            <FormInput
                                label="Preço"
                                id="preco-form-input"
                                value={values.preco}
                                onChange={handleChange("preco")}
                                type="number"
                            />
                            {[botaoModal]}
                        </form>
                    </CardContent>
                </Card>
            </Modal>
        </>
    )
}