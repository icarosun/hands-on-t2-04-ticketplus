import PayPalButton from "../../components/PayPalButton";

export default function PaymentForm() {
  return (
    <>
      <PayPalButton
        eventoId={1}
        quantity={1}
        tipoTicketId={1}
      />
    </>
  );
}