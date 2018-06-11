import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,TextInput,TouchableOpacity } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,Toast } from 'antd-mobile';
import httpRequest from '../../httpRequest';

import md5 from 'js-md5';

function mapStateToProps(state) {
}

function mapDispatchToProps(dispatch) {
}




class Register2Panel extends Component{

    constructor(props){
        super(props);
        this.state = {
            NickName : '',
            Password : ''
        };
    }

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "注册新用户",
        headerStyle:{
            height:55,
        }
    });

    _updateNickName = (value)=>{
        this.setState({NickName:value});
    };

    _updatePassword = (value)=>{
        this.setState({Password:value});
    };

    requestRegister = () => {
        const { goBack } = this.props.navigation;
        const {params}  = this.props.navigation.state;
        let nickname = this.state.NickName;
        let password = md5(this.state.Password);
        httpRequest.post('/register', {
            tel:params.Phone,
            username: nickname,
            password:password,
            verifyCode : params.VerCode
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    Toast.success('注册成功',2);
                    goBack(params._backKey);
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'white',paddingLeft:15,paddingRight:15}}>
                <View style={{width:'100%',height:100,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:25,color:'black'}}>
                        第二步：完善账户信息
                    </Text>
                </View>

                <InputItem
                    placeholder='请输入昵称'
                    maxLength={20}
                    value={this.state.NickName}
                    onChange={this._updateNickName}
                >
                    昵称
                </InputItem>
                <InputItem
                    placeholder='请输入密码'
                    maxLength={15}
                    type="password"
                    value={this.state.Password}
                    onChange={this._updatePassword}
                >
                    密码
                </InputItem>
                <WhiteSpace size='lg'/>
                <Button type="primary" onClick={this.requestRegister}>完成注册</Button>

            </View>

        );

    }

}


export default connect()(Register2Panel);