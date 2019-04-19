

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, Image, StyleSheet, RefreshControl, TouchableOpacity} from 'react-native';
import {Button, NavBar, Card, List, ListView, WhiteSpace, Progress, Toast} from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat';
import httpRequest from "../../../httpRequest";
import {makeCommonImageUrl} from "../../../CommonComponent";



function mapStateToProps(state) {
    return state.MainF;
}


class GroupChatPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: <Text style={{fontSize:15,color:'black'}}>{navigation.state.params.GroupName}</Text>,
        headerStyle:{
            height:55,
        },
        headerRight:
            <TouchableOpacity
                onPress={navigation.state.params?navigation.state.params.settingPress:null}
                style={{paddingRight:12}}
            >
                <Icon name="gear" size={23} color="black"/>
            </TouchableOpacity>
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
                    _id: messageList[i]["senderId"],
                    name:messageList[i]["senderUserName"],
                    avatar: makeCommonImageUrl(messageList[i]["imageUrl"]),
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

    requestSendMessageToUser = (sessionId,content,GroupId)=>{
        httpRequest.post('/social/group/chatting/send', {
            session_id:sessionId,
            content:content,
            group_id : GroupId
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

    requestGetLatestMessageList = (sessionId,GroupId,LatestMessageId,NeedNumber)=>{
        if (this.LatestDataLoading){
            return ;
        }
        this.LatestDataLoading = true;
        httpRequest.get('/social/group/chatting/records/latest', {
            params:{
                session_id:sessionId,
                group_id:GroupId,
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

    requestGetHistoryMessageList = (sessionId,GroupId,OldestMessageId,NeedNumber)=>{
        this.setState({refreshing:true});
        httpRequest.get('/social/group/chatting/records', {
            params:{
                session_id:sessionId,
                group_id:GroupId,
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

    _clickGroupSetting = ()=>{
        const {sessionId}  = this.props;
        const {navigate} = this.props.navigation;
        const {GroupId,GroupName,backRefresh} = this.props.navigation.state.params;
        navigate("GroupInfo",{
            GroupId:GroupId,
            GroupName:GroupName,
            ChatPanelKey:this.props.navigation.state.key,
            backRefresh:backRefresh
        });
    };

    loadMoreHistory = ()=>{
        const {GroupId} = this.props.navigation.state.params;
        const {sessionId} = this.props;
        let lastId = 0;
        if(this.state.messages.length > 0){
            lastId = this.state.messages[this.state.messages.length - 1]._id;
        }
        this.requestGetHistoryMessageList(sessionId,GroupId,lastId,10);
    };

    componentWillMount(){
        const {GroupId} = this.props.navigation.state.params;
        const {sessionId} = this.props;
        this.requestGetHistoryMessageList(sessionId,GroupId,0,10);
    };

    componentDidMount(){
        const {sessionId} = this.props;
        const {GroupId} = this.props.navigation.state.params;
        this.LatestDataLoading = false;
        this.updateMessageTimer = setInterval(()=>{
            let latestId = 0;
            if(this.state.messages.length > 0){
                latestId = this.state.messages[0]._id;
            }
            this.requestGetLatestMessageList(sessionId,GroupId,latestId,10);
        },2000);
        this.props.navigation.setParams({
            settingPress : this._clickGroupSetting,
        });
    }

    componentWillUnmount(){
        clearInterval(this.updateMessageTimer);
    }

    onSend = (messages = [])=> {
        const {sessionId} = this.props;
        const {GroupId} = this.props.navigation.state.params;
        this.requestSendMessageToUser(sessionId,messages[0].text,GroupId);
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
                renderUsernameOnMessage
                onPressAvatar={this._clickUserAvatar}
            />

        );
    }


}

export default connect(mapStateToProps,null)(GroupChatPanel);