

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Progress} from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

const Brief = List.Item.Brief;


const UserInfoCss = StyleSheet.create({
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
        marginRight:15,
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

class UserInfoPanel extends Component{
    static navigationOptions = {
        headerTitle:"糖友信息",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <ScrollView style={UserInfoCss.MainView}>
                <List >

                    <List.Item
                        thumb={ <Image source={require('./head.jpg')} style={UserInfoCss.HeaderImage}/>}
                        extra={
                            <Progress percent={30}  />
                        }
                        multipleLine
                    >
                        <Brief> </Brief>
                        震天八荒
                        <Brief> </Brief>
                    </List.Item>
                    <List.Item extra="男">性别</List.Item>
                    <List.Item extra="18">年龄</List.Item>
                    <List.Item extra="学生">职业</List.Item>
                    <List.Item extra="湖南省 衡阳市">所在地</List.Item>
                    <List.Item extra="180cm">身高</List.Item>
                    <List.Item extra="80kg">体重</List.Item>
                    <List.Item >
                        <Button type="primary" onClick={()=>{navigate('UserInfoEdit')}}>编辑个人信息</Button>
                        <Button type="ghost">关注</Button>
                        <Button >私信</Button>
                    </List.Item>
                </List>

            </ScrollView>
        );
    }

}

export default connect()(UserInfoPanel);