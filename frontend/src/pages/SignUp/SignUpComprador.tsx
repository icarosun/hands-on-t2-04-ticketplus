import React from 'react';
import { ChangeEvent, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';

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
          let nome = values.nome.trim();
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
            case 500:
              console.log(errorStatus);
              break;
            default:
                setLoginError(messageError);
                return;
          }
        }
      } else {
        console.log("error");
      }
    }
  
    const handleValidateForm = () => {
      if (values.nome.trim().length < 3) {
        setLoginError("Preencha todos os dados");
        return false;
      }
      
      const regexCpf = /^\d{11}$/;
  
      const verifyCpf = new RegExp(regexCpf).exec(values.cpf.trim());
  
      if (!verifyCpf || values.cpf === ""){
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
    )
}

export default SignUpComprador;