import * as ActionTypes from './actionTypes';

const SchoolState = {
    ArticleSimpleData : [
        {
            key:"1",
            Title:"糖友，生活规律，别睡懒觉",
            Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
            Image:""
        }, {
            key:"2",
            Title:"222222222",
            Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
            Image:""
        },{
            key:"3",
            Title:"333333333",
            Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
            Image:""
        },{
            key:"4",
            Title:"444444444",
            Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
            Image:""
        },{
            key:"5",
            Title:"555555555",
            Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
            Image:""
        },
    ],
    Refreshing:false
};

const reducer = function(state=SchoolState,action){
    switch (action.type){
        default:
            return state;
    }
};

export default reducer;