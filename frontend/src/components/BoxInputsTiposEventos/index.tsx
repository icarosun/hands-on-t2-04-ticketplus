import {
    Container,
    Box,
    Typography,
    InputLabel
} from "@mui/material";
import { useState, useEffect } from "react";

import { primeiraLetraMaiuscula } from "../../utils/primeiraLetraMaiuscula";
import { tipoTicketsType } from "../../services/getTiposTickets";
import { getTiposTicketsService } from "../../services/getTiposTickets";
import FormInput from "../FormInput";

const containerTiposTicketsStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 1,
    padding: '5px',
    marginBottom: 2,
}

const boxTiposTicketsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 0.6,
    alignItems: 'center',
    padding: '0px 20px'
}


const BoxInputsTiposEventos = () => {
    const [tiposTickets, setTiposTickets] = useState<tipoTicketsType[] | null>([{
        id: "",
        descricao: ""
    }]);

    const getTiposTickets = async () => {
        try {
            const tipoTicketsData = await getTiposTicketsService();
            setTiposTickets(tipoTicketsData);
            console.log(`Tipos Tickets: ${tipoTicketsData}`);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTiposTickets();
    }, []);

    return (
        <>
        <Box
            id="container-tipos-ingressos"
            component="fieldset"
            sx={containerTiposTicketsStyle}
        >
            <InputLabel
                htmlFor="container-tipos-ingressos"
                shrink={true}
                variant="outlined"
                margin="dense"
                style={{
                    top: -4,
                    padding: '0px 5px',
                    backgroundColor: '#FFF',
                    display: 'flex',
                    alignSelf: 'flex-start',
                }}
                key={`input-label`}
            >
                Tipos de Ingresso
            </InputLabel>
            {tiposTickets?.map((tipoTicket: tipoTicketsType, index) => {
                return (
                    <Box
                        sx={boxTiposTicketsStyle}
                    >
                        <Typography>
                            {primeiraLetraMaiuscula(tipoTicket.descricao)}
                        </Typography>
                        <FormInput
                            id={`quantidade-tickets-${index}`}
                            label="Quantidade"
                            type="number"
                        />
                        <FormInput
                            id={`preco-tickets-${index}`}
                            label="Preço"
                            type="number"
                        />
                    </Box>
                )
            })}
        </Box>
        </>
    )
}

export default BoxInputsTiposEventos;