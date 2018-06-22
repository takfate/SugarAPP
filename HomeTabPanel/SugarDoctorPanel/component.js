

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,Clipboard} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Progress} from 'antd-mobile';
import { GiftedChat ,Send} from 'react-native-gifted-chat';
import {GridImageURL,makeCommonImageUrl} from "../../CommonComponent";
import httpRequest from "../../httpRequest";
import {Toast} from "antd-mobile/lib/index";

const Brief = List.Item.Brief;

function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

class SugarDoctorPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: "智能医生",
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

    componentWillMount(){
        this.setState({
            messages: this.makeBotMessage('1','你好，我是糖医生，你有什么问题尽管问我，我一定知无不言，言无不尽！'),
        })
    };

    requestSendQuestion = (sessionId,Question)=>{
        httpRequest.post('/sugarDoctor', {
            session_id:sessionId,
            question : Question
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    let answer = this.makeBotMessage(data['answerId'],data['answer']);
                    this.setState(previousState => ({
                        messages: GiftedChat.append(previousState.messages, answer),
                    }))
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    onSend = (messages = [])=> {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        const {sessionId} = this.props;
        this.requestSendQuestion(sessionId,messages[0].text);
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
                placeholder='输入您的问题'
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

export default connect(mapStateToProps,null)(SugarDoctorPanel);