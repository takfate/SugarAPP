import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace} from 'antd-mobile';
import CommonListPanel from '../CommonListPanel';
const Brief = List.Item.Brief;



export class MyWatchListPanel extends Component{

    static navigationOptions = {
        headerTitle:"我关注的人",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state =  {
            Data : [
                {
                    Image:"",
                    NickName : "竹曦雨露1",
                    key : "1"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露2",
                    key : "2"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露3",
                    key : "3"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露4",
                    key : "4"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露5",
                    key : "5"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露6",
                    key : "6"
                }
                ,
                {
                    Image:"",
                    NickName : "竹曦雨露7",
                    key : "7"
                }
                ,
                {
                    Image:"",
                    NickName : "竹曦雨露8",
                    key : "8"
                }
                ,
                {
                    Image:"",
                    NickName : "竹曦雨露9",
                    key : "9"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露10",
                    key : "10"
                }
            ]
        };
    }
    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        return (
            <TouchableHighlight
                onPress={()=>{navigate("UserInfo",{
                    IsLoginUser :false,
                    UserId : '100'
                })}}
            >
                <Card full>
                    <Card.Header
                        title={item.item.NickName}
                        thumb = {
                            <Image
                                source={require('./head.jpg')}
                                style={{
                                    height:40,
                                    width:40,
                                    marginRight:10,
                                    borderRadius:20,
                                }}
                            />
                        }
                    >
                    </Card.Header>
                </Card>
            </TouchableHighlight>

        ) ;
    };

    render(){
        return (
            <View style={{height:'100%',width:'100%'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12}}>
                    <Text >共关注了15个糖友</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                />
            </View>
        );
    }
}

export class WatchMeListPanel extends Component{

    static navigationOptions = {
        headerTitle:"关注我的人",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state =  {
            Data : [
                {
                    Image:"",
                    NickName : "竹曦雨露1",
                    key : "1"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露2",
                    key : "2"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露3",
                    key : "3"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露4",
                    key : "4"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露5",
                    key : "5"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露6",
                    key : "6"
                }
                ,
                {
                    Image:"",
                    NickName : "竹曦雨露7",
                    key : "7"
                }
                ,
                {
                    Image:"",
                    NickName : "竹曦雨露8",
                    key : "8"
                }
                ,
                {
                    Image:"",
                    NickName : "竹曦雨露9",
                    key : "9"
                },
                {
                    Image:"",
                    NickName : "竹曦雨露10",
                    key : "10"
                }
            ]
        };
    }
    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        return (

            <TouchableHighlight
                onPress={()=>{navigate("UserInfo",{
                    IsLoginUser :false,
                    UserId : '100'
                })}}
            >
                <Card full>
                    <Card.Header
                        title={item.item.NickName}
                        thumb = {
                            <Image
                                source={require('./head.jpg')}
                                style={{
                                    height:40,
                                    width:40,
                                    marginRight:10,
                                    borderRadius:20,
                                }}
                            />
                        }
                    >
                    </Card.Header>
                </Card>
            </TouchableHighlight>

        ) ;
    };

    render(){
        return (
            <View style={{height:'100%',width:'100%'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12}}>
                    <Text >共有15个糖友关注我</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                />
            </View>
        );
    }
}