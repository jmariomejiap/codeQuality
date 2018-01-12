/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import branches, { activeBranch } from './modules/App/components/reducers/BranchReducer';
import projects from './modules/App/components/reducers/ProjectsReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  branches,
  activeBranch,
  projects,
});
