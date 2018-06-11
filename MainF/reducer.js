import * as ActionTypes from './actionTypes';

const MainFState = {
    selectedTab : "Home",
    sessionId : 'a13b6160-bd23-3710-a150-41d800dd30b4',
    userId : 34,
    // sessionId : null,
    // userId : null,
    loginUserInfo : {
        HeadImageUrl : '/static/userImg/usertile27.jpg',
        NickName : 'tankwoks',
        // HeadImageUrl : '',
        // NickName : '',
        Phone : '18061532353',
        Score : ''
    },

};

const reducer = function(state = MainFState,action){
    switch (action.type){
        case ActionTypes.SELECT_TAB:
            return {...state,selectedTab:action.new_tab};
        case ActionTypes.CHANGE_TO_LOGIN_STATE:
            return {...state,sessionId:action.sessionId,userId:action.userId,loginUserInfo:{
                    ...state.loginUserInfo,HeadImageUrl:action.iconUrl,NickName:action.nickName,Phone:action.Phone
                }
            };
        default:
            return state;
    }
};

export default reducer;