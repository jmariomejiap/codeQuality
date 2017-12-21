import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.post('/',
  Controller.validateParams,
  Controller.parseJson,
  Controller.findProject,
  Controller.findBranch,
  Controller.createRecord,
  Controller.updateProject
);

export default router;
