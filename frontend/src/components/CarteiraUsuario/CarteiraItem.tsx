import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

interface SaldoComponenteProps {
    saldo: number;
}

const SaldoComponente: React.FC<SaldoComponenteProps> = ({ saldo }) => {
    const corTexto = saldo > 0 ? "text-success" : "text-danger";

    return (
        <Button variant="light" className="text-decoration-none ms-3 d-flex flex-row align-items-center gap-1">
            <FontAwesomeIcon icon={faWallet} className='text-primary' />
            <div className={`p ${corTexto}`}>{`R$ ${String(parseFloat(String(saldo)).toFixed(2)).replace('.', ',')}`}</div>
        </Button>
    );
};

export default SaldoComponente;
