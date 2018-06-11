

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace} from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

const Brief = List.Item.Brief;


export class UserImage extends Component{
    render(){
        const {ImageUrl} = this.props;
        return (
            <Image source={{uri:"http://5b0988e595225.cdn.sohucs.com/images/20170828/ef6a2855c7904bb9b641aab4644b99f3.jpeg"}}
                   style={{
                       width:64,
                       height:64,
                       marginRight:15,
                       borderColor:"#2994BD",
                       borderRadius:2,
                       borderWidth:2
                   }}
            />
        );
    }
}

export const BaseUrl = 'http://120.27.48.66';

export const makeCommonImageUrl = (suffix) => {
    return BaseUrl + suffix;
};

export const GridImageURL  = (name)=>{
    return BaseUrl+'/static/appImg/'+name+'.png';
};


