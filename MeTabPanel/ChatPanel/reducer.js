import * as ActionTypes from './actionTypes';

const UserInfoState = {
    IsLoginedUser :false,
    UserInfo : {
        ImageSrc : "./head.jpg",
        NickName  : "震天八荒",
        Age : 18,
        Location : "湖南省 衡阳市",
        Gender : "男",
        Height:"180cm",
        Width:"89kg",
        Job : "学生"
    }
};

const reducer = function(state,action){
    switch (action.type){
        default:
            return state;
    }
};

export default reducer;