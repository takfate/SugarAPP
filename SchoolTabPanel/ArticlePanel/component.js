

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace} from 'antd-mobile';
import * as Actions from "../MainF/actions";


const Brief = List.Item.Brief;


const ArticleCss = StyleSheet.create({
    MainView :{
        backgroundColor:'#F5F5F5',
    },
    ItemSeparator : {
        height:5,
        backgroundColor:'#F5F5F5'
    },
    ItemContent:{
        paddingLeft:15,
        paddingRight:15
    },
    ItemImage:{
        marginRight:15,
        width:80,
        height:80
    }

});



class ArticlePanel extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props;
        return(

            <View>

            </View>
        );
    }

}

export default connect()(ArticlePanel);