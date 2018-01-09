/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import branches from './modules/App/BranchReducer';
import projects from './modules/App/ProjectsReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  branches,
  projects,
});
