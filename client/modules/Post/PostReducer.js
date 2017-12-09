import { ADD_POST, ADD_POSTS, DELETE_POST, INCREASE_COUNTER } from './PostActions';

// Initial State
const initialState = { data: [], counter: 1 };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_COUNTER :
      return {
        ...state,
        counter: state.counter ? state.counter + 1 : 1,
      };

    case ADD_POST :
      return {
        ...state,
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        ...state,
        data: action.posts,
      };

    case DELETE_POST :
      return {
        ...state,
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

export const getCounter = state => state.posts.counter;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default PostReducer;
