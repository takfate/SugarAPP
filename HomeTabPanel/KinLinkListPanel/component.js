import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,TextInput,TouchableOpacity,ScrollView } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,List } from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

function mapStateToProps(state) {
}

function mapDispatchToProps(dispatch) {
}




class KinLinkListPanel extends Component{

    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation }) =>({

        headerTitle: "家属关联",
        headerStyle:{
            height:55,
        },
        headerRight:
            <TouchableOpacity onPress={()=>{navigation.navigate('KinLink')}}>
                <Text style={{fontSize:18,color:'black',marginRight:10}}>添加关联</Text>
            </TouchableOpacity>,
    });

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        return (
            <ScrollView style={{height:'100%',width:'100%',backgroundColor:'white',paddingLeft:15,paddingRight:15}}>
                <List>
                    <List.Item extra='15546845986'>爸爸</List.Item>
                    <List.Item extra='15546845986'>老婆</List.Item>
                    <List.Item extra='15546845986'>儿子</List.Item>
                    <List.Item extra='15546845986'>奶奶</List.Item>
                </List>
            </ScrollView>

        );

    }

}


export default connect()(KinLinkListPanel);