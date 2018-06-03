

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList,TouchableOpacity,WebView} from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,TextareaItem,Drawer } from 'antd-mobile';
import Icon from 'react-native-vector-icons/Feather';

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

const CommentListCss = StyleSheet.create({
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
        width : 30,
        height : 30,
        borderRadius:15
    }
});


class CommentListPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            Data :[
                {
                    key:'1',
                    UserId:'1',
                    UserImageUrl :'',
                    UserNickName : '震天八荒',
                    Content : '你是真的牛批',
                    PostTime : '2018-03-02 18:78'
                },
                {
                    key:'2',
                    UserId:'1',
                    UserImageUrl :'',
                    UserNickName : '震天八荒',
                    Content : '你是真的牛批',
                    PostTime : '2018-03-02 18:78'
                }
                ,
                {
                    key:'3',
                    UserId:'1',
                    UserImageUrl :'',
                    UserNickName : '震天八荒',
                    Content : '你是真的牛批',
                    PostTime : '2018-03-02 18:78'
                }
                ,
                {
                    key:'4',
                    UserId:'1',
                    UserImageUrl :'',
                    UserNickName : '震天八荒',
                    Content : '你是真的牛批',
                    PostTime : '2018-03-02 18:78'
                },
                {
                    key:'5',
                    UserId:'1',
                    UserImageUrl :'',
                    UserNickName : '震天八荒',
                    Content : '你是真的牛批',
                    PostTime : '2018-03-02 18:78'
                },
                {
                    key:'5',
                    UserId:'1',
                    UserImageUrl :'',
                    UserNickName : '震天八荒',
                    Content : '你是真的牛批',
                    PostTime : '2018-03-02 18:78'
                }
            ]
        };
    }

    _renderItem = (item) =>{
        const {navigate}  = this.props;
        return (

            <Card full>
                <Card.Header
                    title={
                        <TouchableOpacity
                            onPress={()=>{navigate("UserInfo",{
                                IsLoginUser :false,
                                UserId : '100'
                            })}}
                        >
                            <Text>{item.item.UserNickName}</Text>
                        </TouchableOpacity>
                    }
                    thumb={
                        <TouchableOpacity
                            onPress={()=>{navigate("UserInfo",{
                                IsLoginUser :false,
                                UserId : '100'
                            })}}
                        >
                            <Image source={require('./head.jpg')} style={CommentListCss.ItemImage}/>
                        </TouchableOpacity>
                    }
                />

                <Card.Body>
                    <Text>{item.item.Content}</Text>
                </Card.Body>
                <Card.Footer content = {"上 10000, 下 200"} extra={item.item.PostTime} />
            </Card>
        );
    };

    _separator = ()  => {
        return (
            <View style={CommentListCss.ItemSeparator}><Text> </Text></View>
        );
    };

    render(){
        const {ArticleId}  = this.props;

        return(
            <FlatList
                style={CommentListCss.MainView}
                data={this.state.Data}
                initialNumToRender={3}
                renderItem = {this._renderItem}
                ItemSeparatorComponent = {this._separator}
            />
        );
    }

}



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
        this.state = {
            InputFocus :false,
            CommentListOpen :false
        }
    }

    _openCommentList = ()=>{
        this.setState({CommentListOpen:!this.state.CommentListOpen});
    };

    render(){
        const { navigate } = this.props.navigation;
        return(
            <Drawer
                sidebar={<CommentListPanel navigate={navigate}/>}
                open={this.state.CommentListOpen}
                position='right'

            >
                <View style={{width:"100%",height:"100%",flexDirection:'column',justifyContent:'flex-end'}}>
                    <WebView
                        style={{
                            height:'100%',
                            width:'100%',
                            backgroundColor:'red'
                        }}
                        // source={{uri:'http://www.baidu.com'}}
                        // onLoad={()=>{}}
                    />
                    <View
                        style={{
                            height:45,
                            width:'100%',
                            flexDirection:'row',
                            alignItems:'center',
                            paddingLeft:12,
                            paddingRight:12,
                            borderTopColor:'#DDDDDD',
                            borderTopWidth:1
                        }}>
                        <View style={{flex:1,height:45,paddingTop:5}}>
                            <TextareaItem
                                labelNumber={5}
                                count={100}
                                style={{
                                    height:35,
                                    borderColor:'#DDDDDD',
                                    borderWidth:1,
                                    borderRadius:15,
                                    paddingBottom: 0,
                                    paddingTop:5,
                                    paddingRight:9
                                }}
                                placeholder="添加评论"
                                onFocus = {()=>{this.setState({InputFocus:true})}}
                                onBlur = {()=>{this.setState({InputFocus:false})}}
                            />
                        </View>
                        {
                            this.state.InputFocus?
                                <View style={{width:40,height:45,paddingTop:11}}>
                                    <TouchableOpacity onPress={()=>{}} style={{paddingLeft:10}}>
                                        <Text style={{fontSize:15,color:'black'}} >发送</Text>
                                    </TouchableOpacity>
                                </View> :
                                <View style={{width:65,height:45,paddingTop:10,flexDirection:'row'}}>
                                    <TouchableOpacity onPress={()=>{}} style={{paddingLeft:10}}>
                                        <Text style={{fontSize:15,color:'black'}} ><Icon name="star" size={23} /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this._openCommentList} style={{paddingLeft:10}}>
                                        <Text style={{fontSize:15,color:'black'}} ><Icon name="message-square" size={23} /></Text>
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                </View>
            </Drawer>

        );
    }

}

export default connect()(ArticleDetailPanel);