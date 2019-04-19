

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList,TouchableHighlight,TouchableOpacity} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,SearchBar,Tag,Carousel,WingBlank } from 'antd-mobile';
import {Modal, Toast} from "antd-mobile/lib/index";
import httpRequest from "../../httpRequest";
import {makeCommonImageUrl} from "../../CommonComponent";


const Brief = List.Item.Brief;


const BbsSearchCss = StyleSheet.create({
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

function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

class BbsSearchPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: "搜索",
        headerStyle:{
            height:55,
        }
    });
    constructor(props){
        super(props);
        this.state = {
            Data:[],
            SearchFocus :false,
            SearchContent : '',
            Refreshing:false,
            SearchHistory :[]
        };
    }

    _navigateToUser =(ToUserId) =>{
        const { userId } = this.props;
        const { navigate } = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _renderSearchedItem = (item) =>{
        const { navigate } = this.props.navigation;
        return (
            <TouchableHighlight onPress={()=>{navigate('PostDetail',{topicId:item.item.key})}}>
                <Card full>
                    <Card.Header
                        title={<View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                            <View style={{flex:1}}>
                                <TouchableOpacity
                                    onPress={()=>this._navigateToUser(item.item.UserId)}
                                >
                                    <Text style={{color:'black'}}>{item.item.UserNickName}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:10}}>{item.item.LastPostTime}</Text>
                            </View>
                        </View>}
                        thumb={
                            <TouchableOpacity
                                onPress={()=>this._navigateToUser(item.item.UserId)}
                            >
                                <Image source={{uri:makeCommonImageUrl(item.item.UserImageUrl)}} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>
                            </TouchableOpacity>
                        }
                    />

                    <Card.Body >
                        <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:15}}>
                            {item.item.Content}
                        </Text>
                    </Card.Body>

                </Card>
            </TouchableHighlight>
        );
    };

    _SearchedSeparator = ()  => {
        return (
            <View style={BbsSearchCss.ItemSeparator}><Text> </Text></View>
        );
    };

    componentDidMount(){
        storage.load({
            key:'TopicSearchHistory'
        }).then(ret => {
            this.setState({SearchHistory : ret})
        }).catch(err=>{
            switch (err.name) {
                case 'NotFoundError':
                    storage.save({
                        key: 'TopicSearchHistory',
                        data:  [],
                        expires: null
                    });
                    break;
            }
        });
    }

    _dataWrapper = (initData) =>{
        return {
            key : initData['topicId'].toString(),
            Title :initData['title'],
            Content : initData['content'],
            LastPostTime : initData['lastTime'],
            UserImageUrl : initData['iconUrl'],
            UserId : initData['userId'],
            UserNickName : initData['username']
        };
    };

    requestSearchTopic = (Data,sessionId,Content,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/bbs/topics/search', {
            params:{
                session_id:sessionId,
                content :Content ,
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
                Toast.fail('网络好像有问题~');
            });

    };

    _updateSearchContent = (value) => {
        this.setState({SearchContent:value});
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestSearchTopic([],sessionId,this.state.SearchContent,0,6);
    };

    _submitSearchTopic = (value) => {
        this.setState({SearchFocus:true});
        const {sessionId} = this.props;
        this.requestSearchTopic([],sessionId,value,0,6);
        let bakHistory = this.state.SearchHistory.slice();
        let newHistory = [];
        for(let i=0;i<bakHistory.length;i++){
            if(bakHistory[i]===value)continue;
            newHistory.push(bakHistory[i]);
        }
        newHistory = [value].concat(newHistory);
        this.setState({SearchHistory:newHistory});
        storage.save({
            key:'TopicSearchHistory',
            data: newHistory
        });
    };

    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestSearchTopic(this.state.Data.slice(),sessionId,this.state.SearchContent,this.state.Data.length,6);
    };

    _applySearchHistory = (value)=>{
        this.setState({SearchContent:value});
        this._submitSearchTopic(value);
    };

    _submitClearSearchHistory = ()=>{
        Modal.alert('清空历史','确定要清空搜索历史吗?', [
            {
                text:'取消',
                onPress:()=>{}
            },
            {
                text:'确定',
                onPress:()=>{
                    storage.remove({
                        key:'TopicSearchHistory'
                    });
                    this.setState({SearchHistory:[]});
                }
            },
        ]);
    };

    render(){
        const { navigate } = this.props;
        let HistoryPanel = null;
        if(this.state.SearchHistory.length>0){
            HistoryPanel = (
                <ScrollView style={{width:"100%"}}>
                    <WhiteSpace size="md"/>
                    <Card full>
                        <Card.Header title="历史搜索" />
                        <Card.Body>
                            <List >
                                {this.state.SearchHistory.map((sh)=>(
                                    <List.Item key={sh} onClick={()=>{this._applySearchHistory(sh)}}>{sh}</List.Item>
                                ))}
                            </List>
                        </Card.Body>
                        <Card.Footer
                            content={
                                <Button onClick={this._submitClearSearchHistory}>
                                    清除搜索记录
                                </Button>
                            }
                            style={{paddingTop:20,paddingBottom:10}}
                        />
                    </Card>
                </ScrollView>
            );
        }
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{borderBottomColor:'#DDDDDD',borderBottomWidth:1}}>
                    <SearchBar
                        placeholder="输入关键字搜索帖子"
                        maxLength={20}
                        showCancelButton
                        onFocus={()=>{}}
                        onCancel={()=>{this.setState({SearchFocus:false})}}
                        value={this.state.SearchContent}
                        onChange={this._updateSearchContent}
                        onSubmit={this._submitSearchTopic}
                    />
                </View>

                {
                    this.state.SearchFocus?
                        <FlatList
                            style={BbsSearchCss.MainView}
                            data={this.state.Data}
                            initialNumToRender={10}
                            renderItem = {this._renderSearchedItem}
                            ItemSeparatorComponent = {this._SearchedSeparator}
                            refreshing={this.state.Refreshing}
                            onRefresh={this._refresh}
                            onEndReached={this._loadMoreData}
                            onEndReachedThreshold={0.1}
                        />
                        :HistoryPanel
                }
            </View>
        );
    }

}

export default connect(mapStateToProps,null)(BbsSearchPanel);