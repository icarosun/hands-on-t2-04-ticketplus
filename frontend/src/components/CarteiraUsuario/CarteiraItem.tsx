import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

interface SaldoComponenteProps {
    saldo: number | undefined;
    spinner: boolean;
}

const SaldoComponente: React.FC<SaldoComponenteProps> = (props: SaldoComponenteProps) => {
    const saldo = props.saldo as number;
    const corTexto =  saldo > 0 ? "text-success" : "text-danger";

    if (props.spinner) {
        return (
        <Button variant="light" style={{minWidth : '113.34px'}} className="text-decoration-none ms-3 d-flex flex-row align-items-center justify-content-center justify-self-center gap-1">
            <FontAwesomeIcon icon={faWallet} className='text-primary'/>
            <Spinner animation="border" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Button>
        )
    } else {
        return (
            <Button variant="light" className="text-decoration-none ms-3 d-flex flex-row align-items-center gap-1">
                <FontAwesomeIcon icon={faWallet} className='text-primary' />
                <div className={`p ${corTexto}`}>{`R$ ${String(parseFloat(String(saldo)).toFixed(2)).replace('.', ',')}`}</div>
            </Button>
        );
    }
};

export default SaldoComponente;
