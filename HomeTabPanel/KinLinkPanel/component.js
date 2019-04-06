import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Button, InputItem, WhiteSpace} from 'antd-mobile';
import httpRequest from "../../httpRequest";
import {Toast} from "antd-mobile/lib/index";

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
}




class KinLinkPanel extends Component{

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "添加关联",
        headerStyle:{
            height:55,
        }
    });

    constructor(props){
        super(props);
        this.state = {
            CallName : '',
            Phone : '',
            VerCode : '',
            LeftTime : 0,
            cycling :false
        };
    }

    _updateCallName = (value) =>{
        this.setState({CallName:value});
    };

    _updatePhone = (value)=> {
        this.setState({Phone:value});
    };

    _updateVerCode = (value) => {
        this.setState({VerCode :value});
    };

    _updateLeftTime = (timer) => {
        if(this.state.LeftTime===1){
            clearInterval(timer);
            this.setState({LeftTime:0,cycling:false});
            return ;
        }
        this.setState({LeftTime:this.state.LeftTime-1});
    };

    _checkCovered = (Phone,VerCode)=> {
        let phone = this._phoneWrapper(Phone);
        return phone.length===11&&VerCode.length===6;
    };

    _phoneWrapper = (Phone)=>{
        let phone = '';
        for (let i =0;i<Phone.length;i++){
            if(Phone[i]!==' '){
                phone+=Phone[i];
            }
        }
        return phone;
    };

    requestGetVerCode = () => {
        let phone = this._phoneWrapper(this.state.Phone);
        httpRequest.get('/accounts/code',{
            params:{
                phone_number:phone,
            }
        })
            .then((response)=> {
                let data = response.data;
                if(data['code']===0){
                    Toast.success('验证码发送成功',1);
                    this.setState({LeftTime:60,cycling:true});
                    let timer = setInterval(()=>{this._updateLeftTime(timer)},1000);
                }else{
                    Toast.fail(data['msg']);
                }
            })
            .catch( (error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    requestLinkKin = (sessionId,CallName,Phone,VerCode)=>{
        const {goBack} = this.props.navigation;
        httpRequest.post('/home/family/link',{
            session_id:sessionId,
            call_name:CallName,
            phone_number:Phone,
            code:VerCode
        })
            .then((response)=> {
                let data = response.data;
                if(data['code']===0){
                    Toast.success('添加成功');
                    goBack();
                }else{
                    Toast.fail(data['msg']);
                }
            })
            .catch( (error) => {
                Toast.fail('网络好像有问题~');
            });
    };


    _submitLinkKin = ()=>{
        if(this.state.CallName.length===0){
            Toast.fail('请输入适当的称呼');
            return ;
        }
        let phone = this._phoneWrapper(this.state.Phone);
        if(phone.length!==11||this.state.VerCode.length!==6){
            Toast.fail('验证信息不完整');
            return ;
        }
        const {sessionId} = this.props;
        this.requestLinkKin(sessionId,this.state.CallName,phone,this.state.VerCode);
    };

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'white',paddingLeft:15,paddingRight:15}}>
                <InputItem
                    placeholder='请输入关联亲属的称呼'
                    maxLength={10}
                    onChange={this._updateCallName}
                    value={this.state.CallName}
                >
                    称呼
                </InputItem>
                <InputItem
                    placeholder='请输入关联亲属的手机号'
                    type='phone'
                    onChange={this._updatePhone}
                    value={this.state.Phone}
                >
                    手机号
                </InputItem>
                <InputItem
                    placeholder='请输入验证码'
                    maxLength={6}
                    extra={
                        <Button
                            type="primary"
                            onClick={this.requestGetVerCode}
                            disabled={this.state.cycling}
                        >
                            {this.state.cycling?this.state.LeftTime+'秒后可重试':'获取验证码'}
                        </Button>
                    }
                    onChange={this._updateVerCode}
                    value={this.state.VerCode}
                >
                    验证码
                </InputItem>
                <WhiteSpace size='lg'/>
                <Button type="primary" onClick={this._submitLinkKin} >确定关联</Button>
            </View>
        );
    }
}


export default connect(mapStateToProps,null)(KinLinkPanel);