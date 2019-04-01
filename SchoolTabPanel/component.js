

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList,TouchableHighlight,TouchableOpacity} from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,Toast} from 'antd-mobile';
import * as Actions from "../MainF/actions";
import Icon from 'react-native-vector-icons/FontAwesome';
import {makeCommonImageUrl} from '../CommonComponent';

import httpRequest from '../httpRequest';


const Brief = List.Item.Brief;


const SchoolCss = StyleSheet.create({
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
        width:48,
        height:48
    }

});



function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


class SchoolTabPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            Refreshing:false,
            Data : []
        };
    }

    _renderItem = (item) =>{
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
                        thumb={<Image source={{uri:makeCommonImageUrl(item.item.ImageUrl)}} style={SchoolCss.ItemImage}/>}
                    />
                    <Card.Footer content = {item.item.PostTime} extra={item.item.ViewCount}/>
                </Card>
            </TouchableHighlight>
        );
    };

    _separator = ()  => {
        return (
            <View style={SchoolCss.ItemSeparator}><Text> </Text></View>
        );
    };

    _dataWrapper = (initData) =>{
        return {
            key : initData['articleId'].toString(),
            Title :initData['title'],
            Content : initData['content'],
            PostTime : initData['articleTime'],
            ImageUrl : initData['imgUrl'],
            ViewCount : initData['views']
        };
    };

    requestGetArticleList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
        httpRequest.get('/school/articles', {
            params:{
                session_id:sessionId,
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
        this.requestGetArticleList([],sessionId,0,10);
    };

    componentDidMount(){
        const {sessionId}  = this.props;
        this.requestGetArticleList(this.state.Data.slice(),sessionId,0,10);
    }


    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestGetArticleList(this.state.Data.slice(),sessionId,this.state.Data.length,10);
    };

    render(){
        const { navigate } = this.props.navigation;
        const {ArticleSimpleData , Refreshing} = this.props;
        return(

            <View style={{height:"100%"}}>
                <View style={{height:55,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:"#108EE9"}}>
                    <Text style={{fontSize:18,color:'white'}}><Icon name="graduation-cap" size={25}/>  糖学堂</Text>
                    <TouchableOpacity onPress={()=>{navigate('ArticleSearch')}}>
                        <Icon name="search" size={23} color="white" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={SchoolCss.MainView}
                    data={this.state.Data}
                    initialNumToRender={3}
                    renderItem = {this._renderItem}
                    ItemSeparatorComponent = {this._separator}
                    refreshing={this.state.Refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(SchoolTabPanel);