import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,TextInput,TouchableOpacity,Image } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace } from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import * as Actions from './actions';
import Icon from 'react-native-vector-icons/FontAwesome';

function mapStateToProps(state) {
}

function mapDispatchToProps(dispatch) {
}

class WelcomePanel extends Component{
    static navigationOptions = {
        headerStyle:{
            height:0
        }
    };

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'white',paddingLeft:15,paddingRight:15}}>
                <View style={{width:'100%',height:200,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('./logo.png')} style={{height:64,width:64}}/>

                </View>
                {/*<View style={{width:'100%',height:50,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>*/}
                    {/*<Text style={{fontSize:30,color:'#2994BD'}}>*/}
                        {/*糖宝*/}
                    {/*</Text>*/}

                {/*</View>*/}
                <InputItem    placeholder='请输入手机号' maxLength={20}>手机号</InputItem>
                <InputItem    placeholder='请输入密码' type='password'>密码</InputItem>
                <WhiteSpace size='lg'/>
                <Button type="primary" >登  录</Button>
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


export default connect()(WelcomePanel);