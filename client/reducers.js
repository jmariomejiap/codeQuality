/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import branches, { activeBranch } from './modules/App/components/reducers/BranchReducer';
import projects from './modules/App/components/reducers/ProjectsReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  branches,
  activeBranch,
  projects,
});
