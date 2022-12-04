import { NextFunction, Request, Response } from "express";
import ClientError from "../model/client-errors";
import jwt from "../utils/jwt";

async function verifyToken(request: Request, response: Response, next: NextFunction): Promise<void> {
    const isValid = await jwt.verifyToken(request);

    if (!isValid) {
        const error = new ClientError(401, "Invalid or expired token");
        next(error);
        return;
    }
    next();
}

export default verifyToken;