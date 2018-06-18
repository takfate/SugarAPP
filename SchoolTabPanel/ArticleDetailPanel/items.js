import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card, Drawer, InputItem, List, Toast,Modal} from 'antd-mobile';
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

class ArticleCommonItemPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            key:props.item.key,
            PostTime : props.item.PostTime,
            Content : props.item.Content,
            UserId : props.item.UserId,
            UserNickName : props.item.UserNickName,
            UserImageUrl : props.item.UserImageUrl,
            UserScore : props.item.UserScore,
        };
    }

    _navigateToUser =(ToUserId) =>{
        const {userId,navigate} = this.props;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    requestValueArticleComment = (sessionId,commentId,isLike)=> {
        httpRequest.post('/alterCommentLikes', {
            session_id:sessionId,
            commentId:commentId,
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
                            onPress={()=>{this._navigateToUser(this.state.UserId)}}
                        >
                            <Text>{this.state.UserNickName}</Text>
                        </TouchableOpacity>
                    }
                    thumb={
                        <TouchableOpacity
                            onPress={()=>{this._navigateToUser(this.state.UserId)}}
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
                                this.requestValueArticleComment(sessionId,this.state.key,1);
                            }}>
                                <Icon name='thumbs-up' size={12} color='red'/>
                            </TouchableOpacity>
                            <Text style={{fontSize:14,marginLeft:2,marginRight:6}}>
                                {this.state.UserScore}
                            </Text>
                            <TouchableOpacity onPress={()=>{
                                const {sessionId} =this.props;
                                this.requestValueArticleComment(sessionId,this.state.key,-1);
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


export const CommentItem = connect(mapStateToProps,null)(ArticleCommonItemPanel);