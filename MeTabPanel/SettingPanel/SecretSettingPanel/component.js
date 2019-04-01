

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Switch,Toast } from 'antd-mobile';
import httpRequest from "../../../httpRequest";


const SecretSettingCss = StyleSheet.create({
    MainView:{
        backgroundColor:'#F5F5F5'
    },
    ItemText :  {
        fontSize:18,
        color:'black',
    }
});

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
}

class SecretSettingPanel extends Component{
    static navigationOptions = {
        headerTitle:"隐私设置",
        headerStyle:{
            height:55,
        },

    };
    constructor(props){
        super(props);
        this.state = {
            showPhone:true,
            showGender:true,
            showAge : true,
            showJob : true,
            showArea : true,
            showHeight : true,
            showWeight : true
        };
    }

    requestGetSecretSetting = (sessionId)=>{
        Toast.loading('正在获取');
        httpRequest.get('/accounts/privacy', {
            params:{
                session_id : sessionId
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    Toast.hide();
                    this.setState({
                        showPhone:data['showPhone'],
                        showGender:data['showGender'],
                        showAge : data['showAge'],
                        showJob : data['showJob'],
                        showArea : data['showArea'],
                        showHeight : data['showHeight'],
                        showWeight : data['showWeight']
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
        this.requestGetSecretSetting(sessionId);
    }

    requestSaveSecretSetting = (sessionId,key,value)=>{
        let Data = {
            show_phone_number: this.state.showPhone,
            show_gender : this.state.showGender,
            show_age : this.state.showAge,
            show_height : this.state.showHeight,
            show_weight : this.state.showWeight,
            show_area : this.state.showArea,
            show_job : this.state.showJob,
        };
        Data[key]=value;
        Data.session_id=sessionId;
        httpRequest.post('/accounts/alter/privacy', Data)
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.setState({[key]:value});
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };



    _updatePhone = (value)=>{
        const {sessionId} = this.props;
        this.requestSaveSecretSetting(sessionId,'showPhone',value);
    };

    _updateGender = (value)=>{
        const {sessionId} = this.props;
        this.requestSaveSecretSetting(sessionId,'showGender',value);
    };

    _updateAge = (value)=>{
        const {sessionId} = this.props;
        this.requestSaveSecretSetting(sessionId,'showAge',value);
    };

    _updateJob = (value)=>{
        const {sessionId} = this.props;
        this.requestSaveSecretSetting(sessionId,'showJob',value);
    };

    _updateArea = (value)=>{
        const {sessionId} = this.props;
        this.requestSaveSecretSetting(sessionId,'showArea',value);
    };

    _updateHeight = (value)=>{
        const {sessionId} = this.props;
        this.requestSaveSecretSetting(sessionId,'showHeight',value);
    };

    _updateWeight = (value)=>{
        const {sessionId} = this.props;
        this.requestSaveSecretSetting(sessionId,'showWeight',value);
    };


    render(){

        return(
            <ScrollView style={SecretSettingCss.MainView}>
                <List >
                    <List.Item extra={<Switch checked={this.state.showPhone} onChange={this._updatePhone}/>}>
                        <Text style={SecretSettingCss.ItemText}>显示手机号码</Text>
                    </List.Item>

                    <List.Item extra={<Switch checked={this.state.showGender} onChange={this._updateGender}/>}>
                        <Text style={SecretSettingCss.ItemText}>显示性别</Text>
                    </List.Item>

                    <List.Item extra={<Switch checked={this.state.showAge} onChange={this._updateAge}/>}>
                        <Text style={SecretSettingCss.ItemText}>显示年龄</Text>
                    </List.Item>
                    <List.Item extra={<Switch checked={this.state.showJob} onChange={this._updateJob}/>}>
                        <Text style={SecretSettingCss.ItemText}>显示职业</Text>
                    </List.Item>
                    <List.Item  extra={<Switch checked={this.state.showArea} onChange={this._updateArea}/>}>
                        <Text style={SecretSettingCss.ItemText}>显示所在地</Text>
                    </List.Item>

                    <List.Item extra={<Switch checked={this.state.showHeight} onChange={this._updateHeight}/>}>
                        <Text style={SecretSettingCss.ItemText}>显示身高</Text>
                    </List.Item>
                    <List.Item extra={<Switch checked={this.state.showWeight} onChange={this._updateWeight}/>}>
                        <Text style={SecretSettingCss.ItemText}>显示体重</Text>
                    </List.Item>
                </List>
            </ScrollView>
        );
    }

}

export default connect(mapStateToProps,null)(SecretSettingPanel);