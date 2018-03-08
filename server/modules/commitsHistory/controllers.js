import ProjectCommits from '../../models/commits';

const validateParams = (req, res, next) => {
  const projectId = req.query.projectId;
  const branch = req.query.branch;
  const limit = (!req.query.limit) ? 80 : parseInt(req.query.limit, 10); // modified from 20 to 80

  if (!projectId || !branch || !limit) {
    return res.status(404).json({ result: 'error', error: 'missing_params' });
  }

  req.limit = limit; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const findCommits = async (req, res, next) => {
  const projectId = req.query.projectId;
  const branch = req.query.branch;
  const limit = req.limit;


  let commitsDoc;

  try {
    commitsDoc = await ProjectCommits.find({ projectId, branch }).sort({ commitDate: 'descending' }).limit(limit);
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
  const commitsHistory = req.commitsDoc.sort((commitA, commitB) => {
    return new Date(commitA.commitDate) - new Date(commitB.commitDate);
  });

  return res.status(200).json({ result: 'ok', commitsHistory });
};


export { validateParams, findCommits, sendHistory };
