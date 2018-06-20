

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight,RefreshControl  } from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,Badge,Carousel,Grid,Toast} from 'antd-mobile';
import {UserImage} from '../CommonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GridImageURL,makeCommonImageUrl} from "../CommonComponent";
import httpRequest from '../httpRequest';
import {TodaySugarChart} from './items';


const Brief = List.Item.Brief;



const HomeCss = StyleSheet.create({
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



class HomeTabPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            ArticleData : [],
            TopicData : [],
            HealthData : [],
            Refreshing :false
        };
    }

    _gridOnClick = (item) =>{
        const { navigate } = this.props.navigation;
        const { isAttend } = this.props;
        switch(item.text){
            case '家属关联':
                navigate('KinLinkList');
                break;
            case '血糖记录':
                navigate('SugarRecord');
                break;
            case '每日健康记录':
                navigate('HealthRecord');
                break;
            case '糖导':
                navigate('GuideHome');
                break;
            case '签到':
                if(!isAttend){
                    this._submitAttend();
                }
                break;
            default :
                return ;
        }
    };

    requestAttend = (sessionId)=>{
        Toast.loading('正在签到');
        httpRequest.post('/alterUserCheckTime', {
            session_id:sessionId,
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    Toast.success('签到成功');
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _articleDataWrapper = (initData)=>{
        return {
            key : initData['articleId'].toString(),
            Title :initData['title'],
            Content : initData['content'],
            PostTime : initData['articleTime'],
            ImageUrl : initData['imgUrl'],
            ViewCount : initData['views']
        };
    };

    _topicDataWrapper = (initData)=>{
        return {
            key : initData['topicId'].toString(),
            UserId : initData['userId'],
            UserNickName : initData['username'],
            UserImageUrl : initData['iconUrl'],
            LastPostTime : initData['lastTime'],
            Content : initData['content'],
            Images : [initData['picture1'],initData['picture2'],initData['picture3']],
            CommentCount : initData['replyNum']+initData['comNum']
        };
    };

    requestGetRecommendArticle = (sessionId)=>{
        let Data = [];
        httpRequest.post('/getRecommendArticle', {
            session_id:sessionId,
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._articleDataWrapper(data.data[i]));
                    }
                    this.setState({
                        ArticleData:Data
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    requestGetRecommendTopic = (sessionId)=>{
        let Data = [];
        httpRequest.post('/getRecommendTopic', {
            session_id:sessionId,
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    for(let i=0;i<data.data.length;i++){
                        Data.push(this._topicDataWrapper(data.data[i]));
                    }
                    this.setState({
                        TopicData : Data
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    requestHealthRecord = (sessionId,x,n)=>{
        let Data = [];
        httpRequest.post('/getHealthRecords', {
            session_id:sessionId,
            x:x,
            n:n
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    this.setState({HealthData:data.data})
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _submitAttend = ()=>{
        const {sessionId} = this.props;
        this.requestAttend(sessionId);
    };


    componentDidMount(){
        const {sessionId} = this.props;
        this.requestGetRecommendArticle(sessionId);
        this.requestGetRecommendTopic(sessionId);
        this.requestHealthRecord(sessionId,0,5);
    }

    _navigateToUser = (ToUserId) =>{
        const {userId} = this.props;
        const { navigate } = this.props.navigation;
        navigate("UserInfo",{
            isLoginUser :userId===ToUserId,
            UserId : ToUserId
        });
    };

    _refresh = ()=>{
        const {sessionId} = this.props;
        this.requestGetRecommendArticle(sessionId);
        this.requestGetRecommendTopic(sessionId);
        this.todaySugarRecord.requestGetSugarRecord(sessionId);
    };

    refTodaySugarRecord = (instance)=>{
        this.todaySugarRecord = instance.getWrappedInstance();
    };

    _healthGridDataWrapper = (initData)=>{
        let Data = [
            {text:''},
            {text:'糖尿素用量'},
            {text:'运动时长'},
            {text:'体重'},
            {text:'血压'}
        ];
        for(let i=0;i<initData.length;i++){
            Data.push({text:initData[i].healthDate});
            Data.push({text:initData[i].insulin});
            Data.push({text:initData[i].sportTime});
            Data.push({text:initData[i].weight});
            Data.push({text:initData[i].bloodPressure});
        }
        return Data;
    };

    _renderGridItem = (el,index) => {
        return (
            <View style={{paddingTop:3}}>
                <Text style={{fontSize:12,color:'black',textAlign:'center'}}>{el.text}</Text>
            </View>
        )
    };

    render(){
        const { navigate } = this.props.navigation;
        const { isAttend } = this.props.loginUserInfo;
        const GridData = [
            {text:isAttend?"已签到" : "签到",icon:GridImageURL('attend')},
            {text:'糖导',icon:GridImageURL('guide')},
            {text:'血糖记录',icon:GridImageURL('sugar')},
            {text:'每日健康记录',icon:GridImageURL('health')},
            {text:'家属关联',icon:GridImageURL('link')},
            {text:'智能提醒',icon:GridImageURL('message')}
        ];
        const HealthGridData = this._healthGridDataWrapper(this.state.HealthData);
        return(
            <View style={{width:'100%',height:'100%'}}>
                <View style={{height:55,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:"#108EE9"}}>
                    <Text style={{fontSize:18,color:'white'}}><Icon name="home" size={25}/>  糖家</Text>
                </View>
                <ScrollView
                    style={{width:'100%',height:'100%'}}
                    refreshControl={
                        <RefreshControl
                            onRefresh={this._refresh}
                            refreshing={this.state.Refreshing}
                        />
                    }
                >
                    <Carousel
                        infinite
                        style={{height:220}}
                        autoplay
                        autoplayInterval={10000}
                        selectedIndex={1}
                        swipeSpeed={6}
                    >
                        <View style={{width:'100%',height:220,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Image source={{uri:makeCommonImageUrl('/static/appImg/weeks.jpg')}} style={{width:'100%',height:250}}/>
                        </View>
                        <View>
                            <View style={{
                                height:35,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center',
                                paddingLeft:20,
                                paddingRight:40}}
                            >
                                <Text style={{fontSize:17,color:'black',textAlign:'center'}}>今日血糖变化</Text>
                                <Button type='ghost' size='small' onClick={()=>{navigate('MoreSugarRecord')}}>查看更多</Button>
                            </View>
                            <TodaySugarChart ref={this.refTodaySugarRecord}/>
                        </View>
                        <View>
                            <View style={{
                                height:35,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center',
                                paddingLeft:20,
                                paddingRight:40}}
                            >
                                <Text style={{fontSize:17,color:'black',textAlign:'center'}}>五天内健康记录</Text>
                                <Button type='ghost' size='small' onClick={()=>{navigate('MoreHealthRecord')}}>查看更多</Button>
                            </View>
                            <View style={{paddingLeft:10,paddingRight:10}}>
                                <Grid
                                    data={HealthGridData}
                                    columnNum={5}
                                    itemStyle={{ height: 25 }}
                                    renderItem={this._renderGridItem}
                                />
                            </View>
                        </View>
                    </Carousel>
                    <Grid data={GridData}  onClick={this._gridOnClick} />
                    <WhiteSpace size="lg"/>
                    <Card full>
                        <Card.Header title="推荐文章" />
                        <Card.Body style={{paddingTop:0,paddingBottom:0}}>
                            {this.state.ArticleData.map(item=>(
                                <TouchableHighlight
                                    onPress={()=>{navigate('ArticleDetail',{
                                        ArticleId: item.key,
                                        Title :item.Title
                                    })}}
                                    key={item.key}
                                >
                                    <Card full style={{borderBottomWidth:0}}>
                                        <Card.Header
                                            title={item.Title}
                                            thumb={<Image source={{uri:makeCommonImageUrl(item.ImageUrl)}} style={HomeCss.ItemImage}/>}
                                        />
                                        <Card.Footer content = {item.PostTime} extra={item.ViewCount}/>
                                    </Card>
                                </TouchableHighlight>
                            ))}
                        </Card.Body>
                    </Card>
                    <WhiteSpace size='md'/>
                    <Card full>
                        <Card.Header title="推荐话题" />
                        <Card.Body style={{paddingTop:0,paddingBottom:0}}>
                            {this.state.TopicData.map(item=>(
                                <TouchableHighlight onPress={()=>{navigate('PostDetail',{topicId:item.key})}} key={item.key}>
                                    <Card full style={{borderBottomWidth:0}}>
                                        <Card.Header
                                            title={<View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                                                <View style={{flex:1}}>
                                                    <TouchableOpacity
                                                        onPress={()=>this._navigateToUser(item.UserId)}
                                                    >
                                                        <Text style={{color:'black'}}>{item.UserNickName}</Text>
                                                    </TouchableOpacity>
                                                    <Text style={{fontSize:10}}>{item.LastPostTime}</Text>
                                                </View>
                                                <View style={{width:100,paddingLeft:15,flexDirection:'row',justifyContent:'flex-end'}}>
                                                    <Icon name="comment" size={15}/>
                                                    <Text style={{fontSize:12,marginLeft:3}}>{item.CommentCount}</Text>
                                                </View>
                                            </View>}
                                            thumb={
                                                <TouchableOpacity
                                                    onPress={()=>this._navigateToUser(item.UserId)}
                                                >
                                                    <Image source={{uri:makeCommonImageUrl(item.UserImageUrl)}} style={{width:25,height:25,borderRadius:12,marginRight:10}}/>
                                                </TouchableOpacity>
                                            }
                                        />

                                        <Card.Body >
                                            <Text style={{color:'black',marginLeft:15,marginRight:15,fontSize:15}}>
                                                {item.Content}
                                            </Text>
                                        </Card.Body>

                                    </Card>
                                </TouchableHighlight>
                            ))}
                        </Card.Body>
                    </Card>
                </ScrollView>
            </View>
        );
    }

}

export default connect(mapStateToProps,null)(HomeTabPanel);