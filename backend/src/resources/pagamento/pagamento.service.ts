import { PayPalAccessTokenType } from "./pagamento.types";

export async function getPayPalTokenService (
    paypalClientId: string,
    paypalClientSecret: string
): Promise<string | undefined> {
    const auth = `${paypalClientId}:${paypalClientSecret}`;
    const data = 'grant_type=client_credentials';
    return await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
            },
            body: data
    })
    .then(async res => {
        const data = await res.json();
        return data.access_token;
    });

}

export async function createOrder (
    token: string,
    intent: string,
    value: number
) {
    let dadosCompraJSON = {
        'intent': intent,
        'purchase_units': [{
            'amount': {
                'currency_code': 'BRL',
                'value': value
            }
        }]
    };
    const dadosCompra = JSON.stringify(dadosCompraJSON);
    return await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: dadosCompra
    })
}