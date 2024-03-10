import { PayPalAccessTokenType } from "./pagamento.types";

export async function getPayPalTokenService (
    paypalClientId: string,
    paypalClientSecret: string
): Promise<string | null> {
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
        }).catch(err => {
            console.log(err);
        })

}