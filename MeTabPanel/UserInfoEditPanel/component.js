

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Toast} from 'antd-mobile';

import httpRequest from "../../httpRequest";
import {makeCommonImageUrl} from "../../CommonComponent";

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

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

class UserInfoEditPanel extends Component{
    static navigationOptions = {
        headerTitle:"修改个人信息",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state = {
            HeadImageUrl : '',
            NickName : '',
            Gender  : '',
            Age : '',
            Job : '',
            Location : '',
            Height: '',
            Weight : '',
            Score : ''
        };
    }

    requestGetMyInfo = (sessionId)=>{
        httpRequest.post('/getUserInfoBySessionId', {
            session_id:sessionId
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.setState({
                        HeadImageUrl : data['iconUrl'],
                        NickName : data['username'],
                        Gender  : data['gender'],
                        Age : data['age'],
                        Job : data['job'],
                        Location : data['area'],
                        Height: data['height'],
                        Weight : data['weight'],
                        Score : data['integral']
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    componentDidMount(){
        const {sessionId} = this.props;
        this.requestGetMyInfo(sessionId);
    }

    _updateInfo = (key,value)=> {
        this.setState({
            [key]:value
        })
    };

    render(){
        const { navigate } = this.props.navigation;
        return(
            <ScrollView style={UserInfoEditCss.MainView}>
                <List >
                    <List.Item
                        extra={<Image source={{uri:makeCommonImageUrl(this.state.HeadImageUrl)}} style={UserInfoEditCss.HeaderImage}/>}
                        onClick={()=>{}}
                        arrow="horizontal"
                    >
                        头像
                    </List.Item>
                    <List.Item
                        extra={this.state.NickName}
                        onClick={()=>{navigate('NickNameEdit',{onUpdate:this._updateInfo,data:this.state.NickName})}}
                        arrow="horizontal">昵称</List.Item>
                    <List.Item
                        extra={this.state.Gender}
                        onClick={()=>{navigate('GenderEdit',{onUpdate:this._updateInfo,data:this.state.Gender})}}
                        arrow="horizontal">性别</List.Item>
                    <List.Item
                        extra={this.state.Age}
                        onClick={()=>{navigate('AgeEdit',{onUpdate:this._updateInfo,data:this.state.Age})}}
                        arrow="horizontal">年龄</List.Item>
                    <List.Item
                        extra={this.state.Job}
                        onClick={()=>{navigate('JobEdit',{onUpdate:this._updateInfo,data:this.state.Job})}}
                        arrow="horizontal">职业</List.Item>
                    <List.Item
                        extra={this.state.Location}
                        onClick={()=>{navigate('LocationEdit',{onUpdate:this._updateInfo,data:this.state.Location})}}
                        arrow="horizontal">所在地</List.Item>
                    <List.Item
                        extra={this.state.Height}
                        onClick={()=>{navigate('HeightEdit',{onUpdate:this._updateInfo,data:this.state.Height})}}
                        arrow="horizontal">身高</List.Item>
                    <List.Item
                        extra={this.state.Weight}>体重</List.Item>
                    <List.Item >
                        <Button type="primary" onClick={()=>{}}>保存</Button>
                    </List.Item>
                </List>

            </ScrollView>
        );
    }

}

export default connect(mapStateToProps,null)(UserInfoEditPanel);