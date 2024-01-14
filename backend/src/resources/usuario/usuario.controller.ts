import { Request, Response } from "express";
import { listaUsuarios } from "./usuario.service";


export async function index (req: Request, res: Response) {
    try {
        const usuarios = await listaUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(error);
    }
}