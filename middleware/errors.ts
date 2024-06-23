import express, { NextFunction } from "express";
import ApiError from "../entitities/ApiError";

export const errorHandler = (err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.getStatusCode()).send(err.getResponse());
  }
  console.error(err)
  return res.status(500).send(
    {
      error: "server-error",
      code: 500,
      message: "Something went wrong in the server"
    }
  );
};