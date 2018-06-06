

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Progress} from 'antd-mobile';
import { GiftedChat } from 'react-native-gifted-chat'

const Brief = List.Item.Brief;


const ChatCss = StyleSheet.create({
    MainView :{
        backgroundColor:'#F5F5F5',
        paddingBottom:20,
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

class ChatPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: "震天八荒",
        headerStyle:{
            height:55,
        }
    });

    constructor(props){
        super(props);
        this.state = {
            messages: []
        };
    }

    componentWillMount(){
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    };

    onSend = (messages = [])=> {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    };

    render(){
        const { navigate } = this.props.navigation;
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        );
    }


}

export default connect()(ChatPanel);