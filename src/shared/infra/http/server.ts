import 'reflect-metadata';
import 'dotenv/config';

import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
//para mostrar a imagem (forma estatica)
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

// tratativa de erros tem que ser depois das rotas
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
});

app.listen(3333, () => {
  console.log('🚀 server started on port 3333');
});
