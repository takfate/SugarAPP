import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, Drawer, InputItem, List, Toast,Modal,WhiteSpace} from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";
import {makeCommonImageUrl} from "../../CommonComponent";

function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    };
}


class PostItemPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            key:props.item.key,
            UserId : props.item.UserId,
            UserNickName : props.item.UserNickName,
            UserImageUrl : props.item.UserImageUrl,
            PostTime : props.item.PostTime,
            PostId : props.item.PostId,
            Content : props.item.Content,
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
        const {navigate} = this.props.navigation;
        const {userId} = this.props;
        const isMine = (userId === this.state.UserId);
        const isCollected = this.state.Collected;

        return (
            <View>
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
                                    <Text style={{fontSize:10}}>{this.state.PostTime}</Text>
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
                                        this.requestValuePost(sessionId,this.state.PostId,1);
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
                                        this.requestValuePost(sessionId,this.state.PostId,-1);
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
                <WhiteSpace size='lg'/>
            </View>
        );
    }
}


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

class CommentItemPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            key : props.item.key,
            PostTime : props.item.PostTime,
            Content : props.item.Content,
            UserId : props.item.UserId,
            UserNickName : props.item.UserNickName,
            UserImageUrl : props.item.UserImageUrl,
            UserScore : props.item.Score,
        };
    }

    _navigateToUser =(ToUserId) =>{
        const {userId,navigate} = this.props;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    requestValuePostComment = (sessionId,CommentId,isLike)=> {
        httpRequest.post('/alterSubReplyLikes', {
            session_id:sessionId,
            subreplyId:CommentId,
            isLike:isLike
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.setState({UserScore:this.state.UserScore+isLike});
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };


    render(){
        return (
            <Card full>
                <Card.Header
                    title={
                        <TouchableOpacity
                            onPress={()=>this._navigateToUser(this.state.UserId)}
                        >
                            <Text>{this.state.UserNickName}</Text>
                        </TouchableOpacity>
                    }
                    thumb={
                        <TouchableOpacity
                            onPress={()=>this._navigateToUser(this.state.UserId)}
                        >
                            <Image source={{uri:makeCommonImageUrl(this.state.UserImageUrl)}} style={CommentListCss.ItemImage}/>
                        </TouchableOpacity>
                    }
                />

                <Card.Body style={{paddingLeft:15,minHeight:5}}>
                    <Text style={{color:'black',fontSize:13}}>{this.state.Content}</Text>
                </Card.Body>
                <Card.Footer
                    content = {
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{
                                const {sessionId} =this.props;
                                this.requestValuePostComment(sessionId,this.state.key,1);
                            }}>
                                <Icon name='thumbs-up' size={12} color='red'/>
                            </TouchableOpacity>
                            <Text style={{fontSize:14,marginLeft:2,marginRight:6}}>
                                {this.state.UserScore}
                            </Text>
                            <TouchableOpacity onPress={()=>{
                                const {sessionId} =this.props;
                                this.requestValuePostComment(sessionId,this.state.key,-1);
                            }}>
                                <Icon name='thumbs-down' size={12} color='blue'/>
                            </TouchableOpacity>
                        </View>
                    }
                    extra={
                        <Text style={{fontSize:10,textAlign:'right'}}>
                            {this.state.PostTime}
                        </Text>
                    }
                />
            </Card>
        );
    }
}


export const PostItem = connect(mapStateToProps,null)(PostItemPanel);
export const CommentItem = connect(mapStateToProps,null)(CommentItemPanel);