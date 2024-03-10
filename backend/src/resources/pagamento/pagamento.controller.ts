import { Request, Response } from "express";
import dotenv from "dotenv";

import { getPayPalTokenService } from "./pagamento.service";
import { PayPalAccessTokenType } from "./pagamento.types";

dotenv.config();

const PAYPAL_CLIENT_ID = String(process.env.PAYPAL_CLIENT_ID);
const PAYPAL_CLIENT_SECRET = String(process.env.PAYPAL_CLIENT_SECRET);

async function getPayPalToken (req: Request, res: Response) {
    if (PAYPAL_CLIENT_ID === "undefined" || PAYPAL_CLIENT_SECRET === undefined)
        return res.status(401).json({ msg: "Informe todas as credenciais" });
    try {
        const access_token = await getPayPalTokenService(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
        console.log(`access_token = ${access_token}`);
        if (!access_token)
            return res.status(401).json({ msg: "Credenciais inválidas" });
        return res.status(200).json({
            clientId: PAYPAL_CLIENT_ID,
            dataClientToken: access_token
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { getPayPalToken }