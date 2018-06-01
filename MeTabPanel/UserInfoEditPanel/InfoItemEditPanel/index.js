
import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,InputItem,Picker} from 'antd-mobile';
import * as ItemData from './Items';


export class NickNameEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"昵称",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state = {
            NickName: "震天八荒"
        }
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <InputItem
                    clear
                    maxLength={8}
                    value={this.state.NickName}

                >
                    昵称
                </InputItem>
            </List>
        );
    }
}



export class GenderEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"性别",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state = {
            Gender: "男"
        };

    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ItemData.genders}
                    cols={1}
                    title="选择性别"
                    extra={this.state.Gender }
                >
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
            </List>
        );
    }
}




export class AgeEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"年龄",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state = {
            Age: "18"
        };
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ItemData.ages}
                    cols={1}
                    title="选择年龄"
                    extra={this.state.Age}
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
        this.state = {
            Job: "学生"
        };
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <InputItem
                    clear
                    maxLength={8}
                    value={this.state.Job }
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
        this.state = {
            Location: "湖南省 衡阳市"
        };
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ItemData.Locations}
                    cols={2}
                    title="选择所在地"
                    extra={this.state.Location}
                    itemStyle={{
                        fontSize:15
                    }}
                >
                    <List.Item arrow="horizontal">所在地</List.Item>
                </Picker>
            </List>
        );
    }
}



export class HeightEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"身高",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state = {
            Height: "180cm"
        };
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ItemData.Heights}
                    cols={1}
                    title="选择身高"
                    extra={this.state.Height}
                >
                    <List.Item arrow="horizontal">身高</List.Item>
                </Picker>
            </List>
        );
    }
}



export class WeightEditPanel extends  Component{
    static navigationOptions = {
        headerTitle:"体重",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state = {
            Weight: "76.6kg"
        };
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ItemData.Weights}
                    cols={1}
                    title="选择体重"
                    extra={this.state.Weight}
                >
                    <List.Item arrow="horizontal">体重</List.Item>
                </Picker>
            </List>
        );
    }
}