import React, { useEffect } from 'react';
import { ChangeEvent, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';

import { verificarErrorValidacao } from '../../utils/verifyErrorOfPost';
import { signupOrganizador } from '../../services/cadastraOrganziador.service';

interface State {
    nome: string
    email: string
    password: string
    repeatPassword: string
    agencia: string;
    numeroConta: string;
    digito: string;
    cnpj: string;
  }


const SignUpOrganizador = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState<State>({
      nome: '',
      email: '',
      password: '',
      repeatPassword: '',
      agencia: '',
      numeroConta: '',
      digito: '',
      cnpj: ''
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

    const preencheZerosEsquerda = (stringOriginal: string, tamanho: number) => {
        let novaString = stringOriginal;
        while (novaString.length < tamanho) {
          novaString = "0" + novaString;
        }
        return novaString;
    }

    const formataCnpj  = (cnpj: string) => {
        let cnpjFormatado = `${cnpj.slice(0,2)}.`;
        cnpjFormatado = cnpjFormatado + `${cnpj.slice(2,5)}.`;
        cnpjFormatado = cnpjFormatado + `${cnpj.slice(5,8)}/`;
        cnpjFormatado = cnpjFormatado + `${cnpj.slice(8,12)}-`;
        cnpjFormatado = cnpjFormatado + `${cnpj.slice(12,15)}`;
        return cnpjFormatado;
    }
  
    const handleCreatePerfil = async () => {
      try {
        if (handleValidateForm()) {
            try {
                let nome = values.nome.trim();
                const agencia = preencheZerosEsquerda(values.agencia, 4);
                const numeroConta = preencheZerosEsquerda(values.numeroConta, 20);
                const conta = `${agencia};${numeroConta}-${values.digito}`;
                const cnpjFormatado = formataCnpj(values.cnpj);
                
                await signupOrganizador(
                    {
                    nome: nome, 
                    email: values.email,
                    senha: values.password,
                    repeteSenha: values.repeatPassword,
                    conta: conta,
                    cnpj: cnpjFormatado
                    }
                );
        
                handleOpenModalSuccessMessage();
                setTimeout(() => {
                    handleCloseModalSuccessMessage(); // Esconde a mensagem após 5 segundos
                    // navigate("/login_cliente");
                }, 5000);
        
                } catch(error: any) {
        
                const errorStatus = error.response.status;
        
                const messageError = verificarErrorValidacao(error);
        
                switch(errorStatus) {
                    case 422:
                    setLoginError(messageError);
                    break;
                    case 409:
                    setLoginError("Já existe um usuário cadastrado com o e-mail informado");
                    break;
                    case 500:
                    console.log(errorStatus);
                    break;
                    default:
                        setLoginError(messageError);
                        return;
                }
            }
        }
    } catch (error) {
        console.log(error);
      }
    }
  
    const handleValidateForm = () => {
      if (values.nome.trim().length < 3) {
        setLoginError("Por favor, insira o nome completo");
        return false;
      }
      
      const regexCnpj = /^\d{14}$/;
      const regexNumero = /^[0-9]*$/;
      const regexDigito = /^\d{1}$/;
  
      const verifyCnpj = new RegExp(regexCnpj).exec(values.cnpj.trim());
      const verifyAgencia = new RegExp(regexNumero).exec(values.agencia.trim());
      const verifyNumeroConta = new RegExp(regexNumero).exec(values.numeroConta.trim());
      const verifyDigito = new RegExp(regexDigito).exec(values.digito.trim());
      
      
      if (!verifyCnpj || values.cnpj === ""){
        setLoginError("Insira um CNPJ válido");
        return false;
      }

      if (!verifyAgencia || values.agencia === "") {
        setLoginError("Por favor, insira um número de agência válido")
        return false;
      }

      if (!verifyNumeroConta  || values.numeroConta === "") {
        setLoginError("Por favor, insira um número de conta válido")
        return false;
      }

      if (!verifyDigito || values.digito === "") {
        setLoginError("Por favor, insira um dígito válido")
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
                                <FormLabel>Razao Social<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                                <Input id='email' value={values.nome} type="text" name="nome" onChange={handleChange('nome')} />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>CNPJ (apenas números)<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                                <Input id='cnpj' value={values.cnpj} type="text" name="nome" onChange={handleChange('cnpj')} />
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
                            <Stack gap={1}>
                                <Typography
                                    sx={{
                                        marginTop: 1.2,
                                        marginBottom: 1.5,
                                        fontWeight: "bold"
                                    }}
                                >Informações Bancárias</Typography>
                                <FormControl required>
                                    <FormLabel>Agência<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                                    <Input id='agencia' value={values.agencia} type="text" name="agencia" onChange={handleChange('agencia')} />
                                </FormControl>
                                <Stack gap={1}>
                                    <FormControl required>
                                        <FormLabel>Número da conta<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                                        <Input id='numeroConta' value={values.numeroConta} type="text" name="numeroConta" onChange={handleChange('numeroConta')} />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Dígito<Typography sx= {{ color: "red"}}>*</Typography></FormLabel>
                                        <Input id='digito' value={values.digito} type="text" name="digito" onChange={handleChange('digito')} />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Stack gap={4} sx={{ mt: 2 }}>
                                <Button onClick={handleCreatePerfil} fullWidth>
                                  Cadastrar
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
    )
}

export default SignUpOrganizador;