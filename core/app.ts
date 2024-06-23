import express from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import "express-async-errors";
import cors from 'cors';
// import bodyParser from 'body-parser';

import router from '../routes/userRoutes';
import { errorHandler } from '../middleware/errors';
import serviceKeyAccount from '../serviceKeyAccount.json'

dotenv.config();

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceKeyAccount),
}); 

const db = admin.firestore();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

app.use(cors(options))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
  res.send('Hello World');
});

// /api
app.use('/api', router);
app.use(errorHandler);

export { app, admin, db };