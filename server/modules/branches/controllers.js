import Branches from './../../models/branches';


const validateToken = (req, res, next) => {
  if (!req.query.token) {
    return res.status(404).json({ result: 'error', error: 'invalid_value' });
  }

  req.token = req.query.token; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const getBranches = async (req, res) => {
  const token = req.token;
  let branches;

  try {
    branches = await Branches.find({ token });
  } catch (error) {
    return res.status(500).json({ result: 'error', error: 'internal_error' });
  }

  if (branches.length === 0) {
    return res.status(404).json({ result: 'error', error: 'invalid_value' });
  }
  return res.status(200).json({ result: 'ok', branches });
};

export { validateToken, getBranches };
