import { Router } from 'express';
import * as Controller from './controllers';

const router = new Router();

router.post('/',
  Controller.validateProjectName,
  Controller.verifyProjectName,
  Controller.findProjects,
  Controller.saveProject
);

export default router;
