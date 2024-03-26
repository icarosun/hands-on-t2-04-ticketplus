import {
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
    borderRadius: 2,
    padding:5,
}

const boxTiposTicketsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 1,
    alignItems: 'center',
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
            {tiposTickets?.map((tipoTicket: tipoTicketsType, index) => {
                return (
                    <Box
                        sx={boxTiposTicketsStyle}
                    >
                        <Typography variant="body1">
                            {primeiraLetraMaiuscula(tipoTicket.descricao)}
                        </Typography>
                        <FormInput
                            id={`quantidade-tickets-${index + 1}`}
                            placeholder="quantidade"
                            type="number"
                        />
                        {tipoTicket.id === 1 &&
                        <FormInput
                            id={`preco-tickets-${index + 1}`}
                            placeholder="preço"
                            type="number"
                            inteiraInput={true}
                        />}
                        {(tipoTicket.id !== 2 && tipoTicket.id !== 1) &&
                        <FormInput
                            id={`preco-tickets-${index + 1}`}
                            placeholder="preço"
                            type="number"
                        />}
                        {tipoTicket.id === 2 && 
                        <FormInput
                            id={`preco-tickets-${index + 1}`}
                            type="number"
                            placeholder="preço"
                            shrink={true}
                            readOnly={true}
                            style={{
                                padding: '0px 5px',
                                backgroundColor: "#FFF"
                            }}
                        />}
                    </Box>
                )
            })}
        </Box>
        </>
    )
}

export default BoxInputsTiposEventos;