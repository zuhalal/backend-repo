import express from 'express';

import { admin } from "../core/app";
import userCollection from "../repository/userCollection";
import ApiError from '../entitities/ApiError';

// should be put in firebase client
export const register = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { email, password, username } = req.body;

  if(!username) {
    throw new ApiError(400, "Name is Required", "missing-field");
  } else if (!password) {
    throw new ApiError(400, "Password is Required", "missing-field");
  } else if (!email) {
    throw new ApiError(400, "Email is Required", "missing-field");
  }

  admin.auth().createUser({
    email,
    password,
  }).then(async (userRecord: any) => {
    await userCollection.createUser({
      email,
      uid: userRecord.uid,
      username
    })  
    return res.status(200).json({ message: 'User registration successful' });
  })
  .catch((error: any) => {
    if (error?.errorInfo?.code) {
      return next(new ApiError(400, error?.errorInfo?.message, error?.errorInfo?.code));
    } 
    return res.status(500).json({ error: 'Server Error' });
  });
};

export const fetchUserData = async (req: express.Request, res: express.Response) => {
  try {
    const { uid } = req.user;
    const data = await userCollection.findUser(uid)
    return res.status(200).json({ message: "Successfully fetch user data", data })
  } catch (error: any) {
    if (error?.errorInfo?.code) {
      throw new ApiError(400, error?.errorInfo?.message, error?.errorInfo?.code)
    } 
    throw error;  
  }
}

export const updateUserData = async (req: express.Request, res: express.Response) => {
  try {
    const { uid } = req.user;
    //     const { username, address } = req.body;
    const { username, address } = req.query;
    const data = await userCollection.updateUserById(uid, { username: username?.toString(), address: address?.toString() })
    return res.status(200).json({ message: "Successfully update user data", data })
  } catch (error: any) {
    if (error?.errorInfo?.code) {
      throw new ApiError(400, error?.errorInfo?.message, error?.errorInfo?.code)
    } 
    throw error;
  }
}