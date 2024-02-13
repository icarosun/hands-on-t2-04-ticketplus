import { ChangeEvent, MouseEvent, useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, Usuario } from "../../services/login.service";
import { setSession } from "../../redux/slices/session.slice";
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Google from 'mdi-material-ui/Google'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

interface State {
    email: string
    password: string
    showPassword: boolean
}

const LoginPage = () => {
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
                navigate("/paginacomprador");
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
        <>
            <Button startDecorator={<LockRoundedIcon />} onClick={handleOpenModal} color="primary" sx={{ my: 1.5, color: 'white', marginRight:2}}>Acessar Conta</Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
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
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography
                                variant='h6'
                                sx={{
                                    ml: 1,
                                    lineHeight: 1,
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '1.5rem !important'
                                }}
                            >
                                TicketPlus
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1 }}>
                                Bem Vindo ao TicketPlus! 👋🏻
                            </Typography>
                            <Typography variant='body2'>Faça login em sua conta e comece a aventura</Typography>
                        </Box>
                        <Player
                            autoplay
                            loop
                            src="https://lottie.host/7f819f41-e896-4e47-9090-41cb12ff6993/YEyhbRu0W7.json"
                            style={{ height: '100px', width: '100px', marginTop: 5 }}
                        >
                            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                        </Player>
                        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} style={{ marginLeft: 70, marginRight: 70 }}>
                            <TextField
                                autoFocus
                                fullWidth
                                id='email'
                                label='Email'
                                sx={{ marginBottom: 1.5 }}
                                value={values.email} // Adicionando o valor do estado
                                onChange={handleChange('email')} // Chamando a função handleChange para atualizar o estado quando o valor do TextField mudar
                            />

                            <FormControl fullWidth>
                                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                                <OutlinedInput
                                    label='Password'
                                    value={values.password}
                                    id='auth-login-password'
                                    onChange={handleChange('password')}
                                    type={values.showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                aria-label='toggle password visibility'
                                            >
                                                {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                            </Box>

                            {loginError && <Alert severity="error">{loginError}</Alert>}

                            <Button
                                fullWidth
                                variant='solid'
                                sx={{ marginBottom: 1, marginTop: 1 }}
                                onClick={doLogin}
                            >
                                Login
                            </Button>

                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' , marginTop:2}}>
                                <Typography variant='body2' sx={{ marginRight: 2 }}>
                                    Novo na Plataforma?
                                </Typography>
                                <Typography variant='body2'>
                                    Crie uma Conta
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 0 }}>ou</Divider>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                                    <Facebook sx={{ color: '#497ce2' }} />
                                </IconButton>
                                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                                    <Google sx={{ color: '#db4437' }} />
                                </IconButton>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Modal>
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
                            <Typography variant='body1' sx={{ marginTop: 4 }}> Login realizado com sucesso!</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
        </>
    )
}

export default LoginPage