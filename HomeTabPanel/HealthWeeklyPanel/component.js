import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,TextInput,TouchableOpacity,ScrollView,WebView } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,List,Toast } from 'antd-mobile';

import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";

import {makeCommonImageUrl} from '../../CommonComponent';


const utf8 = require('utf8');

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {

}




class HealthWeeklyPanel extends Component {

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "我的健康周报",
        headerStyle:{
            height:55,
        }
    });

    constructor(props){
        super(props);
    }
    componentDidMount(){
    }

    render(){
        const {sessionId} = this.props;
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'white'}}>
                <WebView source={{uri:makeCommonImageUrl(`/home/weekly-newspaper?session_id=${sessionId}`)}} startInLoadingState={true}/>
            </View>
        );
    }
}


export default connect(mapStateToProps,null)(HealthWeeklyPanel);