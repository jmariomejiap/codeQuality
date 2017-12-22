import ProjectCommits from '../../models/commits';

const validateParams = (req, res, next) => {
  const token = req.query.token;
  const branch = req.query.branch;
  const limit = (!req.query.limit) ? 20 : parseInt(req.query.limit, 10);

  if (!token || !branch || !limit) {
    return res.status(404).json({ result: 'error', error: 'missing_params' });
  }

  req.limit = limit; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const findCommits = async (req, res, next) => {
  const token = req.query.token;
  const branch = req.query.branch;

  let commitsDoc;

  try {
    commitsDoc = await ProjectCommits.find({ token, branch });
  } catch (error) {
    return res.status(500).json({ result: 'error', error: 'internal_error' });
  }

  if (commitsDoc.length === 0) {
    return res.status(404).json({ result: 'error', error: 'invalid_value_commits' });
  }

  req.commitsDoc = commitsDoc; // eslint-disable-line no-param-reassign
  return next();
};


const sendHistory = (req, res) => {
  const limit = req.limit;
  const arrayCommits = req.commitsDoc.sort((commitA, commitB) => {
    return commitA.commitDate - commitB.commitDate;
  });

  const commitsHistory = arrayCommits.slice(0, limit);

  return res.status(200).json({ result: 'ok', commitsHistory });
};


export { validateParams, findCommits, sendHistory };
