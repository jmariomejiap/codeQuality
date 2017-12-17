import Project from '../models/project';


/* istanbul ignore next */
const fetchProject = async (name) => {
  let projectDoc;

  try {
    projectDoc = await Project.find({ name });
  } catch (error) {
    return null;
  }

  if (projectDoc.length === 0) {
    return null;
  }

  return projectDoc;
};

export default fetchProject;
