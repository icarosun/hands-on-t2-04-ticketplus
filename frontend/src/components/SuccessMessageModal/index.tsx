import React from 'react';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';
import Check from '@mui/icons-material/Check';
import Modal from '@mui/joy/Modal';
import AspectRatio from '@mui/joy/AspectRatio';
import LinearProgress from '@mui/joy/LinearProgress';


interface SuccessMessageProps {
    showSuccessMessage: boolean;
    handleCloseModalSuccessMessage: () => void;
    tituloModal: string;
    mensagemModal: string;
}

const SuccessMessageModal = (props: SuccessMessageProps) => {
    return (
        <Modal
            open={props.showSuccessMessage}
            onClose={props.handleCloseModalSuccessMessage}
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
                        <Typography level="title-lg">{props.tituloModal}</Typography>
                        <Typography level="body-xs">
                          {props.mensagemModal}
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
    )
}

export default SuccessMessageModal;