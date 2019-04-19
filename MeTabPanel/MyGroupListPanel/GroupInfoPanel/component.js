

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight  } from 'react-native';
import {Button, NavBar, Card, List, Modal, Checkbox, Popover, Toast, InputItem,SwipeAction} from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommonListPanel from '../../CommonListPanel';
import httpRequest from "../../../httpRequest";
import {makeCommonImageUrl} from "../../../CommonComponent";


const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;


function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

class GroupInfoPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: <Text style={{fontSize:15,color:'black'}}>{navigation.state.params.GroupName}</Text>,
        headerStyle:{
            height:55,
        },
        headerRight:
            <TouchableOpacity
                onPress={navigation.state.params?navigation.state.params.ShowPopup:null}
                style={{paddingRight:12}}
            >
                <Icon name="ellipsis-h" size={23} color="black"/>
            </TouchableOpacity>


    });
    constructor(props){
        super(props);
        this.state =  {
            Refreshing:false,
            Data :[],
            Total: 0,
            PopupVisible : false,
            Host:false
        };
    }

    _dataWrapper = (initData) =>{
        return {
            key : initData['userId'].toString(),
            UserNickName :initData['userName'],
            UserImageUrl : initData['userImageUrl']
        };
    };

    requestGetUserListInGroup = (Data,sessionId,groupId)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/social/group/members', {
            params:{
                session_id:sessionId,
                group_id:groupId,
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total: data.total,
                        Host:data.host
                    })
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                alert(error);
                Toast.fail('网络好像有问题~');
            });
    };

    requestRemoveMemberInGroup = (sessionId,groupId,memberId)=>{
        httpRequest.post('/social/group/level', {
            session_id:sessionId,
            group_id:groupId,
            member_id:memberId,
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    let Data = this.state.Data.slice();
                    Data.splice(Data.findIndex(v=>v.key===memberId),1);
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total: this.state.Total - 1
                    })
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                alert(error);
                Toast.fail('网络好像有问题~');
            });
    };

    requestRemoveGroup = (sessionId,groupId)=>{
        const {goBack} = this.props.navigation;
        const {ChatPanelKey,backRefresh} = this.props.navigation.state.params;
        httpRequest.post('/social/group/remove', {
            session_id:sessionId,
            group_id:groupId,
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    Toast.success("解散成功");
                    backRefresh();
                    goBack(ChatPanelKey);
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
        const {sessionId}  = this.props;
        const {GroupId} = this.props.navigation.state.params;
        this.requestGetUserListInGroup([],sessionId,GroupId);
    };

    _clickPopover = ()=>{
        this.setState({
            PopupVisible : true
        });
    };

    componentDidMount(){
        const {sessionId}  = this.props;
        const {GroupId} = this.props.navigation.state.params;
        this.requestGetUserListInGroup([],sessionId,GroupId);
        this.props.navigation.setParams({
            ShowPopup : this._clickPopover
        });
    }


    _navigateToUser = (ToUserId) =>{
        const {userId} = this.props;
        const {navigate} = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _clickDeleteMember = (UserId)=>{
        const {GroupId} = this.props.navigation.state.params;
        const {sessionId}  = this.props;
        this.requestRemoveMemberInGroup(sessionId,GroupId,UserId);
    };

    _clickRemoveGroup = ()=>{
        const {GroupId,GroupName} = this.props.navigation.state.params;
        const {sessionId}  = this.props;
        Modal.alert("解散群组",`确定要解散${GroupName}吗？`,[
            {text:"确定", onPress:()=>{this.requestRemoveGroup(sessionId,GroupId)}},
            {text:"取消",onPress:()=>{}}
        ]);
    };

    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        const {userId} = this.props;
        if(userId.toString()===item.item.key){
            return (
                <List.Item
                    key={item.item.key}
                    thumb={
                        <Image
                            style={{
                                height:40,
                                width:40,
                                marginRight:10,
                                marginTop:10,
                                marginBottom:10,
                                borderRadius:20,
                            }}
                            source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}}
                        />
                    }
                    onClick={()=>{this._navigateToUser(item.item.key)}}
                >
                    <Text style={{fontSize:18,color:"black"}}>{item.item.UserNickName}</Text>
                </List.Item>
            );
        }else{
            return (
                <SwipeAction
                    style={{ backgroundColor: 'white' }}
                    autoClose
                    right={[
                        {
                            text: '删除',
                            onPress: ()=> {
                                Modal.alert("踢出成员",`确定要踢出${item.item.UserNickName}吗？`,[
                                    {text:"确定", onPress:()=>{this._clickDeleteMember(item.item.key)}},
                                    {text:"取消",onPress:()=>{}}
                                ])
                            },
                            style: { backgroundColor: '#F4333C', color: 'white',fontSize:16 },
                        },
                    ]}
                >
                    <List.Item
                        key={item.item.key}
                        thumb={
                            <Image
                                style={{
                                    height:40,
                                    width:40,
                                    marginRight:10,
                                    marginTop:10,
                                    marginBottom:10,
                                    borderRadius:20,
                                }}
                                source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}}
                            />
                        }
                        onClick={()=>{this._navigateToUser(item.item.key)}}
                    >
                        <Text style={{fontSize:18,color:"black"}}>{item.item.UserNickName}</Text>
                    </List.Item>
                </SwipeAction>
            );
        }
    };

    render(){
        const {GroupName} = this.props.navigation.state.params;
        const {userId} = this.props;
        return (
            <View style={{height:'100%',width:'100%',flex:1 ,backgroundColor:'white'}}>
                <List>
                    <List.Item extra={GroupName}>
                        群组名称
                    </List.Item>
                    <List.Item extra={"共"+this.state.Total+"人"}>
                        群成员
                    </List.Item>
                </List>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={false}
                    onRefresh={this._refresh}
                />
                <Modal
                    popup
                    visible={this.state.PopupVisible}
                    animationType="slide-up"
                    onClose={()=>{this.setState({PopupVisible:false})}}
                    maskClosable
                >
                    {
                        this.state.Host?
                            <List renderHeader={()=>
                                <Text style={{fontSize:18,textAlign:'center'}}>群组操作</Text>
                            }>
                                <List.Item>
                                    <Button type="warning" onClick={()=>{this._clickRemoveGroup()}}>解散群组</Button>
                                </List.Item>
                            </List>
                            :
                            <List renderHeader={()=>
                                <Text style={{fontSize:18,textAlign:'center'}}>群组操作</Text>
                            }>
                                <List.Item>
                                    <Button type="warning" onClick={()=>{this._clickDeleteMember(userId)}}>离开群组</Button>
                                </List.Item>
                            </List>
                    }

                </Modal>
            </View>
        );
    }

}

export default connect(mapStateToProps,null)(GroupInfoPanel);