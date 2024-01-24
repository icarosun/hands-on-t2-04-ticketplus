import { HttpInstance } from "../utils/http";

export async function logout () {
    return await HttpInstance.http.delete("/auth");
}