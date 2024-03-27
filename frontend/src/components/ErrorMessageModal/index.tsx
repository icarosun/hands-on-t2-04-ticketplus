import React from 'react';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Modal from '@mui/joy/Modal';
import AspectRatio from '@mui/joy/AspectRatio';
import LinearProgress from '@mui/joy/LinearProgress';


interface ErrorMessageModalProps {
    showErrorMessage: boolean;
    handleCloseModalErrorMessage: () => void;
    tituloModal: string;
    mensagemModal: string;
}

const ErrorMessageModal = (props: ErrorMessageModalProps) => {
    return (
        <Modal
            open={props.showErrorMessage}
            onClose={props.handleCloseModalErrorMessage}
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
                            color='danger'
                            ratio="1"
                            sx={{
                                minWidth: 40,
                                color:'#ff4343',
                                borderRadius: '50%'
                            }}
                        >
                            <div>
                                <DoDisturbIcon />
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
                        <Typography level="title-lg">{props.tituloModal}</Typography>
                        <Typography level="body-xs">
                          {props.mensagemModal}
                        </Typography>
                    </div>
                    <LinearProgress
                        variant="solid"
                        value={40}
                        sx={{
                            color: '#ff4343',
                            backgroundColor: '#f2a7a7',
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
    )
}

export default ErrorMessageModal;