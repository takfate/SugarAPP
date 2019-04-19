import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    FlatList,
    Image
} from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,List,Card,Toast,Carousel,Grid } from 'antd-mobile';

import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";
import {TodaySugarChart ,LongSugarChart} from '../items';
import {makeCommonImageUrl} from "../../CommonComponent";
import md5 from 'js-md5';
import CommonListPanel from "../../MeTabPanel/CommonListPanel";

const Brief  = List.Item.Brief;


function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {

}



export class MessageListPanel extends Component{

    static navigationOptions = {
        headerTitle:"消息",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state =  {
            Data : [],
            Refreshing:false,
            ExistGroup :[],
            ExistU2u:[]
        };
    }


    _groupDataWrapper = (initData) =>{
        return {
            type: "group",
            key : "group" + initData['groupId'].toString(),
            message :initData['content'],
            groupName : initData["groupName"],
            senderUserName : initData['senderUserName'],
            updatedTime : new Date(initData["updatedTime"]),
            groupId : initData['groupId'].toString()
        };
    };

    _u2uDataWrapper = (initData) =>{
        return {
            type: "u2u",
            key : "u2u" + initData['otherId'].toString(),
            message :initData['content'],
            otherImageUrl : initData['otherImageUrl'],
            otherUserName : initData['otherUserName'],
            updatedTime : new Date(initData["updatedTime"]),
            userId : initData['otherId'].toString()
        };
    };

    _sortMessages = (messages) => {
        messages = messages.sort((a,b)=>{
            return b.updatedTime - a.updatedTime;
        });
        return messages;
    };

    requestMessageList = (ExGroupData,ExU2uData,Data,sessionId,ExistList,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/social/messages', {
            params:{
                session_id:sessionId,
                exist_list:JSON.stringify(ExistList),
                need_number:n
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    let groupMessages = data['groupMessages'];
                    let u2uMessages = data['u2uMessages'];
                    for(let i=0;i<groupMessages.length;i++){
                        Data.push(this._groupDataWrapper(groupMessages[i]));
                        ExGroupData.push(groupMessages[i]["groupId"])
                    }
                    for(let i=0;i<u2uMessages.length;i++){
                        Data.push(this._u2uDataWrapper(u2uMessages[i]));
                        ExU2uData.push(u2uMessages[i]["otherId"])
                    }
                    this.setState({
                        Refreshing:false,
                        Data:this._sortMessages(Data),
                        Total:data.total,
                        ExistGroup: ExGroupData,
                        ExistU2u : ExU2uData
                    });
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                alert(error);
                Toast.fail('网络好像有问题~');
            });
    };


    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId} = this.props;
        let existList = {
            groupIds:[],
            u2uIds :[]
        };
        this.requestMessageList([],[],[], sessionId,existList,100);
    };

    componentWillMount(){
        const {sessionId} = this.props;
        let existList = {
            groupIds:[],
            u2uIds :[]
        };
        this.requestMessageList([],[],[], sessionId,existList,100);
    }

    componentDidMount(){
        const {sessionId} = this.props;
        this.updateTimer = setInterval(()=>{
            if(this.state.Refreshing)return ;
            let existList = {
                groupIds:[],
                u2uIds :[]
            };
            this.requestMessageList([],[],[], sessionId,existList,100);
        },4000)
    }

    componentWillUnmount(){
        clearInterval(this.updateTimer);
    }

    _navigateToUser =(ToUserId) =>{
        const {userId} = this.props.navigation.state.params;
        const {navigate} = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        if (item.item.type === "group") {
            return (
                <List.Item
                    thumb={
                        <Image
                            style={{
                                height:56,
                                width:56,
                                marginRight:10,
                                marginTop:10,
                                marginBottom:10,
                                borderRadius:28,
                            }}
                            source={require('./head.jpg')}
                        />
                    }
                    onClick={()=>{navigate("GroupChat",{GroupId:item.item.groupId,GroupName:item.item.groupName})}}
                    extra={<Text>{item.item.updatedTime.getHours()+":"+item.item.updatedTime.getMinutes()}</Text>}
                >
                    <Text style={{color:'black',fontSize:18}}>{item.item.groupName}</Text>
                    <Brief style={{fontSize:15}}>{item.item.message}</Brief>
                </List.Item>
            );
        }else{
            return(
                <List.Item
                    thumb={
                        <Image
                            style={{
                                height:56,
                                width:56,
                                marginRight:10,
                                marginTop:10,
                                marginBottom:10,
                                borderRadius:28,
                            }}
                            source={{uri:makeCommonImageUrl(item.item.otherImageUrl)}}
                        />
                    }
                    onClick={()=>{navigate('Chat', {
                        TargetUserName: item.item.otherUserName,
                        TargetUserId:item.item.userId,
                        TargetUserImageUrl:item.item.otherImageUrl
                    })}}
                    extra={<Text>{item.item.updatedTime.getHours()+":"+item.item.updatedTime.getMinutes()}</Text>}
                >
                    <Text style={{color:'black',fontSize:18}}>{item.item.otherUserName}</Text>
                    <Brief style={{fontSize:15}}>{item.item.message}</Brief>
                </List.Item>

            );
        }
    };

    render(){
        // alert(new Date("2018-06-07T23:24:00+08:00"));
        return (
            <View style={{height:'100%',width:'100%'}}>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={false}
                    onRefresh={this._refresh}
                />
            </View>
        );
    }
}


export default connect(mapStateToProps,null)(MessageListPanel);