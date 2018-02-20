import Project from '../../models/project';
import Branches from './../../models/branches';
import ProjectCommits from '../../models/commits';


const validateParams = (req, res, next) => {
  const token = req.body.token;
  const commitJson = req.body.commitJson;
  const author = req.body.author;
  const branch = req.body.branch;
  const commitHash = req.body.commitHash;
  const message = req.body.message;
  const date = req.body.date;

  if (!token || !commitJson || !author || !branch || !commitHash || !message || !date) {
    return res.status(404).json({ result: 'error', error: 'missing_params' });
  }

  return next();
};


const parseJson = (req, res, next) => {
  const coverage = req.body.commitJson;
  const { lines, statements, functions, branches } = coverage.total;

  if (!lines || !statements || !functions || !branches) {
    return res.status(404).json({ result: 'error', error: 'incomplete_json' });
  }

  req.coverage = coverage.total; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const findProject = async (req, res, next) => {
  const token = req.body.token;
  let projectDoc;

  try {
    projectDoc = await Project.find({ token });
  } catch (error) {
    return res.status(500).json({ result: 'error', error: 'internal_error' });
  }

  if (projectDoc.length === 0) {
    return res.status(404).json({ result: 'error', error: 'invalid_value_project' });
  }

  req.projectDoc = projectDoc[0]; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const findBranch = async (req, res, next) => {
  const projectId = req.projectDoc._id;
  const branch = req.body.branch;
  let branchesDoc;

  try {
    branchesDoc = await Branches.find({ name: branch, projectId });
  } catch (error) {
    return res.status(500).json({ result: 'error', error: 'internal_error' });
  }
  if (branchesDoc.length === 0) {
    // new branch
    await Branches.create({ projectId, name: branch });
  }
  return next();
};


/* istanbul ignore next */
const createRecord = async (req, res, next) => {
  const { lines, statements, functions, branches } = req.coverage;

  const commit = {
    projectId: req.projectDoc._id,
    branch: req.body.branch,
    commitDate: req.body.date,
    statementsCoveragePorcentage: statements.pct,
    functionsCoveragePorcentage: functions.pct,
    branchesCoveragePorcentage: branches.pct,
    linesCoveragePorcentage: lines.pct,
    fullTestCoverage: req.coverage,
    author: req.body.author,
    gitCommitHash: req.body.commitHash,
    message: req.body.message,
  };

  try {
    await ProjectCommits.create(commit);
  } catch (error) {
    return res.status(500).json({ result: 'error', error: 'internal_error' });
  }

  return next();
};


/* istanbul ignore next */
const updateProject = async (req, res) => {
  const projectId = req.projectDoc._id;

  try {
    await Project.findOneAndUpdate(projectId, { dateUpdated: new Date(), activeBranch: req.body.branch }, { upsert: false });
  } catch (error) {
    return res.status(500).json({ result: 'error', error: 'internal_error' });
  }
  return res.status(200).json({ result: 'ok', error: '' });
};


export { validateParams, parseJson, findProject, findBranch, createRecord, updateProject };
