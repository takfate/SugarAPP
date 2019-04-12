

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace} from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

const Brief = List.Item.Brief;


class MyMessagePanel extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props.navigation;
        return(

            <View>

            </View>
        );
    }

}

export default connect()(MyMessagePanel);