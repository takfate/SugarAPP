
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

    }

    _updateNickName = (value)=>{
        this.props.navigation.state.params.onUpdate('NickName',value);
    };

    render(){
        return (
            <List style={{marginTop:15}}>
                <InputItem
                    clear
                    maxLength={8}
                    defaultValue={this.props.navigation.state.params.data}
                    onChange={this._updateNickName}
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
            Gender: [props.navigation.state.params.data]
        };

    }

    _updateGender = (value) => {
        this.setState({Gender:value});
        this.props.navigation.state.params.onUpdate('Gender',value[0]);
    };

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ItemData.genders}
                    cols={1}
                    title="选择性别"
                    extra={this.state.Gender}
                    value={this.state.Gender}
                    onChange={this._updateGender}
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
            Age: [props.navigation.state.params.data]
        };
    }

    _updateAge = (value)=>{
        this.setState({Age:value});
        this.props.navigation.state.params.onUpdate('Age',value[0]);
    };

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ItemData.ages}
                    cols={1}
                    title="选择年龄"
                    extra={this.state.Age}
                    value={this.state.Age}
                    onChange={this._updateAge}
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

    _updateJob = (value)=>{
        this.props.navigation.state.params.onUpdate('Job',value);
    };

    render(){
        return (
            <List style={{marginTop:15}}>
                <InputItem
                    clear
                    maxLength={10}
                    defaultValue={this.props.navigation.state.params.data}
                    onChange={this._updateJob}
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
            Location: props.navigation.state.params.data===null?[,]:
                props.navigation.state.params.data.split(',')
        };
    }

    _updateLocation = (value)=>{
        this.setState({Location:value});
        this.props.navigation.state.params.onUpdate('Location',value[0]+','+value[1]);
    };

    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ItemData.Locations}
                    cols={2}
                    title="选择所在地"
                    extra={this.state.Location}
                    value={this.state.Location}
                    onChange={this._updateLocation}
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
            Height: [props.navigation.state.params.data]
        };
    }

    _updateHeight = (value)=>{
        this.setState({Height:value});
        this.props.navigation.state.params.onUpdate('Height',value[0]);
    };


    render(){
        return (
            <List style={{marginTop:15}}>
                <Picker
                    data={ItemData.Heights}
                    cols={1}
                    title="选择身高(cm)"
                    extra={this.state.Height}
                    value={this.state.Height}
                    onChange={this._updateHeight}
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
    }

    render(){
        return (
            <List style={{marginTop:15}}>
                <List.Item  extra={this.props.navigation.state.params.data}>体重</List.Item>
            </List>
        );
    }
}