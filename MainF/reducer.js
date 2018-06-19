import * as ActionTypes from './actionTypes';

const MainFState = {
    selectedTab : "Home",
    sessionId : null,
    userId : null,
    loginUserInfo : {
        HeadImageUrl : '',
        NickName : '',
        Phone : '',
        Score : '',
        isAttend : false
    },
    sugarGuide : {
        gender : '男',
        age : '30',
        height : '160',
        weight : '70.5',
        sugarType : '1型糖尿病',
        diseaseAge : '30',
        akin : '有',
        fm : '几乎没有',
        manyDrinkWC : '是',
        poison :'是',
        thirsty:'是',
        visionDown : '是',
        diseaseSpeed : '迅速',
        verifyYear : '2018',
        cureWay : '',
        dsPlan : '基础一针',
        complication :'',
        navigationKey : ''
    }

};

const reducer = function(state = MainFState,action){
    switch (action.type){
        case ActionTypes.SELECT_TAB:
            return {...state,selectedTab:action.new_tab};
        case ActionTypes.CHANGE_TO_LOGIN_STATE:
            return {...state,sessionId:action.sessionId,userId:action.userId,loginUserInfo:{
                    ...state.loginUserInfo,HeadImageUrl:action.iconUrl,NickName:action.nickName,Phone:action.Phone,
                    isAttend:action.isAttend
                }
            };
        case ActionTypes.GUIDE_CLEAR:
            return {
                ...state,sugarGuide:{
                    gender : '男',
                    age : '30',
                    height : '160',
                    weight : '70.5',
                    sugarType : '1型糖尿病',
                    diseaseAge : '30',
                    akin : '有',
                    fm : '几乎没有',
                    manyDrinkWC : '是',
                    poison :'是',
                    thirsty:'是',
                    visionDown : '是',
                    diseaseSpeed : '迅速',
                    verifyYear : '2018',
                    cureWay : '',
                    dsPlan : '基础一针',
                    complication :'',
                    navigationKey : action.NavKey
                }
            };
        case ActionTypes.GUIDE_UPDATE:
            return {
                ...state,sugarGuide:{
                    ...state.sugarGuide,
                    ...action.updateItem
                }
            };
        default:
            return state;
    }
};

export default reducer;