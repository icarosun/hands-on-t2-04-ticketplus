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
        <Button variant="light" className="text-decoration-none ms-3">
            <FontAwesomeIcon icon={faWallet} className='text-primary' />
            <span className={`p ${corTexto}`}>{`R$ ${saldo.toFixed(2)}`}</span>
        </Button>
    );
};

export default SaldoComponente;
