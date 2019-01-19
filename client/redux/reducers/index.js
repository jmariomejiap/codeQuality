/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import branches from './BranchReducer';
import projects from './ProjectsReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  branches,
  projects
});
