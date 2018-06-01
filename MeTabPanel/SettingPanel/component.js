

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace} from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';


const SetCss = StyleSheet.create({
    MainView:{
        backgroundColor:'#F5F5F5'
    },
    ItemText :  {
        fontSize:18,
        color:'black',
    }
});

class SettingPanel extends Component{
    static navigationOptions = {
        headerTitle:"设置",
        headerStyle:{
            height:55,
        },

    };
    constructor(props){
        super(props);
    }

    render(){

        return(
            <ScrollView style={SetCss.MainView}>
                <List >

                    <List.Item arrow='horizontal' onClick={()=>{}} >
                        <Text style={SetCss.ItemText}>设置1</Text>
                    </List.Item>
                    <List.Item arrow='horizontal' onClick={()=>{}}>
                        <Text style={SetCss.ItemText}>设置2</Text>
                    </List.Item>

                    <List.Item arrow='horizontal' onClick={()=>{}}>
                        <Text style={SetCss.ItemText}>设置3</Text>
                    </List.Item>
                </List>
                <WhiteSpace size="xl"/>
                <List >
                    <List.Item arrow='horizontal' onClick={()=>{}}>
                        <Text style={SetCss.ItemText}>设置4</Text>
                    </List.Item>
                    <List.Item arrow='horizontal' onClick={()=>{}}>
                        <Text style={SetCss.ItemText}>设置5</Text>
                    </List.Item>
                    <List.Item arrow='horizontal' onClick={()=>{}}>
                        <Text style={SetCss.ItemText}>设置6</Text>
                    </List.Item>
                </List>
                <WhiteSpace size="xl"/>
                <List >
                    <List.Item arrow='horizontal' onClick={()=>{}}>
                        <Text style={SetCss.ItemText}>设置7</Text>
                    </List.Item>
                    <List.Item arrow='horizontal' onClick={()=>{}}>
                        <Text style={SetCss.ItemText}>设置8</Text>
                    </List.Item>
                </List>
            </ScrollView>
        );
    }

}

export default connect()(SettingPanel);