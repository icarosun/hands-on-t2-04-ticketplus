import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { cadastraEvento } from '../../services/cadastraEvento.service';
import { TipoTicketsEventosType } from '../../services/cadastraEvento.service';
import Input from '@mui/joy/Input';
import AspectRatio from '@mui/joy/AspectRatio';
import styled from '@mui/joy/styles/styled';
import SvgIcon from '@mui/joy/SvgIcon';
import BoxInputsTiposEventos from '../BoxInputsTiposEventos';
import FormLabel from '@mui/joy/FormLabel';
import {
  setMensagemErro,
  setMostraErroCadastro
} from '../../redux/slices/modalCadastroEdicao.slice';
import Snackbar from '@mui/joy/Snackbar';
import { keyframes } from '@mui/system';
import React from 'react';
import { AlertProps } from '@mui/joy/Alert';

const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export interface State {
  titulo: string;
  descricao: string;
  localizacao: string;
  faixaEtaria: number;
  categoriaEventoId: number;
  cep: string;
  numero: number;
  imageBase64: string;
  tiposTicketsEventos: TipoTicketsEventosType[];
}

export interface EnderecoPorCep {
  bairro: string;
  logradouro: string;
  uf: string;
  cidade: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <Alert ref={ref} variant="soft" {...props} />;
});

