import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {Button, InputItem, WhiteSpace,Toast } from 'antd-mobile';
import httpRequest from '../../httpRequest';

function mapStateToProps(state) {
}

function mapDispatchToProps(dispatch) {
}




class Register1Panel extends Component{

    constructor(props){
        super(props);
        this.state = {
            Phone : '',
            VerCode : '',
            LeftTime : '0',
            cycling : false
        }
    }

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "注册新用户",
        headerStyle:{
            height:55,
        }
    });

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
        httpRequest.post('/getCode',{
            tel:phone
        })
            .then((response)=> {
                let data = response.data;
                if(data['code']===0){
                    Toast.success('验证码发送成功',1);
                    this.setState({LeftTime:60,cycling:true});
                    let timer = setInterval(()=>{this._updateLeftTime(timer)},1000)
                }else{
                    Toast.fail(data['msg']);
                }
            })
            .catch( (error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _nextStep = ()=>{
        const { navigate } = this.props.navigation;
        if(this._checkCovered(this.state.Phone,this.state.VerCode)){
            navigate('Register2',{
                Phone : this._phoneWrapper(this.state.Phone),
                VerCode : this.state.VerCode,
                _backKey : this.props.navigation.state.key
            });

        }else{
            Toast.fail('信息填写不完整',1);
        }
    };

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'white',paddingLeft:15,paddingRight:15}}>
                <View style={{width:'100%',height:100,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:25,color:'black'}}>
                        第一步：验证手机号
                    </Text>
                </View>

                <InputItem
                    placeholder='请输入手机号'
                    type='phone'
                    value={this.state.Phone}
                    onChange={this._updatePhone}
                />
                <InputItem
                    placeholder='请输入验证码'
                    maxLength={6}
                    value={this.state.VerCode}
                    onChange={this._updateVerCode}
                    extra={
                        <Button
                            type="primary"
                            onClick={this.requestGetVerCode}
                            disabled={this.state.cycling}
                        >
                            {this.state.cycling?this.state.LeftTime+'秒后可重试':'获取验证码'}
                        </Button>
                    }
                />
                <WhiteSpace size='lg'/>
                <Button type="primary" onClick={this._nextStep}>下一步</Button>

            </View>

        );

    }

}


export default connect()(Register1Panel);