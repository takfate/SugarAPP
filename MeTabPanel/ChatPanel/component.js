

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, Image, StyleSheet, RefreshControl} from 'react-native';
import {Button, NavBar, Icon, Card, List, ListView, WhiteSpace, Progress, Toast} from 'antd-mobile';
import { GiftedChat } from 'react-native-gifted-chat'
import httpRequest from "../../httpRequest";
import {GridImageURL, makeCommonImageUrl} from "../../CommonComponent";

const Brief = List.Item.Brief;


function mapStateToProps(state) {
    return state.MainF;
}

class ChatPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: <Text style={{fontSize:15,color:'black'}}>{navigation.state.params.TargetUserName}</Text>,
        headerStyle:{
            height:55,
        }
    });

    constructor(props){
        super(props);
        this.state = {
            messages: [],
            refreshing:false,
        };
    }

    makeUserMessage = (id,Content)=>{
        const {userId,loginUserInfo}  = this.props;
        return [
            {
                _id: id,
                text: Content,
                createdAt: new Date(),
                user: {
                    _id: userId,
                    name: loginUserInfo.NickName,
                    avatar: makeCommonImageUrl(loginUserInfo.HeadImageUrl),
                },
            },
        ];
    };

    messageWrapper = (messageList)=>{
        const {TargetUserId,TargetUserName,TargetUserImageUrl} = this.props.navigation.state.params;
        const {userId,loginUserInfo} = this.props;
        let messages = [];

        for(let i=0;i<messageList.length;i++){
            let user = {};
            if (messageList[i]["host"]) {
                user = {
                    _id: userId,
                    name:loginUserInfo.NickName,
                    avatar: makeCommonImageUrl(loginUserInfo.HeadImageUrl),
                }
            }else{
                user = {
                    _id: TargetUserId,
                    name:TargetUserName,
                    avatar: makeCommonImageUrl(TargetUserImageUrl),
                }
            }
            messages.push({
                _id:messageList[i]["messageId"],
                text:messageList[i]["content"],
                createdAt:messageList[i]["createdAt"],
                user: user
            }) ;
        }
        return messages;
    };

    requestSendMessageToUser = (sessionId,userId,content,TargetUserId)=>{
        httpRequest.post('/social/chatting/send', {
            session_id:sessionId,
            content:content,
            target_user_id : TargetUserId
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    let messages = this.makeUserMessage(data["messageId"],content);
                    this.setState(previousState => ({
                        messages: GiftedChat.append(previousState.messages, messages),
                    }));
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    requestGetLatestMessageList = (sessionId,TargetUserId,LatestMessageId,NeedNumber)=>{
        if (this.LatestDataLoading){
            return ;
        }
        this.LatestDataLoading = true;
        httpRequest.get('/social/chatting/records/latest', {
            params:{
                session_id:sessionId,
                target_user_id:TargetUserId,
                latest_message_id : LatestMessageId,
                need_number:NeedNumber
            }

        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    let newMessages = this.messageWrapper(data);
                    this.setState(previousState => ({
                        messages: GiftedChat.append(previousState.messages, newMessages),
                    }));
                    this.LatestDataLoading = false;
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };
    requestGetHistoryMessageList = (sessionId,TargetUserId,OldestMessageId,NeedNumber)=>{
        this.setState({refreshing:true});
        httpRequest.get('/social/chatting/records', {
            params:{
                session_id:sessionId,
                target_user_id:TargetUserId,
                oldest_message_id : OldestMessageId,
                need_number:NeedNumber
            }

        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    let newMessages = this.messageWrapper(data);
                    this.setState(previousState => ({
                        messages: GiftedChat.prepend(previousState.messages, newMessages),
                    }));
                    this.setState({refreshing:false});
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    

    loadMoreHistory = ()=>{
        const {TargetUserId} = this.props.navigation.state.params;
        const {sessionId} = this.props;
        let lastId = 0;
        if(this.state.messages.length > 0){
            lastId = this.state.messages[this.state.messages.length - 1]._id;
        }
        this.requestGetHistoryMessageList(sessionId,TargetUserId,lastId,10);
    };

    componentWillMount(){
        const {TargetUserId} = this.props.navigation.state.params;
        const {sessionId,userId} = this.props;
        this.requestGetHistoryMessageList(sessionId,TargetUserId,0,10)
    };

    componentDidMount(){
        const {sessionId} = this.props;
        const {TargetUserId} = this.props.navigation.state.params;
        this.LatestDataLoading = false;
        this.updateMessageTimer = setInterval(()=>{
            let latestId = 0;
            if(this.state.messages.length > 0){
                latestId = this.state.messages[0]._id;
            }
            this.requestGetLatestMessageList(sessionId,TargetUserId,latestId,10);
        },2000)
    }

    componentWillUnmount(){
        clearInterval(this.updateMessageTimer);
    }

    onSend = (messages = [])=> {
        const {sessionId,userId} = this.props;
        const {TargetUserId} = this.props.navigation.state.params;
        this.requestSendMessageToUser(sessionId,userId,messages[0].text,TargetUserId);
    };

    _navigateToUser =(ToUserId) =>{
        const {userId} = this.props;
        const { navigate } = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _clickUserAvatar = (user)=>{
        this._navigateToUser(user._id)
    };

    render(){
        const { navigate } = this.props.navigation;
        const {userId,loginUserInfo}  = this.props;
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: userId,
                    name:loginUserInfo.NickName,
                    avatar:loginUserInfo.HeadImageUrl
                }}
                style={{width:'100%',height:'100%'}}
                loadEarlier
                onLoadEarlier={this.loadMoreHistory}
                isLoadingEarlier={this.state.refreshing}
                showUserAvatar
                showAvatarForEveryMessage
                onPressAvatar={this._clickUserAvatar}
            />

        );
    }


}

export default connect(mapStateToProps,null)(ChatPanel);