import React,{PropTypes,Component} from 'react';
import {View,Text,ScrollView,Image,TouchableWithoutFeedback} from 'react-native';
import {BaseUrl,wsUrl} from '../config';



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

export class RadiusButton extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <View
                style={{
                    backgroundColor:'green',
                    borderRadius:70,
                    width:140,
                    height:140,

                }}
            >
                <TouchableWithoutFeedback
                    hitSlop={{
                        top:60,
                        left:60,
                        right:60,
                        bottom:60
                    }}
                    onPressIn={this.props.onPressIn}
                    onPressOut={this.props.onPressOut}
                >
                    <View
                        style={{
                            backgroundColor:'green',
                            borderRadius:70,
                            width:140,
                            height:140,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Text style={{
                            fontSize:18,
                            color:'black',
                        }}
                        >
                            {this.props.text}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        );
    }
}


export const makeCommonImageUrl = (suffix) => {
    return BaseUrl + suffix;
};

export const GridImageURL  = (name)=>{
    return BaseUrl+'/static/appImg/'+name+'.png';
};

export const makeWebSocketUrl = (sessionId)=>{
    return `${wsUrl}/webSocket?session_id=${sessionId}`
};