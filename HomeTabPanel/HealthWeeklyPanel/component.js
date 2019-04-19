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
        this.state = {
            html : ''
        }
    }

    requestGetHealthWeekly = (sessionId) =>{
        const {goBack} = this.props.navigation;
        httpRequest.post('/getHealthWeekly', {
            session_id : sessionId
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {

                } else {
                    Toast.offline(data['msg']);
                    goBack();
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    componentDidMount(){
        const {sessionId} = this.props;
        this.requestGetHealthWeekly(sessionId);
    }

    render(){
        const {sessionId} = this.props;
        return (
            <View style={{height:'100%',width:'100%',backgroundColor:'white'}}>
                <WebView source={{uri:makeCommonImageUrl(`/getHealthWeekly?session_id=${sessionId}`)}} startInLoadingState={true}/>
            </View>
        );
    }
}


export default connect(mapStateToProps,null)(HealthWeeklyPanel);