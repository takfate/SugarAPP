import * as ActionTypes from './actionTypes';

const MainFState = {
    selectedTab : "Home",
    sessionId : null,
    userId : null,
    loginUserInfo : {
        HeadImageUrl : "",
        NickName : '',
        Phone : '',
        Gender  : '',
        Age : '',
        Job : '',
        Location : '',
        Height: '',
        Weight : '',
        Score : ''
    },

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