

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

class UserInfoPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: navigation.state.params.isLoginUser?"我的信息":"糖友信息",
        headerStyle:{
            height:55,
        }
    });

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

    requestGetUserInfo = (sessionId,UserId)=>{
        httpRequest.post('/getOtherUserInfo', {
            session_id:sessionId,
            otherUserId:UserId
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
                        Score : data['integral'],
                        Focus : data['isFollow']===1
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
        const {sessionId,userId} = this.props;
        this.props.navigation.setParams({LocalUserId : userId});
        this.requestGetMyInfo(sessionId);
    }


    render(){
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        console.log(1230);
        return(
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
                        {params.isLoginUser? <Button type="primary" onClick={()=>{navigate('UserInfoEdit')}}>编辑个人信息</Button>:null }
                        {!params.isLoginUser? <Button type="ghost">关注</Button>:null }
                        {!params.isLoginUser? <Button onClick={()=>{navigate('Chat')}}>私信</Button>:null }
                    </List.Item>
                </List>

            </ScrollView>
        );
    }

}

export default connect(mapStateToProps,null)(UserInfoPanel);