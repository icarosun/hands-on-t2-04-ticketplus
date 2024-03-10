import { HttpInstance } from "../utils/http";

export interface GetPayPalTokenType {
    clientId: string;
    dataClientToken: string;
}

export async function getPayPalToken (): Promise<GetPayPalTokenType | null> {
    const res = await HttpInstance.http.post("/pagamento/getPayPalToken");
    return res.data;
}