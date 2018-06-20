

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList,TouchableHighlight} from 'react-native';
import {Button, NavBar, Modal,Card,List,ListView,WhiteSpace,SearchBar,Tag,Carousel,Toast } from 'antd-mobile';
import httpRequest from "../../httpRequest";
import {makeCommonImageUrl} from "../../CommonComponent";


const Brief = List.Item.Brief;


const ArticleSearchCss = StyleSheet.create({
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


class ArticleSearchPanel extends Component{
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

    componentDidMount(){
        storage.load({
            key:'ArticleSearchHistory'
        }).then(ret => {
            this.setState({SearchHistory : ret})
        }).catch(err=>{
            switch (err.name) {
                case 'NotFoundError':
                    storage.save({
                        key: 'ArticleSearchHistory',
                        data:  [],
                        expires: null
                    });
                    break;
            }
        });
    }

    _renderSearchedItem = (item) =>{
        const {navigate} = this.props.navigation;
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
                        thumb={<Image source={{uri:makeCommonImageUrl(item.item.ImageUrl)}} style={ArticleSearchCss.ItemImage}/>}
                    />
                    <Card.Footer content = {item.item.PostTime} extra={item.item.ViewCount}/>
                </Card>
            </TouchableHighlight>
        );
    };

    _SearchedSeparator = ()  => {
        return (
            <View style={ArticleSearchCss.ItemSeparator}><Text> </Text></View>
        );
    };

    _dataWrapper = (initData) =>{
        return {
            key : initData['articleId'].toString(),
            Title :initData['title'],
            Content : initData['content'],
            PostTime : initData['articleTime'],
            ImageUrl : initData['imgUrl'],
            ViewCount : initData['views'].toString()
        };
    };

    requestSearchArticle = (Data,sessionId,Content,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.post('/searchArticle', {
            session_id:sessionId,
            labelName : JSON.stringify([]),
            keyword :Content ,
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

    _updateSearchContent = (value) => {
        this.setState({SearchContent:value});
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestSearchArticle([],sessionId,this.state.SearchContent,0,6);
    };

    _submitSearchArticle = (value) => {
        this.setState({SearchFocus:true});
        const {sessionId} = this.props;
        this.requestSearchArticle([],sessionId,value,0,6);
        let bakHistory = this.state.SearchHistory.slice();
        let newHistory = [];
        for(let i=0;i<bakHistory.length;i++){
            if(bakHistory[i]===value)continue;
            newHistory.push(bakHistory[i]);
        }
        newHistory = [value].concat(newHistory);
        this.setState({SearchHistory:newHistory});
        storage.save({
            key:'ArticleSearchHistory',
            data: newHistory
        });
    };

    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestSearchArticle(this.state.Data.slice(),sessionId,this.state.SearchContent,this.state.Data.length,6);
    };

    _applySearchHistory = (value)=>{
        this.setState({SearchContent:value});
        this._submitSearchArticle(value);
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
                        key:'ArticleSearchHistory'
                    });
                    this.setState({SearchHistory:[]});
                }
            },
        ]);
    };

    render(){
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
                        placeholder="输入关键字搜索文章"
                        maxLength={20}
                        showCancelButton
                        onFocus={()=>{}}
                        onCancel={()=>{this.setState({SearchFocus:false})}}
                        value={this.state.SearchContent}
                        onChange={this._updateSearchContent}
                        onSubmit={this._submitSearchArticle}
                    />
                </View>

                {
                    this.state.SearchFocus?
                        <FlatList
                            style={ArticleSearchCss.MainView}
                            data={this.state.Data}
                            initialNumToRender={3}
                            renderItem = {this._renderSearchedItem}
                            ItemSeparatorComponent = {this._SearchedSeparator}
                            refreshing={this.state.Refreshing}
                            onRefresh={this._refresh}
                            onEndReached={this._loadMoreData}
                            onEndReachedThreshold={0.1}
                        >

                        </FlatList>
                        :HistoryPanel
                }

            </View>
        );
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleSearchPanel);