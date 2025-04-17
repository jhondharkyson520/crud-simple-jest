import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../types/http";

export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({error: 'Internal Server Error'});
}
