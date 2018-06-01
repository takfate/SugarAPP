import * as ActionTypes from './actionTypes';

export const select_tab = (new_tab) =>{
  return {
      type:ActionTypes.SELECT_TAB,
      new_tab:new_tab
  }
};