

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
        const {navigate} = this.props.navigation;
        return(
            <ScrollView style={SetCss.MainView}>
                <List >

                    <List.Item arrow='horizontal' onClick={()=>{navigate('SecretSetting')}} >
                        <Text style={SetCss.ItemText}>隐私设置</Text>
                    </List.Item>
                </List>
                <WhiteSpace size="xl"/>
                <List >
                    <List.Item >
                        <Button type="warning">登出账号</Button>
                    </List.Item>

                </List>

            </ScrollView>
        );
    }

}

export default connect()(SettingPanel);