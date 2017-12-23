import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.get('/',
  Controller.validateParams,
  Controller.findCommits,
  Controller.sendHistory
);

export default router;

