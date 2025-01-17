import { Request, Response, NextFunction } from "express";


export function setLangCookie(req: Request, res: Response, next: NextFunction) {
  if (!("lang" in req.cookies)) res.cookie("lang", "pt-BR");
  next();
}
