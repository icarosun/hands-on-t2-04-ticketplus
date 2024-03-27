import React from 'react';
import { ChangeEvent, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';
import Check from '@mui/icons-material/Check';
import Modal from '@mui/joy/Modal';
import AspectRatio from '@mui/joy/AspectRatio';
import LinearProgress from '@mui/joy/LinearProgress';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import { signupComprador } from '../../services/cadastraComprador.service';
import { verificarErrorValidacao } from '../../utils/verifyErrorOfPost';

interface State {
  email: string
  password: string
  repeatPassword: string
  nome: string
  cpf: string
}

const SignUpComprador = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    repeatPassword: '',
    nome: '',
    cpf: ''
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
  }

  const handleOpenModalSuccessMessage = () => {
      setShowSuccessMessage(true);
  };

  const handleCloseModalSuccessMessage = () => {
      setShowSuccessMessage(false);
  };

  const handleCreatePerfil = async () => {
    if (handleValidateForm()) {
      try {
        let nome = values.nome;
        while (nome.includes(" ")) {
          nome = nome.replace(" ", "");
        }
        await signupComprador(
          {
            nome: nome, 
            email: values.email,
            senha: values.password,
            repeteSenha: values.repeatPassword,
            cpf: values.cpf
          }
        );

        handleOpenModalSuccessMessage()
        setTimeout(() => {
          handleCloseModalSuccessMessage(); // Esconde a mensagem após 5 segundos
          navigate("/login_cliente");
        }, 5000);

      } catch(error: any) {

        const errorStatus = error.response.status;

        const messageError = verificarErrorValidacao(error);

        switch(errorStatus) {
          case 422:
            setLoginError(messageError);
            break;
          case 409:
            setLoginError("Já existe usuário cadastrado com E-mail informado");
            break;
          default:
            console.log(errorStatus);
            return;
        }
      }
    } else {
      console.log("error");
    }
  }

  const handleValidateForm = () => {
    if (values.nome.trim().length < 3) {
      setLoginError("Por favor, insira o nome completo");
      return false;
    }
    
    const regexCpf = /^\d{11}$/;

    const verifyCpf = new RegExp(regexCpf).exec(values.cpf.trim());

    if (!verifyCpf){
      setLoginError("Por favor, insira um CPF válido. Apenas números")
      return false;
    }

    if (!values.email.trim()) {
      setLoginError("Por favor, insira um e-mail válido")
      return false;
    }

    if (values.password.length < 8) {
      setLoginError("Por favor, insira uma senha de no mínimo 8 caracteres");
      return false;
    }

    if (values.repeatPassword !== values.password) {
      setLoginError("As senhas não conferem");
      return false;
    }

    setLoginError("");
    return true;
  }


  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
          styles={{
              ':root': {
                  '--Form-maxWidth': '800px',
                  '--Transition-duration': '0.4s', // set to `none` to disable transition
              },
          }}
      />
      <Box
        sx={(theme) => ({
                width: { xs: '100%' },
                transition: 'width var(--Transition-duration)',
                transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255 255 255 / 0.2)',
                [theme.getColorSchemeSelector('dark')]: {
                    backgroundColor: 'rgba(19 19 24 / 0.4)',
                },
            })}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100dvh',
                    width: '100%',
                    px: 2,
                }}
            >
                <Box
                    component="header"
                    sx={{
                        py: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box onClick = {() => navigate("/")} sx={{ gap: 2, display: 'flex', alignItems: 'center' , backgroundColor:'#fff'}}>
                        <IconButton variant="plain" color="primary" size="sm">
                            <LocalActivityIcon />
                        </IconButton>
                        <Typography level="title-lg">TicketPlus</Typography>
                    </Box>
                </Box>
                <Box
                    component="main"
                    sx={{
                        my: 'auto',
                        py: 2,
                        pb: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 400,
                        maxWidth: '100%',
                        mx: 'auto',
                        borderRadius: 'sm',
                        '& form': {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        },
                        [`& .MuiFormLabel-asterisk`]: {
                            visibility: 'hidden',
                        },
                    }}
                >
                    <Stack gap={4} sx={{ mb: 2 }}>
                      <Typography component="h1" level="h3">
                        Bem Vindo ao TicketPlus! 👋🏻
                      </Typography>
                      <Typography>
                        Faça o seu cadastro
                      </Typography>
                    </Stack>
                    <Stack gap={1}>
                        {loginError && <Alert sx={{ alignItems: 'flex-start' }} variant="soft" color='danger'>{loginError}</Alert>}
                        <form
                            noValidate
                            autoComplete='off'
                            onSubmit={e => e.preventDefault()}
                        >
                            <FormControl required>
                                <FormLabel>Nome<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                                <Input id='email' value={values.nome} type="text" name="nome" onChange={handleChange('nome')} />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>CPF (apenas números)<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                                <Input id='cpf' value={values.cpf} type="text" name="nome" onChange={handleChange('cpf')} />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Email<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                                <Input id='email' value={values.email} type="email" name="email" onChange={handleChange('email')} />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Senha<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                                <Input
                                  name="password"
                                  value={values.password}
                                  id='auth-login-password'
                                  onChange={handleChange('password')}
                                  type = "password"
                                />
                            </FormControl>
                            <FormControl required>
                              <FormLabel>Repita a senha<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                              <Input
                                name="repeat-password"
                                value={values.repeatPassword}
                                id='repeat-login-password'
                                onChange={handleChange('repeatPassword')}
                                type = "password"
                              />
                            </FormControl>
                            <Stack gap={4} sx={{ mt: 2 }}>
                                <Button onClick={handleCreatePerfil} fullWidth>
                                  Cadastrar
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
                <Box component="footer" sx={{ py: 3 }}>
                    <Typography level="body-xs" textAlign="center">
                        © TicketPlus {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Box>
        </Box>
       <Modal
            open={showSuccessMessage}
            onClose={handleCloseModalSuccessMessage}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack spacing={2} sx={{ maxWidth: 400 }}>
                <Alert
                    size="lg"
                    variant="soft"
                    startDecorator={
                        <AspectRatio
                            variant="solid"
                            color='primary'
                            ratio="1"
                            sx={{
                                minWidth: 40,
                                color:'#4377ff',
                                borderRadius: '50%'
                            }}
                        >
                            <div>
                                <Check />
                            </div>
                        </AspectRatio>
                    }
                    sx={{
                        alignItems: 'flex-start',
                        overflow: 'hidden',
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <div>
                        <Typography level="title-lg">Sucesso</Typography>
                        <Typography level="body-xs">
                          Cadastro feito com sucesso!
                        </Typography>
                    </div>
                    <LinearProgress
                        variant="solid"
                        value={40}
                        sx={{
                            color: '#4377ff',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderRadius: 0,
                        }}
                    />
                </Alert>
            </Stack>
        </Modal>
    </CssVarsProvider>
  );
}

export default SignUpComprador
