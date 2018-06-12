export const step1 = [
    {value:'男',label:'男'},
    {value:'女',label:'女'}
];

export const step2 = function () {
    let li =  [];
    for(let i=5;i<=150;i++){
        li.push({
            value:i.toString(),
            label:i.toString()
        });
    }
    return li;
}();

export const step3 = function () {
    let li =  [];
    for(let i=50;i<=250;i++){
        li.push({
            value:i.toString(),
            label:i.toString()
        });
    }
    return li;
}();


export const step4 = function () {
    let res = [];
    let intPart = [];
    let realPart = [];
    for(let i=20;i<=150;i++){
        intPart.push({
            value:i.toString(),
            label:i.toString()
        });
    }
    for(let i=0;i<=9;i++){
        realPart.push({
            value:'.'+i.toString(),
            label:'.'+i.toString()
        });
    }

    res.push(intPart);
    res.push(realPart);
    return res;
}();

export const step5 = [
    {value:'1型糖尿病',label:'1型糖尿病'},
    {value:'2型糖尿病',label:'2型糖尿病'},
    {value:'妊娠期糖尿病',label:'妊娠期糖尿病'},
    {value:'特殊糖尿病',label:'特殊糖尿病'},
    {value:'不清楚',label:'不清楚'},
];

export const step6 = step2;

export const step7 = [
    {value:'有',label:'有'},
    {value:'没有',label:'没有'}
];

export const step8 = [
    {value:'几乎没有',label:'几乎没有'},
    {value:'正常或稍高',label:'正常或稍高'},
    {value:'不清楚',label:'不清楚'}
];

export const step9 = [
    {value:'是',label:'是'},
    {value:'不是',label:'不是'},
];

export const step10 = [
    {value:'是',label:'是'},
    {value:'不是',label:'不是'},
    {value:'不清楚',label:'不清楚'}
];

export const step11 = [
    {value:'是',label:'是'},
    {value:'不是',label:'不是'}
];

export const step12 = [
    {value:'是',label:'是'},
    {value:'不是',label:'不是'}
];

export const step13 = [
    {value:'迅速',label:'迅速'},
    {value:'较慢',label:'较慢'}
];

export const step15 = function () {
    let now = new Date();
    let li =  [];
    for(let i=1980;i<=now.getFullYear();i++){
        li.push({
            value:i.toString(),
            label:i.toString()+'年'
        });
    }
    return li;
}();

export const step16 = [
    {value:'胰岛素',label:'胰岛素'},
    {value:'运动控制',label:'运动控制'},
    {value:'饮食控制',label:'饮食控制'},
    {value:'暂无',label:'暂无'}
];

export const step17 = [
    {value:'基础一针',label:'基础一针'},
    {value:'预混两针',label:'预混两针'},
    {value:'强化四针',label:'强化四针'}
];

export const step18 = [
    {value:'糖尿病足',label:'糖尿病足'},
    {value:'糖尿病眼',label:'糖尿病眼'},
    {value:'糖尿病肾',label:'糖尿病肾'},
    {value:'心血症',label:'心血症'},
    {value:'神经病变',label:'神经病变'},
    {value:'皮肤病变',label:'皮肤病变'},
    {value:'高血压',label:'高血压'},
    {value:'高血脂',label:'高血脂'},
    {value:'酮症或酮症中毒',label:'酮症或酮症中毒'}
];