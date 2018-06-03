

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight  } from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,Badge} from 'antd-mobile';
import {UserImage} from '../CommonComponent';
import Icon from 'react-native-vector-icons/Feather';
import BbsSearchPanel from "./BbsSearchPanel/component";

const Brief = List.Item.Brief;



const BbsCss = StyleSheet.create({
    MainView :{
        backgroundColor:'#F5F5F5',
    },
    ItemSeparator : {
        height:5,
        backgroundColor:'#F5F5F5'
    },
    ItemContent:{
        paddingLeft:15,
        paddingRight:15
    },
    ItemImage:{
        marginRight:15,
        width:80,
        height:80
    }

});

class BbsTabPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            PostData: [
                {
                    key: '1',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    RecentTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : []
                },{
                    key: '2',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    RecentTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : []
                },{
                    key: '3',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    RecentTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : []
                },{
                    key: '4',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    RecentTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : []
                },{
                    key: '5',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    RecentTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : []
                }
            ]
        };
    }

    _renderItem = (item) =>{
        const { navigate } = this.props.navigation;
        return (
            <TouchableHighlight onPress={()=>{}} >
                <Card full>
                    <Card.Header
                        title={<Text style={{color:'black'}}>{item.item.UserNickName}</Text>}
                        thumb={<Image source={require('./head.jpg')} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>}
                        extra={<Text style={{fontSize:10,textAlign:'right'}}>5分钟前</Text>}
                    />
                    <Card.Body>
                        <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:15}}>
                            {item.item.PostTitle}
                        </Text>
                    </Card.Body>
                </Card>
            </TouchableHighlight>
        );
    };

    _separator = ()  => {
        return (
            <View style={BbsCss.ItemSeparator}><Text> </Text></View>
        );
    };


    render(){
        const { navigate } = this.props.navigation;
        return(

            <View style={{width:'100%',height:'100%'}}>
                <View style={{height:55,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:"#108EE9"}}>
                    <Text style={{fontSize:18,color:'white'}}>糖圈</Text>
                    <View style={{width:50,height:45,flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{navigate('BbsSearch')}} style={{paddingRight:4}}>
                            <Icon name="search" size={25} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigate('NewPost')}}>
                            <Icon name="plus" size={25} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={BbsCss.MainView}
                    data={this.state.PostData}
                    initialNumToRender={3}
                    renderItem = {this._renderItem}
                    ItemSeparatorComponent = {this._separator}
                />
            </View>
        );
    }

}

export default connect()(BbsTabPanel);