export default function NovoEvento() {
  const dispatch = useDispatch();
  const quantidadeTipoTickets = 3;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [values, setValues] = useState<State>({
    titulo: '',
    descricao: '',
    localizacao: '',
    faixaEtaria: 0,
    categoriaEventoId: 0,
    cep: '',
    numero: 0,
    imageBase64: '',
    tiposTicketsEventos: [],
  });

  const [endereco, setEndereco] = useState<EnderecoPorCep>({
    bairro: '',
    logradouro: '',
    uf: '',
    cidade: '',
  });

  const animationDuration = 600;

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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

  const escondeMensagemErro = () => {
    dispatch(setMostraErroCadastro({
      mostraErroCadastro: false
    }));
  }

  const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const files = event.target.files;
    if (files && files.length !== 0) {
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setValues({ ...values, imageBase64: reader.result as string });
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    if (prop === 'numero') {
      setValues({ ...values, [prop]: parseInt(event.target.value) });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const handleChangeEndereco = (prop: keyof EnderecoPorCep) => (event: ChangeEvent<HTMLInputElement>) => {
    setEndereco({ ...endereco, [prop]: event.target.value });
  };

  const handleChangeSelectFeixaEtaria = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    // Assuming 'categoria' is of type number
    if (newValue !== null) {
      setValues({ ...values, faixaEtaria: parseInt(newValue) });
    } else {
      setValues({ ...values, faixaEtaria: 0 }); // Or any default value you want for null
    }
  };

  const handleChangeSelect = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    // Assuming 'categoria' is of type number
    if (newValue !== null) {
      setValues({ ...values, categoriaEventoId: parseInt(newValue) });
    } else {
      setValues({ ...values, categoriaEventoId: 0 }); // Or any default value you want for null
    }
  };

  const handleChangeTextArea = (prop: keyof State) => (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      escondeMensagemErro();
      // Verifica se há algum campo obrigatório vazio
      if (!values.titulo || !values.descricao || !values.localizacao || !values.faixaEtaria || !values.imageBase64 || !values.categoriaEventoId || !values.tiposTicketsEventos || !values.cep || !values.numero) {
        console.log('Todos os Campos São Obrigatorios')
      } else {
        for (let i = 1; i <= quantidadeTipoTickets; i++) {
          const quantidadeTicketsElement = document.querySelector(`#quantidade-tickets-${i}`) as HTMLInputElement;
          const precoTicketsElement = document.querySelector(`#preco-tickets-${i}`) as HTMLInputElement;
          const quantidadeTicketsValue = quantidadeTicketsElement.value;
          const precoTicketsValue = precoTicketsElement.value;
          if (quantidadeTicketsValue !== "" && precoTicketsValue !== "") {
            values.tiposTicketsEventos.push({
              tipoTicketId: i,
              quantidade: parseInt(quantidadeTicketsValue),
              preco: parseFloat(precoTicketsValue)
            })
          }
        }

        const titulo: string = values.titulo
        const descricao: string = values.descricao
        const localizacao: string = values.localizacao
        const faixaEtaria: number = values.faixaEtaria
        const imageBase64: string = values.imageBase64
        const categoriaEventoId: number = values.categoriaEventoId
        const tiposTicketsEventos: TipoTicketsEventosType[] = values.tiposTicketsEventos
        const cep: string = values.cep
        const numero: number = values.numero

        const dadosRequisicao = {
          titulo,
          descricao,
          localizacao,
          faixaEtaria,
          imageBase64,
          categoriaEventoId,
          tiposTicketsEventos,
          cep,
          numero
        }
        await cadastraEvento(dadosRequisicao);
        handleOpenModalSuccessMessage();
        setTimeout(() => {
          handleCloseModalSuccessMessage();
          location.reload();
        }, 2500);
        console.log(dadosRequisicao);
      }
    } catch (error) {
      mostraMensagemErro("Erro ao tentar cadastrar o evento. Tente novamente mais tarde.");
      console.error("Erro ao cadastrar evento:", error);
      console.log(values)
    }
  };


  return (
    <Card variant="plain">
      <Stack spacing={2} sx={{ p: 1 }}>
        <Typography color="primary" fontWeight={700} fontSize={30}>Novo Evento</Typography>
        <Typography >
          Leia atentamente nossos termos e condições referentes às cláusulas de publicação e gerenciamento de eventos.
        </Typography>
        <Divider />
        <Stack direction="column" spacing={1}>
          <AspectRatio
            ratio="1"
            maxHeight={350}
            sx={{ flex: 1, minWidth: '100%' }}
          >
            <img
              src={values.imageBase64}
              loading="lazy"
              alt=""
            ></img>
          </AspectRatio>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            startDecorator={
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </SvgIcon>
            }
          >
            Selecionar Arquivo
            <VisuallyHiddenInput type="file" accept='image/png, image/jpeg' onChange={onChangeImage} id="imagem-form-input" key={`input-1`} />
          </Button>
        </Stack>
        <FormControl>
          <Typography >Titulo para o seu evento</Typography>
          <Input
            size="md"
            value={values.titulo}
            onChange={handleChange('titulo')}
            placeholder="Titulo para o seu evento"
          />
        </FormControl>
        <FormControl>
          <Typography >Localidade do Seu Evento</Typography>
          <Input
            size="md"
            value={values.localizacao}
            onChange={handleChange('localizacao')}
            placeholder="ex: Arena da Amazônia"
          />
        </FormControl>
        <FormControl>
          <Typography >Descrição para o seu Evento</Typography>
          <Textarea
            size="md"
            minRows={5}
            maxRows={10}
            value={values.descricao}
            onChange={handleChangeTextArea('descricao')}
            placeholder="Descrição para o seu evento"
          />
        </FormControl>
        <FormControl>
          <Typography >Selecione a faixa etaria</Typography>
          <Select
            size="md"
            value={values.faixaEtaria.toString()}
            onChange={handleChangeSelectFeixaEtaria}
            defaultValue="18"
          >
            <Option value="12">12</Option>
            <Option value="14">14</Option>
            <Option value="16">16</Option>
            <Option value="18">18</Option>
          </Select>
        </FormControl>
        <FormControl>
          <Typography >Selecione uma Categoria</Typography>
          <Select
            size="md"
            value={values.categoriaEventoId.toString()}
            onChange={handleChangeSelect}
            defaultValue="1"
          >
            <Option value="1">Teatros e Espetáculos</Option>
            <Option value="2">Eventos Geeks</Option>
            <Option value="3">Congressos e Palestras</Option>
            <Option value="4">Infantil</Option>
            <Option value="5">Passeios e Tour</Option>
            <Option value="6">Cursos e Workshops</Option>
            <Option value="7">Gastronomia</Option>
            <Option value="8">Outros</Option>
          </Select>
        </FormControl>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Stack spacing={1} sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center'
          }}>
            <FormLabel>CEP</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="md" onChange={handleChange('cep')} value={values.cep} placeholder="00000-000" />
            </FormControl>
            <FormLabel>Numero</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="md" onChange={handleChange('numero')} type='number' defaultValue={0} value={values.numero} placeholder="01" />
            </FormControl>
            <FormLabel>Cidade</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="md" onChange={handleChangeEndereco('cidade')} value={endereco.cidade} disabled placeholder="cidade" />
            </FormControl>
            <FormLabel>Bairro</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="md" onChange={handleChangeEndereco('bairro')} value={endereco.bairro} disabled placeholder="bairro" />
            </FormControl>
            <FormLabel>UF</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="md" onChange={handleChangeEndereco('uf')} disabled value={endereco.uf} placeholder="UF" />
            </FormControl>
            <FormLabel>Logradouro</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="md" onChange={handleChangeEndereco('logradouro')} disabled value={endereco.logradouro} placeholder="logradouro" />
            </FormControl>
          </Stack>
        </Stack>
        <BoxInputsTiposEventos />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={showSuccessMessage}
          onClose={handleCloseModalSuccessMessage}
          autoHideDuration={4000}
          animationDuration={animationDuration}
          sx={{
            ...(open && {
              animation: `${inAnimation} ${animationDuration}ms forwards`,
            }),
            ...(!open && {
              animation: `${outAnimation} ${animationDuration}ms forwards`,
            }),
          }}
        >
          Evento Cadastrado Com Sucesso
        </Snackbar>
        <Button
          size="md"
          variant="solid"
          onClick={handleSubmit}
        >
          Cadastrar Evento
        </Button>
      </Stack>
    </Card>
  );
}
