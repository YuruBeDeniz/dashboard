import { Request } from 'express';
import 'vite/client';

declare global {
  namespace Express {
    interface Request {
      payload?: { 
        _id: string;
        name: string;
      }
    }
  }
}
