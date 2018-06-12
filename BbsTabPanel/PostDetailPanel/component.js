import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, Drawer, InputItem, List, Toast} from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";
import {makeCommonImageUrl} from "../../CommonComponent";


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
            Data :[],
            Refreshing:false,
            selectedFloor: '0',
            selectedPostId : '0',
            newComment : ''
        };
    }

    _dataWrapper = (initData) =>{
        return {
            key : initData['subreplyId'].toString(),
            UserId : initData['userId'],
            UserNickName : initData['username'],
            UserImageUrl : initData['iconUrl'],
            PostTime : initData['subreplyTime'],
            Content : initData['content'],
            Score : initData['likes'],
        };
    };


    requestGetPostCommentList = (Data,sessionId,replyId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.post('/getSubReplyFromXGetN', {
            session_id:sessionId,
            replyId:replyId,
            x:x,
            n:n
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        Data:Data
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    requestNewPostCommment = (sessionId,replyId,Content) =>{
        Toast.loading('正在发表');
        httpRequest.post('/addSubReply', {
            session_id : sessionId,
            replyId : replyId,
            content :Content
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    Toast.success('发表成功',1);
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _updateNewCommentList = (PostId,Floor)=>{
        const {sessionId} = this.props;
        this.setState({selectedPostId:PostId,selectedFloor:Floor});
        this.requestGetPostCommentList([],sessionId,PostId,0,6);
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestGetPostCommentList([],sessionId,this.state.selectedPostId,0,6);
    };

    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestGetPostCommentList(this.state.Data.slice(),sessionId,this.state.selectedPostId,this.state.Data.length,6);
    };

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
                            <Image source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}} style={CommentListCss.ItemImage}/>
                        </TouchableOpacity>
                    }
                />

                <Card.Body style={{paddingLeft:15,minHeight:5}}>
                    <Text style={{color:'black',fontSize:13}}>{item.item.Content}</Text>
                </Card.Body>
                <Card.Footer
                    content = {
                        <Text style={{fontSize:10,textAlign:'left'}}>
                            {item.item.Score}
                        </Text>
                    }
                    extra={
                        <Text style={{fontSize:10,textAlign:'right'}}>
                            {item.item.PostTime}
                        </Text>
                    }
                />
            </Card>
        );
    };

    _separator = ()  => {
        return (
            <View style={CommentListCss.ItemSeparator}><Text> </Text></View>
        );
    };

    _updateNewComment = (value)=>{
        this.setState({newComment:value}) ;
    };

    _submitNewComment = () =>{
        const {sessionId} = this.props;
        this.requestNewPostCommment(sessionId,this.state.selectedPostId,this.state.newComment);
    };

    render(){
        const {sessionId} = this.props;
        return(
            <View style={{width:'100%',height:'100%',justifyContent:'flex-end'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:'#DDDDDD'}}>
                    <Text >{this.state.selectedFloor} 楼的评论</Text>
                </View>
                <FlatList
                    style={CommentListCss.MainView}
                    data={this.state.Data}
                    initialNumToRender={3}
                    renderItem = {this._renderItem}
                    ItemSeparatorComponent = {this._separator}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
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
                            placeholder={"在"+this.state.selectedFloor+"楼写下你的看法..."}
                            maxLength={50}
                            value={this.state.newComment}
                            onChange={this._updateNewComment}
                        />
                    </View>
                    <View style={{width:50,height:45,paddingTop:11}}>
                        <TouchableOpacity onPress={this._submitNewComment} style={{paddingLeft:10}}>
                            <Text style={{fontSize:15,color:'black'}} >发送</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        );
    }

}


function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


class PostDetailPanel extends Component{

    static navigationOptions = ({ navigation }) =>({
        headerStyle:{
            height:55,
        },
        headerRight:
            <TouchableOpacity onPress={()=>{navigation.navigate('ReturnPost',{topicId:navigation.state.params.topicId})}}>
                <Text style={{fontSize:18,color:'black',marginRight:10}} >回帖</Text>
            </TouchableOpacity>
    });

    constructor(props){
        super(props);
        this.state = {
            SubPostListOpen:false,
            Data:[],
            Refreshing:false
        };
    }

