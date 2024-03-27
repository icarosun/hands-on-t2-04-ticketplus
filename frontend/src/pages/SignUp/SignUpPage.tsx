import React from 'react';
import { ChangeEvent, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/joy/IconButton';
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
import { Step, StepLabel, Stepper } from '@mui/material';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const steps = ["Tipo de usuário", "Cadastro"];

function getStepContent(step: number) {
    switch (step) {
      case 0:
          return <Box/>
      case 1:
        return <Box/>
      default:
        throw new Error('Unknown step');
    }
  }

const SignUpStepper = () => {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);
    
    const displayNextButton = activeStep === steps.length - 1 ? 'none' : 'flex';

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    

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
                    <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {(<React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                    alignItems: 'end',
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: '60px',
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        display: { xs: 'none', sm: 'flex' },
                      }}
                    >
                      Anterior
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{
                        display: { xs: 'flex', sm: 'none' },
                      }}
                    >
                      Anterior
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{
                      width: { xs: '100%', sm: 'fit-content' },
                      display: `${displayNextButton}`
                    }}
                  >
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
                </Box>
                <Box component="footer" sx={{ py: 3 }}>
                    <Typography level="body-xs" textAlign="center">
                        © TicketPlus {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Box>
        </Box>
    </CssVarsProvider>
  );
}

export default SignUpStepper
