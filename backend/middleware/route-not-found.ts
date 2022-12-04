import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../model/client-errors";

function routeNotFound(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const err = new RouteNotFoundError(request.originalUrl);
  next(err);
}

export default routeNotFound;
