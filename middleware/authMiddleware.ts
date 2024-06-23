import express from 'express';
import { admin } from '../core/app';
import ApiError from '../entitities/ApiError';

export const authenticateUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const idToken = req.headers.authorization;
  admin.auth().verifyIdToken(idToken ?? "")
  .then((decodedToken) => {
    req.user = decodedToken;
    next();
  })
  .catch((error) => {
    if (error?.errorInfo?.code) {
      next(new ApiError(401, error?.errorInfo?.message, error?.errorInfo?.code));
    } 

    next(new ApiError(401, "Invalid Credentials", 'invalid-credentials'));
  });
};