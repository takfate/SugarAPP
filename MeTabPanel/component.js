

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity  } from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Badge} from 'antd-mobile';
import {UserImage} from '../CommonComponent';

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

class MeTabPanel extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props.navigation;
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
                            onClick={()=>{navigate('UserInfo',{
                                IsLoginUser :true,
                                UserId : '100'
                            })}}
                            style={MeCss.HeaderItem}
                            thumb={
                                <Badge style={{marginRight:15}} text="Lv4">
                                    <Image source={require('./head.jpg')} style={MeCss.HeaderImage}/>
                                </Badge>
                            }
                        >
                            <Brief> </Brief>
                            <Text style={MeCss.HeaderItemText}>震天八荒</Text>
                            <Brief style={MeCss.HeaderItemBrief}>910904072@qq.com</Brief>
                            <Brief> </Brief>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{navigate('MyWatchList')}} >
                            <Text style={MeCss.CommonItemText}>我关注的人</Text>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{navigate('WatchMeList')}}>
                            <Text style={MeCss.CommonItemText}>关注我的人</Text>
                        </List.Item>

                        <List.Item arrow='horizontal' onClick={()=>{}}>
                            <Text style={MeCss.CommonItemText}>我的消息</Text>
                        </List.Item>
                    </List>
                    <WhiteSpace size="xl"/>
                    <List >
                        <List.Item arrow='horizontal' onClick={()=>{}}>
                            <Text style={MeCss.CommonItemText}>我发布的话题</Text>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{}}>
                            <Text style={MeCss.CommonItemText}>我回复的话题</Text>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{}}>
                            <Text style={MeCss.CommonItemText}>我收藏的话题</Text>
                        </List.Item>
                    </List>
                    <WhiteSpace size="xl"/>
                    <List >
                        <List.Item arrow='horizontal' onClick={()=>{}}>
                            <Text style={MeCss.CommonItemText}>我收藏的文章</Text>
                        </List.Item>
                        <List.Item arrow='horizontal' onClick={()=>{}}>
                            <Text style={MeCss.CommonItemText}>我评论的文章</Text>
                        </List.Item>
                    </List>
                </ScrollView>
            </View>
        );
    }

}

export default connect()(MeTabPanel);