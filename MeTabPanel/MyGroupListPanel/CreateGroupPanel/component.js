

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight  } from 'react-native';
import {Button, NavBar, Card, List, ListView, Checkbox, Badge, Toast, InputItem,Tabs} from 'antd-mobile';
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


class CreateGroupPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle:"创建群组",
        headerStyle:{
            height:55,
        },
        headerRight:
            <TouchableOpacity
                onPress={navigation.state.params?navigation.state.params.createPress:null}
                style={{paddingRight:12}}
            >
                <Text style={{fontSize:18,color:"black"}}>创建</Text>
            </TouchableOpacity>
    });
    constructor(props){
        super(props);
        this.state =  {
            GroupName: '',
            Refreshing:false,
            SelectedUsers : [],
            SelectedCount : 0,
            FollowingUserData : [],
            RecommendUserData : [],
        };
    }


    _dataFollowingUserWrapper = (initData) =>{
        return {
            key : initData['followId'].toString(),
            UserNickName :initData['username'],
            UserImageUrl : initData['iconUrl'],
            selected:false,
        };
    };

    _dataRecommendUserWrapper = (initData) =>{
        return {
            key :initData['ID'].toString(),
            UserImageUrl: initData['HeadPortraitUrl'],
            UserNickName : initData['UserName'],
            selected:false,
        };
    };

    requestGetMyWatchList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/accounts/following', {
            params:{
                session_id:sessionId,
                begin_id:x,
                need_number:n
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataFollowingUserWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        FollowingUserData:Data,
                        Total:data.total,
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                alert(error);
                Toast.fail('网络好像有问题~');
            });
    };

    requestCreateGroup = (sessionId,GroupName,GroupMembers)=>{
        const { navigation } = this.props;
        Toast.loading("正在创建");
        httpRequest.post('/social/group/create', {
            session_id:sessionId,
            group_name:GroupName,
            group_members:JSON.stringify(Array.from(new Set(GroupMembers)))
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    Toast.success("创建成功");
                    navigation.goBack();
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                alert(error);
                Toast.fail('网络好像有问题~');
            });
    };

    requestGetRecommendUserList = (sessionId)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/social/recommend', {
            params:{
                session_id:sessionId,
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    let Data = [];
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataRecommendUserWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        RecommendUserData:Data
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _clickCreateGroup = ()=>{
        const {sessionId}  = this.props;
        this.requestCreateGroup(sessionId,this.state.GroupName,this.state.SelectedUsers)
    };

    componentDidMount(){
        const {sessionId}  = this.props;
        this.props.navigation.setParams({
            createPress : this._clickCreateGroup
        });
        this.requestGetMyWatchList([],sessionId,0,15);
        this.requestGetRecommendUserList(sessionId);
    }


    _loadFollowingUserMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestGetMyWatchList(this.state.FollowingUserData.slice(),sessionId,
            this.state.FollowingUserData.length,10);
    };


    _navigateToUser =(ToUserId) =>{
        const {userId} = this.props;
        const {navigate} = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _renderFollowingUserItem = (item)=>{
        const { navigate } = this.props.navigation;
        return (
            <CheckboxItem
                key={item.item.key}
                checked={item.item.selected}
                onChange={
                    (ev)=>{
                        let newData = this.state.FollowingUserData.slice();
                        newData[item.index]=  {
                            ...newData[item.index],
                            selected:ev.target.checked
                        };
                        let newList = this.state.SelectedUsers.slice();
                        if(ev.target.checked){
                            newList.push(item.item.key);
                        }else{
                            newList.splice(newList.findIndex((v)=>v===item.item.key),1);
                        }
                        this.setState({
                            FollowingUserData:newData,
                            SelectedUsers:newList,
                            SelectedCount: new Set(newList).size
                        })
                    }
                }
            >
                <Text style={{fontSize:18,Color:"black"}}>{item.item.UserNickName}</Text>
            </CheckboxItem>

        ) ;
    };

    _renderRecommendUserItem = (item)=>{
        const { navigate } = this.props.navigation;
        return (
            <CheckboxItem
                key={item.item.key}
                checked={item.item.selected}
                onChange={
                    (ev)=>{
                        let newData = this.state.RecommendUserData.slice();
                        newData[item.index]=  {
                            ...newData[item.index],
                            selected:ev.target.checked
                        };
                        let newList = this.state.SelectedUsers.slice();
                        if(ev.target.checked){
                            newList.push(item.item.key);
                        }else{
                            newList.splice(newList.findIndex((v)=>v===item.item.key),1);
                        }
                        this.setState({
                            RecommendUserData:newData,
                            SelectedUsers:newList,
                            SelectedCount: new Set(newList).size
                        })
                    }
                }
            >
                <Text style={{fontSize:18,Color:"black"}}>{item.item.UserNickName}</Text>
            </CheckboxItem>

        ) ;
    };

    _updateGroupName = (value)=>{
        this.setState({GroupName:value})
    };

    render(){
        const tabs = [
            {title:"推荐"},
            {title:"关注"}
        ];
        // alert(JSON.stringify(this.state.SelectedUsers)+JSON.stringify(this.state.SelectedMap));
        return (
            <View style={{height:'100%',width:'100%',flex:1 ,backgroundColor:'white'}}>
                <List>
                    <InputItem
                        clear
                        maxLength={8}
                        defaultValue={this.state.GroupName}
                        onChange={this._updateGroupName}
                    >
                        群组名称
                    </InputItem>
                    <List.Item extra={"已选择"+this.state.SelectedCount+"个成员"}>
                        选择好友
                    </List.Item>
                </List>
                <Tabs tabs={tabs} >
                    <View   style={{backgroundColor:'white'}}>
                        <CommonListPanel
                            RealData = {this.state.RecommendUserData}
                            InitNum = {10}
                            RenderItem = {this._renderRecommendUserItem}
                            style={{height:'100%'}}
                            refreshing={this.state.Refreshing}
                        />
                    </View>
                    <View style={{backgroundColor:'white'}}>
                        <CommonListPanel
                            RealData = {this.state.FollowingUserData}
                            InitNum = {10}
                            RenderItem = {this._renderFollowingUserItem}
                            style={{height:'100%'}}
                            refreshing={this.state.Refreshing}
                            onEndReached={this._loadFollowingUserMoreData}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                </Tabs>
            </View>
        );
    }

}

export default connect(mapStateToProps,null)(CreateGroupPanel);