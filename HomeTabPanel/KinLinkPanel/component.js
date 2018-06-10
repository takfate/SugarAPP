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




class KinLinkPanel extends Component{

    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "添加关联",
        headerStyle:{
            height:55,
        }
    });

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'white',paddingLeft:15,paddingRight:15}}>
                <InputItem    placeholder='请输入关联亲属的称呼' maxLength={20} >称呼</InputItem>
                <InputItem    placeholder='请输入关联亲属的手机号' maxLength={20} >手机号</InputItem>
                <InputItem    placeholder='请输入验证码' maxLength={6} extra={<Button type="primary" size='small'>获取验证码</Button>} >验证码</InputItem>
                <WhiteSpace size='lg'/>
                <Button type="primary" onClick={()=>{navigate('Register2')}} >确定关联</Button>
            </View>

        );

    }

}


export default connect()(KinLinkPanel);