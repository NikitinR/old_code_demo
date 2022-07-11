import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isSidebarMinimized: false,
};

const toggleSidebar = (state) => {
  return {
    ...state,
    isSidebarMinimized: !state.isSidebarMinimized,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR:
      return toggleSidebar(state, action);
    default:
      return state;
  }
};

export default reducer;
