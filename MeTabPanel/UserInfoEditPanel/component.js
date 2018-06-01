

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace} from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

const Brief = List.Item.Brief;


const UserInfoEditCss = StyleSheet.create({
    MainView :{
        backgroundColor:'#F5F5F5',
        paddingBottom:20
    },
    HeaderItem : {
        backgroundColor:"#108EE9"
    },
    HeaderImage :{
        width:64,
        height:64,
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

class UserInfoEditPanel extends Component{
    static navigationOptions = {
        headerTitle:"修改个人信息",
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
            <ScrollView style={UserInfoEditCss.MainView}>
                <List >
                    <List.Item
                        extra={<Image source={require('./head.jpg')} style={UserInfoEditCss.HeaderImage}/>}
                        onClick={()=>{}}
                        arrow="horizontal"
                    >
                        头像
                    </List.Item>
                    <List.Item extra="震天八荒" onClick={()=>{navigate('NickNameEdit')}} arrow="horizontal">昵称</List.Item>
                    <List.Item extra="男" onClick={()=>{navigate('GenderEdit')}} arrow="horizontal">性别</List.Item>
                    <List.Item extra="18" onClick={()=>{navigate('AgeEdit')}} arrow="horizontal">年龄</List.Item>
                    <List.Item extra="学生" onClick={()=>{navigate('JobEdit')}} arrow="horizontal">职业</List.Item>
                    <List.Item extra="湖南省 衡阳市" onClick={()=>{navigate('LocationEdit')}} arrow="horizontal">所在地</List.Item>
                    <List.Item extra="180cm" onClick={()=>{navigate('HeightEdit')}} arrow="horizontal">身高</List.Item>
                    <List.Item extra="80kg" onClick={()=>{navigate('WeightEdit')}} arrow="horizontal">体重</List.Item>
                    <List.Item >
                        <Button type="primary" onClick={()=>{}}>保存</Button>
                    </List.Item>
                </List>

            </ScrollView>
        );
    }

}

export default connect()(UserInfoEditPanel);