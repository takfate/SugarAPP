import * as ActionTypes from './actionTypes';

const MainFState = {
  selectedTab : "Home"
};

const reducer = function(state = MainFState,action){
  switch (action.type){
      case ActionTypes.SELECT_TAB:
        return {...state,selectedTab:action.new_tab};
      default:
        return state;
  }
};

export default reducer;