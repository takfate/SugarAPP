import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,TextInput,TouchableOpacity,Image } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,Toast } from 'antd-mobile';
import httpRequest from '../httpRequest';
import md5 from 'js-md5';
import {change_to_login_state} from '../MainF/actions';


function mapStateToProps(state) {
}

function mapDispatchToProps(dispatch) {
    return {
        changeToLoginState: (sessionId,userId,nickName,iconUrl,Phone)=>{
            dispatch(change_to_login_state(sessionId,userId,nickName,iconUrl,Phone));
        }
    }
}

class WelcomePanel extends Component{
    static navigationOptions = {
        headerStyle:{
            height:0
        }
    };

    constructor(props){
        super(props);
        this.state = {
            Phone:'',
            Password : ''
        }
    }

    _updatePhone = (value)=>{
        this.setState({Phone:value});
    };

    _updatePassword = (value)=>{
        this.setState({Password:value});
    };

    _checkCovered = (Phone,Password)=> {
        let phone = this._phoneWrapper(Phone);
        return phone.length===11&&Password.length!==0;
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

    requestLogin = (Phone,Password,isMD5)=>{
        if(!this._checkCovered(Phone,Password)){
            Toast.fail('登录信息不完整');
            return ;
        }
        let phone = this._phoneWrapper(Phone);
        let password = isMD5?Password:md5(Password);
        const {changeToLoginState} = this.props;
        httpRequest.post('/login', {
            tel:phone,
            password:password
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    console.log(data['session_id'],data.userId,data.username,data.iconUrl,phone);
                    changeToLoginState(data['session_id'],data.userId,data.username,data.iconUrl,phone);
                    storage.save({
                        key:'loginUser',
                        data:{
                            Phone : phone,
                            Password : password
                        }
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _submitLogin = ()=>{
        this.requestLogin(this.state.Phone,this.state.Password,false);
    };

    componentWillMount(){
        storage.load({
            key:'loginUser'
        }).then(ret => {
            this.requestLogin(ret.Phone,ret.Password,true);
        }).catch(err=>{
            switch (err.name) {
                case 'NotFoundError':
                    break;
                case 'ExpiredError':
                    Toast.info('账号信息已过期，请重新登录',1);
                    break;
            }
        });
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'white',paddingLeft:15,paddingRight:15}}>
                <View style={{width:'100%',height:200,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('./logo.png')} style={{height:64,width:64}}/>

                </View>
                <InputItem
                    placeholder='请输入手机号'
                    type="phone"
                    value={this.state.Phone}
                    onChange={this._updatePhone}
                >
                    手机号
                </InputItem>
                <InputItem
                    placeholder='请输入密码'
                    type='password'
                    maxLength={15}
                    value={this.state.Password}
                    onChange={this._updatePassword}
                >
                    密码
                </InputItem>
                <WhiteSpace size='lg'/>
                <Button type="primary" onClick={this._submitLogin}>登  录</Button>
                <View style={{width:'100%',height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{navigate('Forget1')}}>
                        <Text style={{fontSize:15}}>
                            忘记密码？
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigate('Register1')}}>
                        <Text style={{fontSize:15}}>
                            新用户注册
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }

}


export default connect(null,mapDispatchToProps)(WelcomePanel);