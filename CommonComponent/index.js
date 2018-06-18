import React,{PropTypes,Component} from 'react';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {BaseUrl} from '../config';



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


export const makeCommonImageUrl = (suffix) => {
    return BaseUrl + suffix;
};

export const GridImageURL  = (name)=>{
    return BaseUrl+'/static/appImg/'+name+'.png';
};
