import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.post('/',
  Controller.validateParams,
  Controller.parseJson,
  Controller.good
);

export default router;
