

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,WebView} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Progress} from 'antd-mobile';
import { GiftedChat } from 'react-native-gifted-chat';

const Brief = List.Item.Brief;

function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


class SugarGuidePanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: "糖导",
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
            <View style={{width:'100%',height:'100%'}}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        );
    }


}

export default connect(mapStateToProps,null)(SugarGuidePanel);