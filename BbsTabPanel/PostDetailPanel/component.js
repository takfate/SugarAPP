import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, Drawer, InputItem, List} from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';


const Brief = List.Item.Brief;

const PostDetailCss = StyleSheet.create({
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


class SubPostListPanel extends Component {
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
            <View style={{width:'100%',height:'100%',justifyContent:'flex-end'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:'#DDDDDD'}}>
                    <Text >1 楼的评论</Text>
                </View>
                <FlatList
                    style={CommentListCss.MainView}
                    data={this.state.Data}
                    initialNumToRender={3}
                    renderItem = {this._renderItem}
                    ItemSeparatorComponent = {this._separator}
                />
                <View
                    style={{
                        width:'100%',
                        height:40,
                        backgroundColor:"white",
                        flexDirection:'row',
                        alignItems:'center',
                        borderTopColor:'#DDDDDD',
                        borderTopWidth:1
                    }}
                >
                    <View style={{flex:1,height:45,paddingTop:0}}>
                        <InputItem
                            placeholder="写下你的看法...."
                            maxLength={50}
                        />
                    </View>
                    <View style={{width:50,height:45,paddingTop:11}}>
                        <TouchableOpacity onPress={()=>{}} style={{paddingLeft:10}}>
                            <Text style={{fontSize:15,color:'black'}} >发送</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        );
    }

}




class PostDetailPanel extends Component{

    static navigationOptions = ({ navigation }) =>({

        headerStyle:{
            height:55,
        },
        headerRight:
            <TouchableOpacity onPress={()=>{navigation.navigate('ReturnPost')}}>
                <Text style={{fontSize:18,color:'black',marginRight:10}} >回帖</Text>
            </TouchableOpacity>
    });

    constructor(props){
        super(props);
        this.state = {
            SubPostListOpen:false,
            PostData: [
                {
                    key: '0',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    PostTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : []
                },
                {
                    key: '1',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    PostTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : [],
                    Floor : '1'
                },{
                    key: '2',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    PostTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : [],
                    Floor : '2'
                },{
                    key: '3',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    PostTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : [],
                    Floor : '3'
                },{
                    key: '4',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    PostTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : [],
                    Floor : '4'
                },{
                    key: '5',
                    UserNickName:'震天八荒',
                    UserImageUrl :'',
                    PostTime : '5',
                    PostTitle: '大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊大佬们好强啊',
                    Images : [],
                    Floor : '5'
                }
            ]
        };
    }

    _renderItem = (item) =>{
        const { navigate } = this.props.navigation;
        if(item.item.key==='0'){
            return (

                <Card full>
                    <Card.Header
                        title={
                            <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                                <View style={{flex:1}}>
                                    <TouchableOpacity
                                        onPress={()=>{navigate("UserInfo",{
                                            IsLoginUser :false,
                                            UserId : '100'
                                        })}}
                                    >
                                        <Text style={{color:'black'}}>{item.item.UserNickName}</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize:10}}>楼主 {item.item.PostTime}</Text>
                                </View>
                                <View style={{width:100,paddingLeft:85}}>
                                    <TouchableOpacity onPress={()=>{}} >
                                        <Icon name="trash" size={14} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        }
                        thumb={
                            <TouchableOpacity
                                onPress={()=>{navigate("UserInfo",{
                                    IsLoginUser :false,
                                    UserId : '100'
                                })}}
                            >
                                <Image source={require('./head.jpg')} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>
                            </TouchableOpacity>
                        }
                    />
                    <Card.Body>
                        <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:13}}>
                            {item.item.PostTitle}
                        </Text>
                    </Card.Body>
                    <Card.Footer
                        content={
                            <View
                                style={{
                                    width:120,
                                    height:45,
                                    flexDirection:'row',
                                    alignItems:'center'
                                }}
                            >
                                <Button size="small" >
                                    <Icon name="caret-up" size={15}/>
                                    <Text>  1213</Text>
                                </Button>
                                <Button size="small" style={{marginLeft:5}}>
                                    <Icon name="caret-down" size={15}/>
                                </Button>
                            </View>
                        }
                        style={{
                            height:30,
                            width:'100%',
                            flexDirection:'row',
                            alignItems:'center',
                            borderTopWidth:1,
                            borderTopColor:'#DDDDDD',
                            paddingTop:5
                        }}
                    />
                </Card>
            );
        }else{
            return (
                <Card style={{marginLeft:10,marginRight:5}}>
                    <Card.Header
                        title={
                            <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                                <View style={{flex:1}}>
                                    <TouchableOpacity
                                        onPress={()=>{navigate("UserInfo",{
                                            IsLoginUser :false,
                                            UserId : '100'
                                        })}}
                                    >
                                        <Text style={{color:'black'}}>{item.item.UserNickName}</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize:10}}>{item.item.Floor}楼 5分钟前</Text>
                                </View>
                                <View style={{width:100,paddingLeft:85}}>
                                    <TouchableOpacity onPress={()=>{}} >
                                        <Icon name="trash" size={14} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        }
                        thumb={
                            <TouchableOpacity
                                onPress={()=>{navigate("UserInfo",{
                                    IsLoginUser :false,
                                    UserId : '100'
                                })}}
                            >
                                <Image source={require('./head.jpg')} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>
                            </TouchableOpacity>
                        }
                    />
                    <Card.Body>
                        <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:13}}>
                            {item.item.PostTitle}
                        </Text>
                    </Card.Body>
                    <Card.Footer
                        content={
                            <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    <Button size="small" >
                                        <Icon name="caret-up" size={15}/>
                                        <Text>  1213</Text>
                                    </Button>
                                    <Button size="small" style={{marginLeft:5}}>
                                        <Icon name="caret-down" size={15}/>
                                    </Button>
                                </View>
                                <TouchableOpacity onPress={this._OpenSubPostList}>
                                    <View
                                        style={{
                                            width:75,
                                            height:45,
                                            flexDirection:'row',
                                            justifyContent:'flex-end',
                                            alignItems:'center'
                                        }}
                                    >
                                        <Icon name="comment" size={15}/>
                                        <Text style={{fontSize:12,marginLeft:3}}>23条评论</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        }

                        style={{
                            height:30,
                            width:'100%',
                            flexDirection:'row',
                            alignItems:'center',
                            borderTopWidth:1,
                            borderTopColor:'#DDDDDD',
                            paddingTop:5
                        }}
                    />

                </Card>

            );
        }

    };

    _separator = ()  => {
        return (
            <View style={PostDetailCss.ItemSeparator}><Text> </Text></View>
        );
    };


    _OpenSubPostList = ()=>{
        this.setState({SubPostListOpen:!this.state.SubPostListOpen});
    };

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{width:'100%',height:'100%'}}>
                <Drawer
                    sidebar={<SubPostListPanel navigate={navigate}/>}
                    open={this.state.SubPostListOpen}
                    position='right'
                >
                    <FlatList
                        style={PostDetailCss.MainView}
                        data={this.state.PostData}
                        initialNumToRender={3}
                        renderItem = {this._renderItem}
                        ItemSeparatorComponent = {this._separator}
                    />
                </Drawer>
            </View>

        );
    }

}

export default connect()(PostDetailPanel);