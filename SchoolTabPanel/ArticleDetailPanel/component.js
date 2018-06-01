

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList,TouchableOpacity,WebView} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,TextareaItem } from 'antd-mobile';


const Brief = List.Item.Brief;


const ArticleDetailCss = StyleSheet.create({
    MainView : {
        backgroundColor : '#F5F5F5',
    },
    ItemSeparator : {
        height : 5,
        backgroundColor : '#F5F5F5'
    },
    ItemContent : {
        paddingLeft : 15,
        paddingRight : 15
    },
    ItemImage : {
        marginRight : 15,
        width : 80,
        height : 80
    }
});




class ArticleDetailPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        // headerTitle: navigation.state.params.Title,
        headerTitle: <Text style={{fontSize:15,color:'black'}}>测血糖那天降糖药还用服用吗？</Text>,
        headerStyle:{
            height:55,
        }
    });
    constructor(props){
        super(props);
    }


    render(){
        const { navigate } = this.props;
        return(
            <View style={{width:"100%",height:"100%",flexDirection:'column',justifyContent:'flex-end'}}>
                <WebView
                    style={{
                        height:'100%',
                        width:'100%',
                        backgroundColor:'red'
                    }}
                    source={{uri:'http://www.baidu.com'}}
                    onLoad={()=>{}}
                />
                <View
                    style={{
                        height:45,
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'flex-start',
                        alignItems:'center',
                        paddingLeft:12,
                        paddingRight:12,
                        borderTopColor:'#DDDDDD',
                        borderTopWidth:1
                    }}>
                    <TouchableOpacity onPress={()=>{}} style={{width:40}}>
                        <Text style={{fontSize:15,color:'black'}} >语音</Text>
                    </TouchableOpacity>
                    <TextareaItem
                        labelNumber={5}
                        count={100}
                        style={{
                            width:200,
                            height:35,
                            borderColor:'#DDDDDD',
                            borderWidth:1,
                            borderRadius:15,
                            paddingBottom: 0,
                            paddingTop:5,
                            paddingRight:9

                        }}
                    />
                    <TouchableOpacity onPress={()=>{}} style={{width:40}}>
                        <Text style={{fontSize:15,color:'black'}} >发送</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

export default connect()(ArticleDetailPanel);