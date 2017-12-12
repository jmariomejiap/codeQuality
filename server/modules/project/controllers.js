import _ from 'lodash';
import Project from '../../models/project';

/* istanbul ignore next */
const findProject = async(name) => {
  let projectDoc = [];

  try {
    projectDoc = await Project.find({ name });
  } catch (error) {
    /* istanbul ignore next */
    console.error(error); // eslint-disable-line no-console
    return null;
  }

  if (projectDoc.length === 0) {
    return null;
  }

  return projectDoc[0];
};


const validateProjectName = (req, res, next) => {
  if (!req.body.projectName) {
    return res.status(404).json({ result: 'error', error: 'invalid_value' });
  }

  req.projectName = req.body.projectName; // eslint-disable-line no-param-reassign
  return next();
};


const verifyProjectName = (req, res, next) => {
  const projectName = req.projectName;

  if (!_.isString(projectName)) {
    return res.status(404).json({ result: 'error', error: 'invalid_parameter_type' });
  }

  if (!/^[a-zA-Z]/.test(projectName)) {
    return res.status(404).json({ result: 'error', error: 'invalid_valueRegex' });
  }

  return next();
};


/* istanbul ignore next */
const findProjects = async (req, res, next) => {
  const name = req.projectName;
  let projectDoc = [];

  try {
    projectDoc = await Project.find({ name });
  } catch (error) {
    /* istanbul ignore next */
    console.error(error); // eslint-disable-line no-console
    projectDoc = null;
  }

  if (projectDoc.length === 0) {
    projectDoc = null;
  }

  req.projectDoc = projectDoc; // eslint-disable-line no-param-reassign
  return next();
};


/* istanbul ignore next */
const saveProject = async (req, res) => {
  const name = req.projectName;
  const projectDoc = req.projectDoc;

  if (projectDoc) {
    return res.status(404).json({ result: 'error', error: 'project_already_exist' });
  }

  const project = {
    name,
    token: 'token',
    dateCreated: new Date(),
    dateUpdated: new Date(),
    isActive: true,
  };

  let newProjectDoc;
  try {
    newProjectDoc = await Project.create(project);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error); // eslint-disable-line no-console
    return res.status(500).json({ result: 'error', error: 'internal_error' });
  }

  return res.status(200).json({ result: 'ok', name, saved: newProjectDoc });
};

export { validateProjectName, verifyProjectName, findProjects, saveProject };
