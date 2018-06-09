import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,TextInput,TouchableOpacity } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace } from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

function mapStateToProps(state) {
}

function mapDispatchToProps(dispatch) {
}




class Forget1Panel extends Component{

    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "找回账号",
        headerStyle:{
            height:55,
        }
    });

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

                <InputItem    placeholder='请输入手机号' maxLength={20} />
                <InputItem    placeholder='请输入验证码' maxLength={6} extra={<Button type="primary">获取验证码</Button>} />
                <WhiteSpace size='lg'/>
                <Button type="primary" onClick={()=>{navigate('Forget2')}}>下一步</Button>

            </View>

        );

    }

}


export default connect()(Forget1Panel);