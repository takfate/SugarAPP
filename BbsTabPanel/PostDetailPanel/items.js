import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, Drawer, InputItem, List, Toast} from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";
import {makeCommonImageUrl} from "../../CommonComponent";

function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


class PostMainItemPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            key:props.item.key,
            UserId : props.item.UserId,
            UserNickName : props.item.UserNickName,
            UserImageUrl : props.item.UserImageUrl,
            PostTime : props.item.PostTime,
            Content : props.item.Content,
            Collected : props.item.Collected,
            Images : props.item.Images,
            Score : props.item.Score,
        };
    }

    _navigateToUser =(ToUserId) =>{
        const {userId} = this.props;
        const {navigate} = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    requestValueTopic = (sessionId,topicId,isLike)=>{
        httpRequest.post('/alterTopicLikes', {
            session_id:sessionId,
            topicId:topicId,
            isLike:isLike
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.setState({Score:this.state.Score+isLike});
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    render(){
        const {navigate} = this.props.navigation;
        return (
            <Card full>
                <Card.Header
                    title={
                        <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <View style={{flex:1}}>
                                <TouchableOpacity
                                    onPress={()=>this._navigateToUser(this.state.UserId)}
                                >
                                    <Text style={{color:'black'}}>{this.state.UserNickName}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:10}}>楼主 {this.state.PostTime}</Text>
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
                            onPress={()=>this._navigateToUser(this.state.UserId)}
                        >
                            <Image source={{uri:makeCommonImageUrl(this.state.UserImageUrl)}} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>
                        </TouchableOpacity>
                    }
                />
                <Card.Body>
                    <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:13}}>
                        {this.state.Content}
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
                            <Button
                                size="small"
                                onClick={()=>{
                                    const {sessionId} = this.props;
                                    const {params} = this.props.navigation.state;
                                    this.requestValueTopic(sessionId,params.topicId,1);
                                }}
                            >
                                <Icon name="caret-up" size={15}/>
                                <Text>{this.state.Score}</Text>
                            </Button>
                            <Button
                                size="small"
                                style={{marginLeft:5}}
                                onClick={()=>{
                                    const {sessionId} = this.props;
                                    const {params} = this.props.navigation.state;
                                    this.requestValueTopic(sessionId,params.topicId,-1);
                                }}
                            >
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
    }
}

class PostCommonItemPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            key:props.item.key,
            PostId : props.item.PostId,
            UserId : props.item.UserId,
            UserNickName : props.item.UserNickName,
            UserImageUrl : props.item.UserImageUrl,
            PostTime : props.item.PostTime,
            Content : props.item.Content,
            Images : props.item.Images,
            Score : props.item.Score,
            CommentCount : props.item.CommentCount,
        };
    }

    _navigateToUser =(ToUserId) =>{
        const {userId} = this.props;
        const {navigate} = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };


    requestValuePost = (sessionId,postId,isLike) => {
        httpRequest.post('/alterReplyLikes', {
            session_id:sessionId,
            replyId:postId,
            isLike:isLike
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.setState({Score:this.state.Score+isLike});
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    render(){
        const {navigation} = this.props;
        return (
            <Card style={{marginLeft:10,marginRight:5}}>
                <Card.Header
                    title={
                        <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <View style={{flex:1}}>
                                <TouchableOpacity
                                    onPress={()=>this._navigateToUser(this.state.UserId)}
                                >
                                    <Text style={{color:'black'}}>{this.state.UserNickName}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:10}}>{this.state.key}楼 {this.state.PostTime}</Text>
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
                            onPress={()=>this._navigateToUser(this.state.UserId)}
                        >
                            <Image source={{uri:makeCommonImageUrl(this.state.UserImageUrl)}} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>
                        </TouchableOpacity>
                    }
                />
                <Card.Body>
                    <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:13}}>
                        {this.state.Content}
                    </Text>
                </Card.Body>
                <Card.Footer
                    content={
                        <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Button
                                    size="small"
                                    onClick={()=>{
                                        const {sessionId} = this.props;
                                        const {params} = this.props.navigation.state;
                                        this.requestValuePost(sessionId,params.topicId,1);
                                    }}
                                >
                                    <Icon name="caret-up" size={15}/>
                                    <Text>{this.state.Score}</Text>
                                </Button>
                                <Button
                                    size="small"
                                    style={{marginLeft:5}}
                                    onClick={()=>{
                                        const {sessionId} = this.props;
                                        const {params} = this.props.navigation.state;
                                        this.requestValuePost(sessionId,params.topicId,-1);
                                    }}
                                >
                                    <Icon name="caret-down" size={15}/>
                                </Button>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{this.props.transGetCommentList(this.state.PostId,this.state.key)}}
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
                                    <Text style={{fontSize:12,marginLeft:3}}>{this.state.CommentCount}条评论</Text>
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
}


export const TopicItem = connect(mapStateToProps,null)(PostMainItemPanel);
export const PostItem = connect(mapStateToProps,null)(PostCommonItemPanel);