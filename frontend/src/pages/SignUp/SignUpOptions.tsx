import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';


interface SignUpOptionsProps {
    handleSignUpComprador: () => void,
    handleSignUpOrganizador: () => void,
}

const SignUpOptions = (props: SignUpOptionsProps) => {
    return (
        <>
            <Typography component="h2" level="h4">
                O que você deseja fazer?
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4
            }}>
                <Button
                    variant="contained"
                    onClick={props.handleSignUpComprador}
                >
                    Quero comprar ingressos
                </Button>
                <Button
                    variant="outlined"
                    onClick={props.handleSignUpOrganizador}
                >
                    Quero vender ingressos
                </Button>
            </Box>
        </>
    )
}

export default SignUpOptions;