

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight  } from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,Badge,Toast} from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";
import CommonListPanel from '../CommonListPanel';


function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

class MyGroupListPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle:"我的群组",
        headerStyle:{
            height:55,
        },
        headerRight:
            <TouchableOpacity
                onPress={()=>{navigation.navigate('CreateGroup',{
                    backRefresh:navigation.state.params?navigation.state.params.backRefresh:null
                })}}
                style={{paddingRight:12}}
            >
                <Icon name="plus" size={23} />
            </TouchableOpacity>
    });
    constructor(props){
        super(props);
        this.state =  {
            Data : [],
            Refreshing:false,
            Total : 0
        };
    }


    _dataWrapper = (initData) =>{
        return {
            key : initData['groupId'].toString(),
            GroupName :initData['name'],
            MemberCount : initData['memberCount'],
            Host: initData['host']
        };
    };

    requestGetGroupList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/social/groups', {
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
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total:data.total
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
        if(this.state.Refreshing) return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetGroupList([],sessionId,0,10);
    };

    componentDidMount(){
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetGroupList(this.state.Data.slice(),sessionId,0,10);
        this.props.navigation.setParams({backRefresh:this._refresh})
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetGroupList(this.state.Data.slice(),sessionId,this.state.Data.length,10);
    };

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
        return (
            <TouchableHighlight
                onPress={()=>{navigate("GroupChat",{
                    GroupId:item.item.key,
                    GroupName:item.item.GroupName,
                    backRefresh: this._refresh
                })}}
            >
                <Card full>
                    <Card.Header
                        title={item.item.GroupName+`(${item.item.MemberCount})`}
                        extra={item.item.Host?"由我创建":""}
                    >
                    </Card.Header>
                </Card>
            </TouchableHighlight>

        ) ;
    };

    render(){
        return (
            <View style={{height:'100%',width:'100%'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12}}>
                    <Text >共加入了有{this.state.Total}个群组</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }

}

export default connect(mapStateToProps,null)(MyGroupListPanel);