import * as ActionTypes from './actionTypes';

export const select_tab = (newTab) =>{
    return {
        type:ActionTypes.SELECT_TAB,
        new_tab:newTab
    }
};

export const change_to_login_state = (sessionId,userId,nickName,iconUrl,Phone,isAttend)=>{
    return {
        type:ActionTypes.CHANGE_TO_LOGIN_STATE,
        sessionId:sessionId,
        userId:userId,
        nickName:nickName,
        iconUrl:iconUrl,
        Phone:Phone,
        isAttend : isAttend
    }
};

export const guide_clear = (NavKey) => {
    return {
        type : ActionTypes.GUIDE_CLEAR,
        NavKey: NavKey
    }
};

export const guide_update = (updateItem)=> {
    return {
        type:ActionTypes.GUIDE_UPDATE,
        updateItem:updateItem
    }
};