    _dataWrapper = (initData) =>{
        return {
            key : initData['floor'].toString(),
            PostId : initData['replyId'],
            UserId : initData['userId'],
            UserNickName : initData['username'],
            UserImageUrl : initData['iconUrl'],
            PostTime : initData['replyTime'],
            Content : initData['content'],
            Images : [initData['picture1'],initData['picture2'],initData['picture3'],initData['picture4'],initData['picture5']],
            Score : initData['likes'],
            CommentCount : initData['comNumber']
        };
    };


    requestGetTopicDetail = (Data,sessionId,topicId)=>{
        this.setState({Refreshing:true});
        httpRequest.post('/getTopicByTopicId', {
            session_id:sessionId,
            topicId:topicId
        })
            .then((response) => {
                let data = response.data;

                if (data['code'] === 0) {
                    let resData=data.data;

                    Data.push({
                        key:'0',
                        UserId : resData['userId'],
                        UserNickName : resData['username'],
                        UserImageUrl : resData['iconUrl'],
                        PostTime : resData['topicTime'],
                        Content : resData['content'],
                        Collected : resData['favorite'],
                        Images : [resData['picture1'],resData['picture2'],resData['picture3'],resData['picture4'],resData['picture5']],
                        Score : resData['likes']
                    });
                    this.requestGetTopicPostList(Data,sessionId,topicId,0,10);
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    requestGetTopicPostList = (Data,sessionId,topicId,x,n) =>{
        httpRequest.post('/getReplyFromXGetN', {
            session_id:sessionId,
            topicId:topicId,
            x:x,
            n:n
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        Data:Data
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };


    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        const {params} = this.props.navigation.state;
        this.requestGetTopicDetail([],sessionId,params.topicId);
    };

    componentDidMount(){
        const {sessionId}  = this.props;
        const {params} = this.props.navigation.state;
        this.requestGetTopicDetail(this.state.Data.slice(),sessionId,params.topicId);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        const {params} = this.props.navigation.state;
        this.requestGetTopicPostList(this.state.Data.slice(),sessionId,params.topicId,this.state.Data.length-1,10);
    };

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
                                <Image source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>
                            </TouchableOpacity>
                        }
                    />
                    <Card.Body>
                        <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:13}}>
                            {item.item.Content}
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
                                    <Text>{item.item.Score}</Text>
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
                                    <Text style={{fontSize:10}}>{item.item.key}楼 {item.item.PostTime}</Text>
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
                                <Image source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>
                            </TouchableOpacity>
                        }
                    />
                    <Card.Body>
                        <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:13}}>
                            {item.item.Content}
                        </Text>
                    </Card.Body>
                    <Card.Footer
                        content={
                            <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    <Button size="small" >
                                        <Icon name="caret-up" size={15}/>
                                        <Text>{item.item.Score}</Text>
                                    </Button>
                                    <Button size="small" style={{marginLeft:5}}>
                                        <Icon name="caret-down" size={15}/>
                                    </Button>
                                </View>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.setState({SubPostListOpen:true});
                                        this.refs.getCommentList._updateNewCommentList(item.item.PostId,item.item.key);
                                    }}
                                >
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
                                        <Text style={{fontSize:12,marginLeft:3}}>{item.item.CommentCount}条评论</Text>
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


    _updateOpenState = (value) => {
        if(!value)this.setState({SubPostListOpen:false});
    };

    render(){
        const { navigate } = this.props.navigation;
        const {sessionId} = this.props;
        return(
            <View style={{width:'100%',height:'100%'}}>
                <Drawer
                    sidebar={
                        <SubPostListPanel
                            navigate={navigate}
                            sessionId={sessionId}
                            ref='getCommentList'
                        />
                    }
                    open={this.state.SubPostListOpen}
                    onOpenChange={this._updateOpenState}
                    position='right'
                >
                    <FlatList
                        style={PostDetailCss.MainView}
                        data={this.state.Data}
                        initialNumToRender={3}
                        renderItem = {this._renderItem}
                        ItemSeparatorComponent = {this._separator}
                        refreshing={this.state.Refreshing}
                        onRefresh={this._refresh}
                        onEndReached={this._loadMoreData}
                        onEndReachedThreshold={0.1}
                    />
                </Drawer>
            </View>

        );
    }

}

export default connect(mapStateToProps,null)(PostDetailPanel);