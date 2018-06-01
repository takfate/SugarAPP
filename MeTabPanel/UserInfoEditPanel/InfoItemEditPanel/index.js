
import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,InputItem,Picker} from 'antd-mobile';



export class NickNameEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"昵称",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <InputItem
                    clear
                    maxLength={8}
                    value={"震天八荒"}
                >
                    昵称
                </InputItem>
            </List>
        );
    }
}

const genders = [
    {
        value:'male',
        label:'男'
    },
    {
        value:'female',
        label:'女'
    }
];

export class GenderEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"性别",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={genders}
                    cols={1}
                    title="选择性别"
                    extra="男"
                >
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
            </List>
        );
    }
}


const ages = function () {
    let li =  [];
    for(let i=10;i<=150;i++){
        li.push({
            value:i.toString(),
            label:i.toString()
        });
    }
    return li;
}();

export class AgeEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"年龄",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ages}
                    cols={1}
                    title="选择年龄"
                    extra="18"
                >
                    <List.Item arrow="horizontal">年龄</List.Item>
                </Picker>
            </List>
        );
    }
}

export class JobEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"职业",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <InputItem
                    clear
                    maxLength={8}
                    value={"学生"}
                >
                    职业
                </InputItem>
            </List>
        );
    }
}


export class LocationEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"所在地",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ages}
                    cols={1}
                    title="选择所在地"
                    extra="湖南省 衡阳市"
                >
                    <List.Item arrow="horizontal">所在地</List.Item>
                </Picker>
            </List>
        );
    }
}

const Heights = function () {
    let li =  [];
    for(let i=50;i<=250;i++){
        li.push({
            value:i.toString(),
            label:i.toString()+"cm"
        });
    }
    return li;
}();

export class HeightEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"身高",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={Heights}
                    cols={1}
                    title="选择身高"
                    extra="180cm"
                >
                    <List.Item arrow="horizontal">身高</List.Item>
                </Picker>
            </List>
        );
    }
}

const Weights = function () {
    let li =  [];
    for(let i=20;i<=99;i++){
        li.push({
            value:i.toString()+'.0',
            label:i.toString()+'.0 kg'
        });
        li.push({
            value:i.toString()+'.5',
            label:i.toString()+'.5 kg'
        });
    }
    li.push({
        value:'100.0',
        label:'100.0 kg'
    });
    return li;
}();


export class WeightEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"体重",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={Weights}
                    cols={1}
                    title="选择体重"
                    extra="76.6kg"
                >
                    <List.Item arrow="horizontal">体重</List.Item>
                </Picker>
            </List>
        );
    }
}