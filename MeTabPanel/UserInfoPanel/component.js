

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Progress,Toast} from 'antd-mobile';
import httpRequest from '../../httpRequest';
import {makeCommonImageUrl} from "../../CommonComponent";

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

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

class MyInfoPanel extends Component {
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
            Score : '',
        };
    }


    requestGetMyInfo = (sessionId)=>{
        httpRequest.get('/accounts/info', {
            params:{
                session_id:sessionId
            },
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
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
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    componentDidMount(){
        const {sessionId} = this.props;
        const {params} = this.props.navigation.state;
        this.requestGetMyInfo(sessionId);
    }

    render(){
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={UserInfoCss.MainView}>
                <List >

                    <List.Item
                        thumb={ <Image source={{uri:makeCommonImageUrl(this.state.HeadImageUrl)}} style={UserInfoCss.HeaderImage}/>}
                        extra={
                            <Progress percent={30}  />
                        }
                        multipleLine
                    >
                        <Brief> </Brief>
                        {this.state.NickName}
                        <Brief> </Brief>
                    </List.Item>
                    <List.Item extra={this.state.Gender}>性别</List.Item>
                    <List.Item extra={this.state.Age}>年龄</List.Item>
                    <List.Item extra={this.state.Job}>职业</List.Item>
                    <List.Item extra={this.state.Location}>所在地</List.Item>
                    <List.Item extra={this.state.Height}>身高</List.Item>
                    <List.Item extra={this.state.Weight}>体重</List.Item>
                    <List.Item >
                        <Button type="primary" onClick={()=>{navigate('UserInfoEdit')}}>编辑个人信息</Button>
                    </List.Item>
                </List>
            </ScrollView>
        );
    }
}



class OtherUserInfoPanel extends  Component{
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
            Score : '',
            Focus : false
        };
    }

    requestGetUserInfo = (sessionId,UserId)=>{
        httpRequest.get('/accounts/info', {
            params:{
                session_id:sessionId,
                other_user_id:UserId
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    this.setState({
                        HeadImageUrl : data['iconUrl'],
                        NickName : data['username'],
                        Gender  : data['gender'],
                        Age : data['age'],
                        Job : data['job'],
                        Location : data['area'],
                        Height: data['height'],
                        Weight : data['weight'],
                        Score : data['level'],
                        Focus : data['isFollow']
                    });
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };


    componentDidMount(){
        const {sessionId} = this.props;
        const {params} = this.props.navigation.state;
        this.requestGetUserInfo(sessionId,params.UserId);
    }

    requestFocusOtherUser = (sessionId,UserId)=>{
        httpRequest.post('/accounts/following/follow', {
            session_id:sessionId,
            other_user_id : UserId
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.requestGetUserInfo(sessionId,UserId);
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    requestUnfocusOtherUser = (sessionId,UserId)=>{
        httpRequest.post('/accounts/following/ignore', {
            session_id:sessionId,
            other_user_id : UserId
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.requestGetUserInfo(sessionId,UserId);
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _submitFocusUser = ()=>{
        const {params} = this.props.navigation.state;
        const {sessionId} = this.props;
        this.requestFocusOtherUser(sessionId,params.UserId);
    };

    _submitUnfocusUser = ()=>{
        const {params} = this.props.navigation.state;
        const {sessionId} = this.props;
        this.requestUnfocusOtherUser(sessionId,params.UserId);
    };

    render(){
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
        return (
            <ScrollView style={UserInfoCss.MainView}>
                <List >

                    <List.Item
                        thumb={ <Image source={{uri:makeCommonImageUrl(this.state.HeadImageUrl)}} style={UserInfoCss.HeaderImage}/>}
                        extra={
                            <Progress percent={30}  />
                        }
                        multipleLine
                    >
                        <Brief> </Brief>
                        {this.state.NickName}
                        <Brief> </Brief>
                    </List.Item>
                    <List.Item extra={this.state.Gender===""?'保密':this.state.Gender}>性别</List.Item>
                    <List.Item extra={this.state.Age===""?'保密':this.state.Age}>年龄</List.Item>
                    <List.Item extra={this.state.Job===""?'保密':this.state.Job}>职业</List.Item>
                    <List.Item extra={this.state.Location===""?'保密':this.state.Location}>所在地</List.Item>
                    <List.Item extra={this.state.Height===""?'保密':this.state.Height}>身高</List.Item>
                    <List.Item extra={this.state.Weight===""?'保密':this.state.Weight}>体重</List.Item>
                    <List.Item >
                        <Button
                            type={this.state.Focus?'primary':'ghost'}
                            onClick={this.state.Focus?this._submitUnfocusUser:this._submitFocusUser}
                        >
                            {this.state.Focus?'已关注':'关注'}
                        </Button>
                        <Button onClick={()=>{navigate('Chat', {
                            TargetUserName: this.state.NickName,
                            TargetUserId:params.UserId,
                            TargetUserImageUrl:this.state.HeadImageUrl
                            })}}>私信</Button>
                    </List.Item>
                </List>

            </ScrollView>
        );
    }

}

class UserInfoPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: navigation.state.params.isLoginUser?"我的信息":"糖友信息",
        headerStyle:{
            height:55,
        }
    });

    render(){
        // alert(this.props.navigation.state.params.isLoginUser);
        const {sessionId,navigation} = this.props;
        if(this.props.navigation.state.params.isLoginUser){
            return <MyInfoPanel sessionId={sessionId} navigation={navigation}/>;
        }else{
            return <OtherUserInfoPanel sessionId={sessionId} navigation={navigation} />;
        }

    }
}

export default connect(mapStateToProps,null)(UserInfoPanel);