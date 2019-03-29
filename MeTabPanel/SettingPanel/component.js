

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,StyleSheet} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,Toast} from 'antd-mobile';
import httpRequest from '../../httpRequest';
import * as actions from '../../MainF/actions';


const SetCss = StyleSheet.create({
    MainView:{
        backgroundColor:'#F5F5F5'
    },
    ItemText :  {
        fontSize:18,
        color:'black',
    }
});

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {
        Logout : ()=> {
            dispatch(actions.change_to_login_state(null,null,'','',''));
        }
    }
}

class SettingPanel extends Component{
    static navigationOptions = {
        headerTitle:"设置",
        headerStyle:{
            height:55,
        },

    };
    constructor(props){
        super(props);
    }

    requestLogout = (sessionId)=>{
        const {Logout} = this.props;
        const {goBack} = this.props.navigation;
        httpRequest.get('/accounts/logout', {
            params:{
                session_id:sessionId
            }

        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    storage.remove({
                        key:'loginUser'
                    });
                    goBack();
                    Logout();

                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _submitLogout = ()=>{
        const {sessionId} = this.props;
        this.requestLogout(sessionId);
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <ScrollView style={SetCss.MainView}>
                <List >

                    <List.Item arrow='horizontal' onClick={()=>{navigate('SecretSetting')}} >
                        <Text style={SetCss.ItemText}>隐私设置</Text>
                    </List.Item>
                </List>
                <WhiteSpace size="xl"/>
                <List >
                    <List.Item >
                        <Button type="warning" onClick={this._submitLogout}>登出账号</Button>
                    </List.Item>

                </List>

            </ScrollView>
        );
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(SettingPanel);