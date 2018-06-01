

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace} from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

const Brief = List.Item.Brief;


const MyMessageCss = StyleSheet.create({
    MainView :{
        backgroundColor:'#F5F5F5',
        paddingBottom:20
    },
    HeaderItem : {
        backgroundColor:"#108EE9"
    },
    HeaderImage :{
        width:64,
        height:64,
        marginRight:15,
        borderColor:"#2994BD",
        borderRadius:2,
        borderWidth:2

    },
    HeaderItemText:{
        fontSize:18,
        color:'white',
    },
    HeaderItemBrief:{
        color:'white',
    },
    CommonItem : {
        backgroundColor:"#108EE9"
    },
    CommonItemText :  {
        fontSize:18,
        color:'black',
    }
});

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