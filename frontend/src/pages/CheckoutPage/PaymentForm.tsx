import PayPalButton from "../../components/PayPalButton";
import { PayPalButtonProps } from "../../interfaces/PayPalButtonProps";

export default function PaymentForm(props: PayPalButtonProps) {
  return (
    <>
      <PayPalButton
        eventoId={props.eventoId}
        quantity={props.quantity}
        tipoTicketId={props.tipoTicketId}
      />
    </>
  );
}