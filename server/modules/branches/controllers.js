import Branches from './../../models/branches';

const validateProjectId = (req, res, next) => {
  if (!req.query.projectId) {
    return res.status(404).json({ result: 'error', error: 'invalid_value' });
  }
  req.projectId = req.query.projectId; // eslint-disable-line no-param-reassign
  return next();
};

export { validateProjectId };
