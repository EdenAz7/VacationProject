import { NextFunction, Request, Response } from "express";
import ClientError from "../model/client-errors";
import Role from "../model/Role";
import jwt from "../utils/jwt";

async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {
    const isValid = await jwt.verifyToken(request);
    if (!isValid) {
        const error = new ClientError(401, "Invalid or expired token");
        next(error);
        return;
    }

    const user = jwt.getUserFromToken(request);

    if (user.is_admin !== Role.Admin) {
        const error = new ClientError(403, "You are not authorized");
        next(error);
        return;
    }
    next();
}

export default verifyAdmin;