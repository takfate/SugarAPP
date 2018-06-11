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




class Forget2Panel extends Component{

    constructor(props){
        super(props);
        this.state = {
            newPassword : ''
        }
    }

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "找回账号",
        headerStyle:{
            height:55,
        }
    });

    _updateNewPassword = (value) => {
      this.setState({newPassword:value});
    };

    requestModifyPassword = () => {
        const {params} = this.props.navigation.state;
        const {goBack} = this.props.navigation;
        let newPassword = md5(this.state.newPassword);
        httpRequest.post('/alterPassword', {
            tel:params.Phone,
            verifyCode:params.VerCode,
            password : newPassword
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    Toast.success('密码修改成功');
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
                        第二步：输入新密码
                    </Text>
                </View>

                <InputItem
                    placeholder='请输入新密码'
                    maxLength={15}
                    type="password"
                    value={this.state.newPassword}
                    onChange={this._updateNewPassword}
                >
                    新密码
                </InputItem>
                <WhiteSpace size='lg'/>
                <Button type="primary" onClick={this.requestModifyPassword}>完成修改</Button>

            </View>

        );

    }

}


export default connect()(Forget2Panel);