import { ChangeEvent, MouseEvent, useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, Usuario } from "../../services/login.service";
import { setSession } from "../../redux/slices/session.slice";
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BannerDark from "../../assets/2.png";
import BannerLight from "../../assets/3.png";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Alert from '@mui/joy/Alert';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Check from '@mui/icons-material/Check';
import { TiposUsuarios } from '../../utils/tipoUsuario.constants';
import React from 'react';
import Modal from '@mui/joy/Modal';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import AspectRatio from '@mui/joy/AspectRatio';
import LinearProgress from '@mui/joy/LinearProgress';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    return (
        <IconButton
            aria-label="toggle light/dark mode"
            size="sm"
            variant="outlined"
            disabled={!mounted}
            onClick={(event) => {
                setMode(mode === 'light' ? 'dark' : 'light');
                onClick?.(event);
            }}
            {...other}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

interface State {
    email: string;
    password: string;
    showPassword: boolean;
}

export default function LoginClientPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState<State>({
        email: '',
        password: '',
        showPassword: false
    })
    const [loginError, setLoginError] = useState<string | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleOpenModalSuccessMessage = () => {
        setShowSuccessMessage(true);
        setOpenModal(false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseModalSuccessMessage = () => {
        setShowSuccessMessage(false);
    };

    async function doLogin() {
        try {
            const dadosUsuario: Usuario | null = await login(values.email, values.password);
            dispatch(setSession({
                nome: dadosUsuario?.nome,
                sobrenome: dadosUsuario?.sobrenome,
                email: dadosUsuario?.email,
                saldo: dadosUsuario?.saldo
            }));
            sessionStorage.setItem("email", String(dadosUsuario?.email));
            sessionStorage.setItem("nomeUsuario", String(dadosUsuario?.nome));
            handleOpenModalSuccessMessage();
            setTimeout(() => {
                handleCloseModalSuccessMessage(); // Esconde a mensagem após 5 segundos
                if (dadosUsuario?.tipoUsuario === TiposUsuarios.COMPRADOR) {
                    navigate("/paginacomprador");
                } else {
                    navigate("/paginaorganizador");
                }
                location.reload();
            }, 5000);
        } catch (error: any) {
            const errorStatus = error.response.status;
            if (errorStatus === 401) {
                setLoginError("Usuário ou senha inválidos");
                return;
            }
            console.error(error);
        }
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
                    width: { xs: '100%', md: '50vw' },
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
                        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' , backgroundColor:'#fff'}}>
                            <IconButton variant="plain" color="primary" size="sm">
                                <LocalActivityIcon />
                            </IconButton>
                            <Typography level="title-lg">TicketPlus</Typography>
                        </Box>
                        {/*<ColorSchemeToggle />*/}
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
                            <Stack gap={1}>
                                <Typography component="h1" level="h3">
                                    Login do cliente
                                </Typography>
                                <Typography level="body-sm">
                                    Veja seus pedidos de forma fácil, compre mais rápido e tenha uma experiência personalizada 🤗
                                </Typography>
                                <Typography level="body-sm">
                                  Novo no TicketPlus? <Link level="title-sm" href="/signUp">
                                            Crie sua conta
                                        </Link>
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <form
                                noValidate
                                autoComplete='off'
                                onSubmit={e => e.preventDefault()}
                            >
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input id='email' value={values.email} type="email" name="email" onChange={handleChange('email')} />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Senha</FormLabel>
                                    <Input
                                        name="password"
                                        value={values.password}
                                        id='auth-login-password'
                                        onChange={handleChange('password')}
                                        type={values.showPassword ? 'text' : 'password'}
                                    />
                                </FormControl>
                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Checkbox size="sm" label="Remember me" name="persistent" />
                                        <Link level="title-sm" href="#replace-with-a-link">
                                            Esqueci minha senha
                                        </Link>
                                    </Box>
                                    <Button onClick={doLogin} fullWidth>
                                        Entrar
                                    </Button>
                                </Stack>
                                {loginError && <Alert sx={{ alignItems: 'flex-start' }} variant="soft" color='danger'>{loginError}</Alert>}
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
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: { xs: 0, md: '50vw' },
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${BannerLight})`,
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage: `url(${BannerDark})`,
                    },
                })}
            />
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
                                Login efetuado com sucesso, aguarde ...
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
