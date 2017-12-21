import Project from '../../models/project';
import Branches from './../../models/branches';
import ProjectCommits from '../../models/commits';


const validateParams = (req, res, next) => {
  const token = req.body.token;
  const commitJson = req.body.commitJson;
  const author = req.body.author;
  const branch = req.body.branch;
  const commitHash = req.body.commitHash;

  if (!token || !commitJson || !author || !branch || !commitHash) {
    return res.status(404).json({ result: 'error', error: 'invalid_value' });
  }

  return next();
};


const parseJson = (req, res, next) => {
  const coverage = JSON.parse(req.body.commitJson);
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

  req.projectDoc = projectDoc; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const findBranch = async (req, res, next) => {
  const token = req.body.token;
  const branch = req.body.branch;
  let branchesDoc;

  try {
    branchesDoc = await Branches.find({ name: branch });
  } catch (error) {
    return res.status(500).json({ result: 'error', error: 'internal_error' });
  }

  if (branchesDoc.length === 0) {
    // new branch
    await Branches.create({ token, name: branch });
  }

  return next();
};


/* istanbul ignore next */
const createRecord = async (req, res, next) => {
  const commit = {
    token: req.body.token,
    branch: req.body.branch,
    commitDate: new Date(),
    testCoveragePorcentages: req.coverage,
    author: req.body.author,
    gitCommitHash: req.body.commitHash,
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
  const token = req.body.token;

  try {
    await Project.update({ token }, { $set: { dateUpdated: new Date() } });
  } catch (error) {
    return res.status(500).json({ result: 'error', error: 'internal_error' });
  }

  return res.status(200).json({ result: 'ok', error: '' });
};


export { validateParams, parseJson, findProject, findBranch, createRecord, updateProject };
