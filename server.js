import express, { json } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './Middlewares/error-handler.js';
import dotenv from 'dotenv' ;

import userRoutes from './Routes/UserRoutes.js'
import productRoutes from './Routes/ProductRoutes.js'
import carRoutes from './Routes/CarRoutes.js'
import entretienRoutes from './Routes/EntretienRoutes.js'

const app = express();
const port = process.env.PORT || 9090;
dotenv.config();

const databaseName = 'car';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
.connect(`mongodb://127.0.0.1:27017/${databaseName}`)
.then(() => {
  console.log(`Connected to ${databaseName}`);
})
.catch(err => {
  console.log(err);
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img',express.static('img'))
app.use(errorHandler)
app.set('view engine', 'ejs');


app.use('/user',userRoutes)
app.use('/product',productRoutes)
app.use('/car',carRoutes)
app.use('/entretien',entretienRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})