

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Switch } from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';


const SecretSettingCss = StyleSheet.create({
    MainView:{
        backgroundColor:'#F5F5F5'
    },
    ItemText :  {
        fontSize:18,
        color:'black',
    }
});

class SecretSettingPanel extends Component{
    static navigationOptions = {
        headerTitle:"隐私设置",
        headerStyle:{
            height:55,
        },

    };
    constructor(props){
        super(props);
    }

    render(){

        return(
            <ScrollView style={SecretSettingCss.MainView}>
                <List >

                    <List.Item   extra={<Switch />}>
                        <Text style={SecretSettingCss.ItemText}>隐藏等级</Text>
                    </List.Item>
                    <List.Item extra={<Switch />}>
                        <Text style={SecretSettingCss.ItemText}>隐藏手机号码</Text>
                    </List.Item>

                    <List.Item extra={<Switch />}>
                        <Text style={SecretSettingCss.ItemText}>隐藏性别</Text>
                    </List.Item>

                    <List.Item extra={<Switch />}>
                        <Text style={SecretSettingCss.ItemText}>隐藏年龄</Text>
                    </List.Item>
                    <List.Item extra={<Switch />}>
                        <Text style={SecretSettingCss.ItemText}>隐藏职业</Text>
                    </List.Item>
                    <List.Item  extra={<Switch />}>
                        <Text style={SecretSettingCss.ItemText}>隐藏所在地</Text>
                    </List.Item>

                    <List.Item extra={<Switch />}>
                        <Text style={SecretSettingCss.ItemText}>隐藏身高</Text>
                    </List.Item>
                    <List.Item extra={<Switch />}>
                        <Text style={SecretSettingCss.ItemText}>隐藏体重</Text>
                    </List.Item>
                </List>
            </ScrollView>
        );
    }

}

export default connect()(SecretSettingPanel);