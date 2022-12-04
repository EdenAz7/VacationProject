//בניית רשת הגנה כללית, שתתפוס את הכל

import { NextFunction, Request, Response } from "express";

function catchAll(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  //print error to console
  console.log(err);

  //print error to file....

  //get status code
  const statusCode = err.status ? err.status : 500;

  //return error to frontend...
  response.status(statusCode).send(err.message);
}

export default catchAll;
