import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.get('/',
  Controller.basicResponse
);

export default router;
