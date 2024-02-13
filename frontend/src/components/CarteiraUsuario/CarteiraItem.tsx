import React from "react";
import { Button, CircularProgress } from "@mui/joy";
import WalletIcon from '@mui/icons-material/Wallet';

interface SaldoComponenteProps {
    saldo: number | undefined;
    spinner: boolean;
}

const SaldoComponente: React.FC<SaldoComponenteProps> = (props: SaldoComponenteProps) => {
    const saldo = props.saldo as number;

    if (props.spinner) {
        return (
            <Button color="primary" variant="solid" startDecorator={<CircularProgress variant="solid" />}>Loading…</Button>
        );
    } else {
        return (
            <Button  color="primary" variant="solid" startDecorator={<WalletIcon />}>{`R$ ${String(parseFloat(String(saldo)).toFixed(2)).replace('.', ',')}`}</Button>
        );
    }
};

export default SaldoComponente;