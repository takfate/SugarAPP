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
import {Button, NavBar,Card,List,ListView,WhiteSpace,InputItem,Toast} from 'antd-mobile';
import CommonListPanel from '../CommonListPanel';
import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";
import {makeCommonImageUrl} from "../../CommonComponent";
import {PostItem,CommentItem} from "./items";
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
            Data : [],
            Refreshing:false,
            Total : 0
        };
    }

    _dataWrapper = (initData) =>{
        return {
            key : initData['followId'].toString(),
            UserNickName :initData['username'],
            UserImageUrl : initData['iconUrl']
        };
    };

    requestGetMyWatchList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/accounts/following', {
            params:{
                session_id:sessionId,
                begin_id:x,
                need_number:n
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total:data.total
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
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyWatchList([],sessionId,0,10);
    };

    componentDidMount(){
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyWatchList(this.state.Data.slice(),sessionId,0,10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyWatchList(this.state.Data.slice(),sessionId,this.state.Data.length,10);
    };

    _navigateToUser =(ToUserId) =>{
        const {userId} = this.props.navigation.state.params;
        const {navigate} = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        return (
            <TouchableHighlight
                onPress={()=>{this._navigateToUser(item.item.key)}}
            >
                <Card full>
                    <Card.Header
                        title={item.item.UserNickName}
                        thumb = {
                            <Image
                                source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}}
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
                    <Text >共关注了{this.state.Total}个糖友</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
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
            Data : [],
            Refreshing:false,
            Total : 0
        };
    }


    _dataWrapper = (initData) =>{
        return {
            key : initData['followMeId'].toString(),
            UserNickName :initData['username'],
            UserImageUrl : initData['iconUrl']
        };
    };

    requestGetWatchMeList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/accounts/follower', {
            params:{
                session_id:sessionId,
                begin_id:x,
                need_number:n
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    // alert(JSON.stringify(data));
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total:data.total
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
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetWatchMeList([],sessionId,0,10);
    };

    componentDidMount(){
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetWatchMeList(this.state.Data.slice(),sessionId,0,10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetWatchMeList(this.state.Data.slice(),sessionId,this.state.Data.length,10);
    };

    _navigateToUser =(ToUserId) =>{
        const {userId} = this.props.navigation.state.params;
        const {navigate} = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        return (
            <TouchableHighlight
                onPress={()=>{this._navigateToUser(item.item.key)}}
            >
                <Card full>
                    <Card.Header
                        title={item.item.UserNickName}
                        thumb = {
                            <Image
                                source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}}
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
                    <Text >共有{this.state.Total}个糖友关注我</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

export class MyCollectedArticleListPanel extends Component{

    static navigationOptions = {
        headerTitle:"我收藏的文章",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state =  {
            Data : [],
            Refreshing :false,
            Total : 0
        };
    }

    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        return (

            <TouchableHighlight
                onPress={()=>{navigate('ArticleDetail',{
                    ArticleId: item.item.key,
                    Title :item.item.Title
                })}}
            >
                <Card full>
                    <Card.Header
                        title={item.item.Title}
                    />
                    <Card.Body>
                        <Text style={{paddingLeft:15}}>{item.item.Content}</Text>
                    </Card.Body>
                </Card>
            </TouchableHighlight>

        ) ;
    };

    _dataWrapper = (initData) =>{
        return {
            key : initData['articleId'].toString(),
            Title :initData['title'],
            Content : initData['content']
        };
    };

    requestGetMyCollectedArticleList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/school/articles/user-collected', {
            params:{
                session_id:sessionId,
                begin_id:x,
                need_number:n
            },
        })
            .then((response) => {
                let data = response.data;

                if (data['code'] === 0) {
                    data = data.data;
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    console.log(Data);
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total:data.total
                    });
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyCollectedArticleList([],sessionId,0,10);
    };

    componentDidMount(){
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyCollectedArticleList(this.state.Data.slice(),sessionId,0,10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyCollectedArticleList(this.state.Data.slice(),sessionId,this.state.Data.length,10);
    };

    render(){
        return (
            <View style={{height:'100%',width:'100%'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12}}>
                    <Text >共收藏了{this.state.Total}篇文章</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

export class MyCommentListPanel extends Component{

    static navigationOptions = {
        headerTitle:"我的评论",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state =  {
            Data : [],
            Refreshing: false,
            Total:0
        };
    }
    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        let FooterContent = null;
        let score = parseInt(item.item.Score);
        if(score>0){
            FooterContent =
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                        <Text>
                            {item.item.PostTime}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='thumbs-up' color='red' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.Score}</Text>
                    </View>
                </View>

        }else if(score<0){
            FooterContent =
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                        <Text>
                            {item.item.PostTime}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='thumbs-down' color='blue' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.Score}</Text>
                    </View>
                </View>
        }else{
            FooterContent =
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                        <Text>
                            {item.item.PostTime}
                        </Text>
                    </View>
                </View>
        }
        return (
            <TouchableHighlight
                onPress={()=>{navigate('ArticleDetail',{
                    ArticleId: item.item.ArticleId,
                    Title :item.item.Title
                })}}
            >
                <Card full>
                    <Card.Header
                        title={item.item.Title}

                    />
                    <Card.Body>
                        <Text style={{color:'black',paddingLeft:15}}>
                            评论：{item.item.Content}
                        </Text>
                    </Card.Body>
                    <Card.Footer content={FooterContent} />
                </Card>
            </TouchableHighlight>

        ) ;
    };

    _dataWrapper = (initData) =>{
        return {
            key : initData['commentId'].toString(),
            Title :initData['title'],
            Content : initData['content'],
            ArticleId : initData['articleId'],
            Score : initData['likes'],
            PostTime : initData['commentTime']
        };
    };

    requestGetMyArticleCommentList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/school/articles/user-comments', {
            params:{
                session_id:sessionId,
                begin_id:x,
                need_number:n
            },
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    console.log(Data);
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total : data.total
                    });
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyArticleCommentList([],sessionId,0,10);
    };

    componentDidMount(){
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyArticleCommentList(this.state.Data.slice(),sessionId,0,10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyArticleCommentList(this.state.Data.slice(),sessionId,this.state.Data.length,10);
    };

    render(){
        return (
            <View style={{height:'100%',width:'100%'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12}}>
                    <Text >共发表了{this.state.Total}条评论</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

export class MyPublishedTopicListPanel extends Component {

    static navigationOptions = {
        headerTitle:"我发布的话题",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state =  {
            Data : [],
            Refreshing:false,
            Total : 0
        };
    }
    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        let FooterContent = null;
        let score = parseInt(item.item.Score);
        if(score>0){
            FooterContent =
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='comment'  style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.CommentCount}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='star' color='orange' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.CollectedCount}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='thumbs-up' color='red' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.Score}</Text>
                    </View>
                </View>

        }else if(score<0){
            FooterContent =
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='comment' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.CommentCount}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='star' color='orange' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.CollectedCount}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='thumbs-down' color='blue' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.Score}</Text>
                    </View>
                </View>
        }else{
            FooterContent =
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='comment' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.CommentCount}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='star' color='orange' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.CollectedCount}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='thumbs-up'  style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.Score}</Text>
                    </View>
                </View>
        }
        return (
            <TouchableHighlight
                onPress={()=>{navigate('PostDetail',{topicId:item.item.key})}}
            >
                <Card full>
                    <Card.Header
                        title={item.item.PostTime}
                    />
                    <Card.Body>
                        <Text style={{color:'black',paddingLeft:15}}>
                            {item.item.Content}
                        </Text>
                    </Card.Body>
                    <Card.Footer content={FooterContent} />
                </Card>
            </TouchableHighlight>

        ) ;
    };

    _dataWrapper = (initData) =>{
        return {
            key : initData['topicId'].toString(),
            Content : initData['content'],
            CommentCount : initData['replyCount'],
            Score : initData['likes'],
            PostTime : initData['topicTime'],
            CollectedCount : initData['favoriteNum']
        };
    };

    requestGetMyPublishedTopicList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/bbs/topics/user-published', {
            params:{
                session_id:sessionId,
                begin_id:x,
                need_number:n
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total : data.total
                    });
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyPublishedTopicList([],sessionId,0,10);
    };

    componentDidMount(){
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyPublishedTopicList(this.state.Data.slice(),sessionId,0,10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyPublishedTopicList(this.state.Data.slice(),sessionId,this.state.Data.length,10);
    };

    render(){
        return (
            <View style={{height:'100%',width:'100%'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12}}>
                    <Text >共发布了{this.state.Total}个话题</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

export class MyCollectedTopicListPanel extends Component{

    static navigationOptions = {
        headerTitle:"我收藏的话题",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state =  {
            Data : [],
            Refreshing:false,
            Total : 0
        };
    }
    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        return (

            <TouchableHighlight
                onPress={()=>{navigate('PostDetail',{topicId:item.item.key})}}
            >
                <Card full>
                    <Card.Header
                        title={item.item.UserNickName}
                        thumb = {
                            <Image
                                source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}}
                                style={{
                                    height:30,
                                    width:30,
                                    marginRight:10,
                                    borderRadius:15,
                                }}
                            />
                        }
                    />
                    <Card.Body>
                        <Text style={{color:'black',paddingLeft:15}}>
                            {item.item.Content}
                        </Text>
                    </Card.Body>
                    <Card.Footer
                        content={
                            item.item.LastFloor===0?<Text>楼主还未更新</Text>:<Text>楼主更新到了{item.item.LastFloor}楼</Text>}
                    />
                </Card>
            </TouchableHighlight>

        ) ;
    };

    _dataWrapper = (initData) =>{
        return {
            key : initData['topicId'].toString(),
            Content : initData['content'],
            UserId  : initData['userId'],
            UserImageUrl : initData['iconUrl'],
            UserNickName : initData['username'],
            LastFloor : initData['lastFloor']
        };
    };

    requestGetMyCollectedTopicList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/bbs/topics/user-collected', {
            params:{
                session_id:sessionId,
                begin_id:x,
                need_number:n
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total : data.total
                    });
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyCollectedTopicList([],sessionId,0,10);
    };

    componentDidMount(){
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyCollectedTopicList(this.state.Data.slice(),sessionId,0,10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyCollectedTopicList(this.state.Data.slice(),sessionId,this.state.Data.length,10);
    };

    render(){
        return (
            <View style={{height:'100%',width:'100%'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12}}>
                    <Text >共收藏了{this.state.Total}个话题</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

export class MyResponseListPanel extends Component{

    static navigationOptions = {
        headerTitle:"我的回复",
        headerStyle:{
            height:55,
        },
    };
    constructor(props){
        super(props);
        this.state =  {
            Data : [],
            Refreshing : false,
            Total : 0
        };
    }
    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        const {sessionId,userId}  = this.props.navigation.state.params;
        let FooterContent = null;
        let score = parseInt(item.item.Score);
        if(score>0){
            FooterContent =
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:15,paddingRight:15,marginTop:5}}>
                    <View>
                        <Text >
                            {item.item.PostTime}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Icon name='thumbs-up' color='red' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.Score}</Text>
                    </View>
                </View>

        }else if(score<0){
            FooterContent =
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:15,paddingRight:15,marginTop:5}}>
                    <View>
                        <Text >
                            {item.item.PostTime}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='thumbs-down' color='blue' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.Score}</Text>
                    </View>
                </View>
        }else{
            FooterContent =
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:15,paddingRight:15,marginTop:5}}>
                    <View>
                        <Text >
                            {item.item.PostTime}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='thumbs-up' style={{marginRight:5,marginTop:4}}/>
                        <Text>{item.item.Score}</Text>
                    </View>
                </View>
        }

        if(item.item.type==='subreply'){
            return (
                <TouchableHighlight
                    onPress={()=>{
                        navigate('SubPostDetail',{
                            Floor:item.item.Floor,
                            TopicId:item.item.TopicId,
                            sessionId:sessionId,
                            PostId :item.item.PostId,
                            userId:userId
                        })
                    }}
                >
                    <Card full>
                        <Card.Body>
                            <Text style={{color:'black',paddingLeft:15}}>回复：{item.item.CommentContent}</Text>
                            {FooterContent}
                        </Card.Body>
                        <Card.Footer
                            content={
                                <Text >
                                    原贴：{item.item.PostContent}
                                </Text>
                            }
                            style={{borderTopWidth:1,borderTopColor:'#DDDDDD'}}
                        />
                    </Card>
                </TouchableHighlight>

            ) ;
        }else{
            return (

                <TouchableHighlight
                    onPress={()=>{navigate('PostDetail',{topicId:item.item.TopicId})}}
                >
                    <Card full>
                        <Card.Body>
                            <Text style={{color:'black',paddingLeft:15}}>回复：{item.item.PostContent}</Text>
                            {FooterContent}
                        </Card.Body>
                        <Card.Footer
                            content={
                                <Text >
                                    原贴：{item.item.TopicContent}
                                </Text>
                            }
                            style={{borderTopWidth:1,borderTopColor:'#DDDDDD'}}
                        />
                    </Card>
                </TouchableHighlight>

            ) ;
        }

    };

    _dataWrapper = (initData) =>{
        if(initData['type']==='reply'){
            return {
                type: initData['type']  ,
                key : 'reply'+initData['replyId'].toString(),
                TopicId : initData['topicId'],
                PostTime : initData['time'],
                Score : initData['likes'],
                TopicContent : initData['topicContent'],
                PostContent : initData['replyContent']
            };
        }else{
            return {
                type : initData['type'],
                key : 'subreply'+initData['subreplyId'].toString(),
                TopicId :initData['topicId'].toString(),
                PostId : initData['replyId'],
                PostTime: initData['time'],
                CommentContent : initData['subreplyContent'],
                PostContent : initData['replyContent'],
                Score : initData['likes'],
                Floor : initData['floor'].toString()
            }
        }
    };

    requestGetMyResponseList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/bbs/topics/user-replies', {
            params:{
                session_id:sessionId,
                begin_id:x,
                need_number:n
            }
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._dataWrapper(data.data[i]));
                    }
                    console.log(Data);
                    this.setState({
                        Refreshing:false,
                        Data:Data,
                        Total : data.total
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
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyResponseList([],sessionId,0,10);
    };

    componentDidMount(){
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyResponseList(this.state.Data.slice(),sessionId,0,10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props.navigation.state.params;
        this.requestGetMyResponseList(this.state.Data.slice(),sessionId,this.state.Data.length,10);
    };

    render(){
        return (
            <View style={{height:'100%',width:'100%'}}>
                <View style={{height:30,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12}}>
                    <Text >共有{this.state.Total}条回复</Text>
                </View>
                <CommonListPanel
                    RealData = {this.state.Data}
                    InitNum = {10}
                    RenderItem = {this._renderItem}
                    style={{height:'100%'}}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

export class SubPostDetailPanel extends Component{

    static navigationOptions = ({ navigation }) =>({
        headerTitle: navigation.state.params.Floor+"楼回复",
        headerRight:
            <TouchableOpacity onPress={()=>{navigation.navigate('PostDetail',{topicId:navigation.state.params.TopicId})}}>
                <Text style={{fontSize:18,color:'black',marginRight:10}}>查看话题</Text>
            </TouchableOpacity>,
        headerStyle:{
            height:55,
        }
    });
    constructor(props){
        super(props);
        this.state =  {
            Data : [],
            Refreshing:false,
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


    requestGetPostDetail = (Data,sessionId,topicId,x,n,postId)=>{
        this.setState({Refreshing:true});
        httpRequest.post('/getReplyFromXGetN', {
            session_id:sessionId,
            topicId:topicId,
            x:x,
            n:n
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    let resData=data.data[0];

                    Data.push({
                        key:'0',
                        PostId : resData['replyId'],
                        UserId : resData['userId'],
                        UserNickName : resData['username'],
                        UserImageUrl : resData['iconUrl'],
                        PostTime : resData['replyTime'],
                        Content : resData['content'],
                        Images : [resData['picture1'],resData['picture2'],resData['picture3'],resData['picture4'],resData['picture5']],
                        Score : resData['likes']
                    });
                    this.requestGetPostCommentList(Data,sessionId,postId,0,10);
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                // alert(error);
                Toast.fail('网络好像有问题~');
            });
    };

    requestGetPostCommentList = (Data,sessionId,postId,x,n) =>{
        httpRequest.post('/getSubReplyFromXGetN', {
            session_id:sessionId,
            replyId:postId,
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
                    Toast.offline(data['msg']);
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
                    this.setState({newComment:''});
                } else {
                    Toast.offline(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {params} = this.props.navigation.state;
        let floor = parseInt(params.Floor);
        this.requestGetPostDetail([],params.sessionId,params.TopicId,floor-1,1,params.PostId);
    };

    componentDidMount(){
        const {params} = this.props.navigation.state;
        let floor = parseInt(params.Floor);
        this.requestGetPostDetail([],params.sessionId,params.TopicId,floor-1,1,params.PostId);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {params} = this.props.navigation.state;
        this.requestGetPostCommentList(this.state.Data.slice(),params.sessionId,params.PostId,this.state.Data.length-1,10);
    };

    _updateNewComment =  (value)=>{
        this.setState({newComment :value}) ;
    };

    _submitNewComment = ()=>{
        const {sessionId,PostId} = this.props.navigation.state.params;
        this.requestNewPostCommment(sessionId,PostId,this.state.newComment);
        this.setState({newComment:''});
    };

    _navigateToUser =(ToUserId) =>{
        const {userId} = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _renderItem = (item)=>{
        const { navigate } = this.props.navigation;
        if(item.item.key==='0'){
            return (
                    <PostItem
                        key={item.item.key}
                        item={item.item}
                        navigation={this.props.navigation}
                    />
            );
        }else{
            return (
                <CommentItem
                    key={item.item.key}
                    item={item.item}
                    navigation={this.props.navigation}
                />
            );
        }


    };

    render(){
        return (
            <View style={{height:'100%',width:'100%'}}>

                <FlatList
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
                            placeholder="写下你的看法...."
                            maxLength={50}
                            onChange={this._updateNewComment}
                            value={this.state.newComment}
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
