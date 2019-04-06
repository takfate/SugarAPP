import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,TextInput,TouchableOpacity,ScrollView } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,List } from 'antd-mobile';

import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";
import {Toast} from "antd-mobile/lib/index";

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
}




class KinLinkListPanel extends Component{

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

    constructor(props){
        super(props);
        this.state = {
            KinList : []
        };
    }

    requestGetKinList = (sessionId)=>{
        Toast.loading('正在获取');
        httpRequest.get('/home/families', {
            params:{
                session_id:sessionId
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    let kinList = [];
                    for(let i=0;i<data.data.length;i++){
                        kinList.push({
                            Phone:data.data[i]['tel'],
                            CallName:data.data[i]['nickname'],
                                key : data.data[i]['familyId'],
                        });
                    }
                    this.setState({KinList:kinList});
                    Toast.hide();
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    componentDidMount(){
        const {sessionId} = this.props;
        this.requestGetKinList(sessionId);
    }

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        return (
            <ScrollView style={{height:'100%',width:'100%',backgroundColor:'white',paddingLeft:15,paddingRight:15}}>
                <List>
                    {this.state.KinList.map(kin=>(
                        <List.Item extra={kin.Phone} key={kin.key}>
                            {kin.CallName}
                        </List.Item>
                    ))}
                </List>
            </ScrollView>

        );

    }

}


export default connect(mapStateToProps,null)(KinLinkListPanel);