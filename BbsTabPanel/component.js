

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight  } from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,Badge,Toast} from 'antd-mobile';
import {makeCommonImageUrl, UserImage} from '../CommonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import BbsSearchPanel from "./BbsSearchPanel/component";
import httpRequest from "../httpRequest";

const Brief = List.Item.Brief;



const BbsCss = StyleSheet.create({
    MainView :{
        backgroundColor:'#F5F5F5',
    },
    ItemSeparator : {
        height:5,
        backgroundColor:'#F5F5F5'
    },
    ItemContent:{
        paddingLeft:15,
        paddingRight:15
    },
    ItemImage:{
        marginRight:15,
        width:80,
        height:80
    }

});


function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

class BbsTabPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            Data: [],
            Refreshing : false
        };
    }


    _dataWrapper = (initData) =>{
        return {
            key : initData['topicId'].toString(),
            UserId : initData['userId'],
            UserNickName : initData['username'],
            UserImageUrl : initData['iconUrl'],
            LastPostTime : initData['lastTime'],
            Content : initData['content'],
            Images : [initData['picture1'],initData['picture2'],initData['picture3']],
            CommentCount : initData['replyNum']+initData['comNum']
        };
    };

    _getExistTopicList = () => {
        let list = this.state.Data;
        let nowList = [];
        for(let i=0;i<list.length;i++){
            nowList.push(list[i].key);
        }
        return nowList;
    };

    requestGetTopicList = (Data,sessionId,existTopicList,n)=>{
        this.setState({Refreshing:true});
        httpRequest.post('/getLastTopic', {
            session_id:sessionId,
            topicIdList:JSON.stringify(existTopicList),
            n:n
        })
            .then((response) => {
                let data = response.data;

                if (data['code'] === 0) {
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        Data:Data
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestGetTopicList([],sessionId,[],10);
    };

    componentDidMount(){
        const {sessionId}  = this.props;
        this.requestGetTopicList(this.state.Data.slice(),sessionId,this._getExistTopicList(),10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestGetTopicList(this.state.Data.slice(),sessionId,this._getExistTopicList(),10);
    };

    _navigateToUser =(ToUserId) =>{
        const {userId} = this.props;
        const { navigate } = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _renderItem = (item) =>{
        const { navigate } = this.props.navigation;
        return (
            <TouchableHighlight onPress={()=>{navigate('PostDetail',{topicId:item.item.key})}}>
                <Card full>
                    <Card.Header
                        title={<View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <View style={{flex:1}}>
                                <TouchableOpacity
                                    onPress={()=>this._navigateToUser(item.item.UserId)}
                                >
                                    <Text style={{color:'black'}}>{item.item.UserNickName}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:10}}>{item.item.LastPostTime}</Text>
                            </View>
                            <View style={{width:100,paddingLeft:15,flexDirection:'row',justifyContent:'flex-end'}}>
                                <Icon name="comment" size={15}/>
                                <Text style={{fontSize:12,marginLeft:3}}>{item.item.CommentCount}</Text>
                            </View>
                        </View>}
                        thumb={
                            <TouchableOpacity
                                onPress={()=>this._navigateToUser(item.item.UserId)}
                            >
                                <Image source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>
                            </TouchableOpacity>
                        }
                    />

                    <Card.Body >
                        <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:15}}>
                            {item.item.Content}
                        </Text>
                    </Card.Body>

                </Card>
            </TouchableHighlight>
        );
    };

    _separator = ()  => {
        return (
            <View style={BbsCss.ItemSeparator}><Text> </Text></View>
        );
    };


    render(){
        const { navigate } = this.props.navigation;
        return(

            <View style={{width:'100%',height:'100%'}}>
                <View style={{height:55,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:"#108EE9"}}>
                    <Text style={{fontSize:18,color:'white'}}>糖圈</Text>
                    <View style={{width:50,height:45,flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{navigate('BbsSearch')}} style={{paddingRight:10}}>
                            <Icon name="search" size={23} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigate('NewPost')}}>
                            <Icon name="plus" size={23} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={BbsCss.MainView}
                    data={this.state.Data}
                    initialNumToRender={3}
                    renderItem = {this._renderItem}
                    ItemSeparatorComponent = {this._separator}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }

}

export default connect(mapStateToProps,null)(BbsTabPanel);