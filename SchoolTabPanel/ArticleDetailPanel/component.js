

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList,TouchableOpacity,WebView} from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,TextareaItem,Drawer ,Toast,Badge } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from '../../httpRequest';
import {CommentItem} from './items';
import {makeCommonImageUrl} from '../../CommonComponent';

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
            Data :[],
            Refreshing:false,
        };
        this.props.onRef(this);
    }

    _dataWrapper = (initData) =>{
        return {
            key : initData['commentId'].toString(),
            Content : initData['content'],
            PostTime : initData['commentTime'],
            UserImageUrl : initData['iconUrl'],
            UserId : initData['userId'],
            UserScore : initData['likes'],
            UserNickName :initData['username']
        };
    };

    requestGetCommentList = (Data,sessionId,articleId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/school/article/comments', {
            params:{
                session_id:sessionId,
                article_id:articleId,
                begin_id:x,
                need_number:n
            }
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
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                alert(error);
                Toast.fail('网络好像有问题~');
            });
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId,articleId}  = this.props;
        this.requestGetCommentList([],sessionId,articleId,0,10);
    };

    componentDidMount(){
        const {sessionId,articleId}  = this.props;
        this.requestGetCommentList(this.state.Data.slice(),sessionId,articleId,0,10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId,articleId}  = this.props;
        this.requestGetCommentList(this.state.Data.slice(),sessionId,articleId,this.state.Data.length,10);
    };

    _navigateToUser =(ToUserId) =>{
        const {userId,navigate} = this.props;
        navigate("UserInfo",{
            isLoginUser :userId === ToUserId,
            UserId : ToUserId
        });
    };

    _renderItem = (item) =>{
        const {navigate} = this.props;
        return (
            <CommentItem item={item.item} navigate={navigate} />
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
                refreshing={this.state.Refreshing}
                onRefresh={this._refresh}
                onEndReached={this._loadMoreData}
                onEndReachedThreshold={0.1}
                ListEmptyComponent={
                    <View style={{
                        backgroundColor:'#DDDDDD',
                        width:'100%',
                        height:100,
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    >
                        <Text>此文章暂无评论</Text>
                    </View>
                }
            />
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

class ArticleDetailPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: <Text style={{fontSize:15,color:'black'}}>{navigation.state.params.Title}</Text>,
        headerStyle:{
            height:55,
        }
    });
    constructor(props){
        super(props);
        this.state = {
            InputFocus :false,
            CommentListOpen :false,
            ArticleUrl :'',
            Collected : false,
            CommentCount : 0,
            NewCommentContent :''
        }
    }

    requestArticleInfo = (seesionId,articleId)=>{
        httpRequest.get('/school/article', {
            params:{
                session_id : seesionId,
                article_id :articleId
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    // alert(JSON.stringify(data));
                    this.setState({
                        ArticleUrl: data['contentUrl'],
                        CommentCount : data['comNumber'],
                        Collected : data['collected']
                    })
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                // alert(223213);
                Toast.fail('网络好像有问题~');
            });
    };

    componentDidMount() {
        const {sessionId}  = this.props;
        const {params} = this.props.navigation.state;
        this.requestArticleInfo(sessionId,params.ArticleId);
    }

    _openCommentList = ()=>{
        this.setState({CommentListOpen:!this.state.CommentListOpen});
    };

    _updateOpenState = (value) => {
        if(!value)this.setState({CommentListOpen:false});
    };

    requestCollectArticle = ()=>{
        const {sessionId}  = this.props;
        const {params} = this.props.navigation.state;
        httpRequest.post('/school/articles/user-collect', {
            session_id:sessionId,
            article_id:params.ArticleId
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.setState({Collected:true});
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    requestCancelCollectArticle = ()=>{
        const {sessionId}  = this.props;
        const {params} = this.props.navigation.state;
        httpRequest.post('/school/articles/user-cancel-collect', {
            session_id:sessionId,
            article_id:params.ArticleId
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.setState({Collected:false});
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _updateCommentContent = (value) =>{
        this.setState({NewCommentContent:value});
    };

    requestAddArticleComment = (sessionId,ArticleId,Content)=>{
        Toast.loading('正在评论',0);
        httpRequest.post('/school/article/comment', {
            session_id:sessionId,
            article_id:ArticleId,
            content:Content
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    Toast.success('评论成功',1);
                    this.setState({
                        NewCommentContent:'',
                        CommentCount: this.state.CommentCount + 1,
                        InputFocus:false
                    });
                    this.commentList._loadMoreData();
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _submitComment = ()=>{
        const {sessionId}  = this.props;
        const {params} = this.props.navigation.state;
        this.requestAddArticleComment(sessionId,params.ArticleId,this.state.NewCommentContent);
    };

    render(){
        const { navigate } = this.props.navigation;
        const {sessionId,userId}  = this.props;
        const {params} = this.props.navigation.state;
        return(
            <Drawer
                sidebar={
                    <CommentListPanel
                        navigate={navigate}
                        sessionId={sessionId}
                        articleId={params.ArticleId}
                        userId={userId}
                        onRef={(e)=>{this.commentList=e}}
                    />
                }
                open={this.state.CommentListOpen}
                position='right'
                onOpenChange={this._updateOpenState}
            >
                <View style={{width:"100%",height:"100%",flexDirection:'column',justifyContent:'flex-end'}}>
                    <WebView
                        style={{
                            height:'100%',
                            width:'100%',
                        }}
                        source={{uri:makeCommonImageUrl(this.state.ArticleUrl)+`?session_id=${sessionId}`}}
                        startInLoadingState={true}
                    />
                    <View
                        style={{
                            height:50,
                            width:'100%',
                            flexDirection:'row',
                            alignItems:'center',
                            paddingLeft:12,
                            paddingRight:12,
                            borderTopColor:'#DDDDDD',
                            borderTopWidth:1
                        }}>
                        <View style={{flex:1,height:50,paddingTop:5}}>
                            <TextareaItem
                                count={100}
                                style={{
                                    height:40,
                                    borderColor:'#DDDDDD',
                                    borderWidth:1,
                                    borderRadius:15,
                                    paddingRight:9
                                }}
                                placeholder="添加评论"
                                value={this.state.NewCommentContent}
                                onChange={this._updateCommentContent}
                                onFocus = {()=>{this.setState({InputFocus:true})}}
                                onBlur = {()=>{this.setState({InputFocus:false})}}
                            />
                        </View>
                        {
                            this.state.InputFocus?
                                <View style={{width:50,height:45,paddingTop:11}}>
                                    <TouchableOpacity onPress={this._submitComment} style={{paddingLeft:10}}>
                                        <Text style={{fontSize:16,color:'black'}} >发送</Text>
                                    </TouchableOpacity>
                                </View> :
                                <View style={{width:90,height:45,paddingTop:10,flexDirection:'row'}}>
                                    <TouchableOpacity
                                        onPress={this.state.Collected?this.requestCancelCollectArticle:this.requestCollectArticle}
                                        style={{paddingLeft:10,paddingRight:10}}
                                    >
                                        <Icon name="star" color={this.state.Collected?'orange':null} size={25} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this._openCommentList}
                                    >
                                        <Text style={{fontSize:18}}>
                                            <Icon name="comments" size={25} />
                                            {this.state.CommentCount>99?'99+':this.state.CommentCount}
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                        }
                    </View>
                </View>
            </Drawer>

        );
    }

}

export default connect(mapStateToProps,null)(ArticleDetailPanel);