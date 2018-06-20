

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity  } from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Badge} from 'antd-mobile';
import {makeCommonImageUrl} from '../CommonComponent';

const Brief = List.Item.Brief;


const MeCss = StyleSheet.create({
    MainView :{
        backgroundColor:'#F5F5F5',
        paddingBottom:20,
    },
    HeaderItem : {
        backgroundColor:"#108EE9"
    },
    HeaderImage :{
        width:64,
        height:64,
        borderColor:"#2994BD",
        borderRadius:2,
        borderWidth:2

    },
    HeaderItemText:{
        fontSize:18,
        color:'white',
    },
    HeaderItemBrief:{
        color:'white',
    },
    CommonItem : {
        backgroundColor:"#108EE9"
    },
    CommonItemText :  {
        fontSize:18,
        color:'black',
    }
});


function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


class MeTabPanel extends Component{

    constructor(props){
        super(props);
    }

    _safePhone = (phone) =>{
        let temp = '';
        for(let i=0;i<phone.length;i++){
            if(i>=3&&i<=6){
                temp+='*'
            }else{
                temp+=phone[i];
            }
        }
        return temp;
    };

    render(){
        const { navigate } = this.props.navigation;
        const {sessionId,userId,loginUserInfo} = this.props;
        return(

            <View style={{width:'100%',height:'100%'}}>
                <View style={{height:55,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:"#108EE9"}}>
                    <Text style={{fontSize:18,color:'white'}}>我的</Text>
                    <TouchableOpacity onPress={()=>{navigate('Settings')}}>
                        <Text style={{fontSize:18,color:'white'}} >设置</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={MeCss.MainView}>
                    <List >
                        <List.Item
                            arrow='horizontal'
                            onClick={()=>{navigate('UserInfo',{isLoginUser:true,UserId:userId})}}
                            style={MeCss.HeaderItem}
                            thumb={
                                <Badge style={{marginRight:15}} text="Lv4">
                                    <Image source={{uri:makeCommonImageUrl(loginUserInfo.HeadImageUrl)}} style={MeCss.HeaderImage}/>
                                </Badge>
                            }
                        >
                            <Brief> </Brief>
                            <Text style={MeCss.HeaderItemText}>{loginUserInfo.NickName}</Text>
                            <Brief style={MeCss.HeaderItemBrief}>{this._safePhone(loginUserInfo.Phone)}</Brief>
                            <Brief> </Brief>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{navigate('MyWatchList',{sessionId:sessionId,userId:userId.toString()})}} >
                            <Text style={MeCss.CommonItemText}>我关注的人</Text>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{navigate('WatchMeList',{sessionId:sessionId,userId:userId.toString()})}}>
                            <Text style={MeCss.CommonItemText}>关注我的人</Text>
                        </List.Item>

                        {/*<List.Item arrow='horizontal' onClick={()=>{}}>*/}
                            {/*<Text style={MeCss.CommonItemText}>我的消息</Text>*/}
                        {/*</List.Item>*/}
                    </List>
                    <WhiteSpace size="xl"/>
                    <List >
                        <List.Item arrow='horizontal' onClick={()=>{navigate('MyCollectedArticleList',{sessionId:sessionId})}}>
                            <Text style={MeCss.CommonItemText}>我收藏的文章</Text>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{navigate('MyCommentList',{sessionId:sessionId})}}>
                            <Text style={MeCss.CommonItemText}>我的评论</Text>
                        </List.Item>
                    </List>
                    <WhiteSpace size="xl"/>
                    <List >
                        <List.Item arrow='horizontal' onClick={()=>{navigate('MyPublishedTopicList',{sessionId:sessionId})}}>
                            <Text style={MeCss.CommonItemText}>我发布的话题</Text>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{navigate('MyCollectedTopicList',{sessionId:sessionId})}}>
                            <Text style={MeCss.CommonItemText}>我收藏的话题</Text>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{navigate('MyResponseList',{sessionId:sessionId})}}>
                            <Text style={MeCss.CommonItemText}>我的回复</Text>
                        </List.Item>
                    </List>

                </ScrollView>
            </View>
        );
    }

}

export default connect(mapStateToProps,null)(MeTabPanel);