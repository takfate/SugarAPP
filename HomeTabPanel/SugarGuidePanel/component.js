

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,WebView,Clipboard} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Progress,Toast} from 'antd-mobile';
import { GiftedChat,Send } from 'react-native-gifted-chat';
import {GridImageURL, makeCommonImageUrl, makeWebSocketUrl} from "../../CommonComponent";
import httpRequest from "../../httpRequest";

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
            messages: [],
        };
    }

    makeBotMessage = (id,content) =>{
        return [
            {
                _id: id,
                text: content,
                createdAt: new Date(),
                user: {
                    _id: 0,
                    name: 'Doctor',
                    avatar: GridImageURL('doctor'),
                },
            },
        ];
    };

    componentDidMount(){
        const {sessionId} = this.props;
        this.ws = new WebSocket(makeWebSocketUrl(sessionId));
        // this.ws.onopen = (evt) => {
        //     Toast.info('连接打开',1);
        // };

        this.ws.onmessage = (evt) => {
            let data = JSON.parse(evt.data);
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, this.makeBotMessage(data.questionId,data.msg)),
            }));
        };

        this.ws.onerror = (evt)=>{
            Toast.info('网络好像有问题~',1);
        };

        // this.ws.onclose = (evt) => {
        //     Toast.info('连接关闭',1);
        // };
    };

    componentWillUnmount(){
        this.ws.close();
    }

    onSend = (messages = [])=> {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        this.ws.send(messages[0].text);
    };

    onPress = (context,message)=>{
        if (message.text) {
            const options = [
                '复制内容',
                '取消',
            ];
            const cancelButtonIndex = options.length - 1;
            context.actionSheet().showActionSheetWithOptions({
                    options,
                    cancelButtonIndex,
                },
                (buttonIndex) => {
                    switch (buttonIndex) {
                        case 0:
                            Clipboard.setString(message.text);
                            break;
                    }
                });
        }
    };


    render(){
        const { navigate } = this.props.navigation;
        const {userId} = this.props;
        const {HeadImageUrl,NickName} = this.props.loginUserInfo;

        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: userId,
                    name: NickName,
                    avatar: makeCommonImageUrl(HeadImageUrl),
                }}
                placeholder='输入您的回答'
                renderSend={(props)=>{
                    return (
                        <Send
                            {...props}
                        >
                            <View style={{marginRight: 10, marginBottom: 10}}>
                                <Text style={{color:'#0084FF',fontSize:17}}>发送</Text>
                            </View>
                        </Send>
                    );
                }}
                showUserAvatar={true}
                onLongPress={this.onPress}
            />
        );
    }

}

export default connect(mapStateToProps,null)(SugarGuidePanel);