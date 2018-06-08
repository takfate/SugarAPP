import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text} from 'react-native';
import {TabBar,Button} from 'antd-mobile';
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
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'red'}}>

            </View>
        );

    }

}


export default connect()(WelcomePanel);