

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight,RefreshControl  } from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,Badge,Grid,Toast,WingBlank} from 'antd-mobile';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GridImageURL,makeCommonImageUrl} from "../CommonComponent";
import httpRequest from '../httpRequest';
import {TodaySugarChart, RecentHealth} from './items';
import Dimensions from 'Dimensions';
const {width} = Dimensions.get('window');

const Brief = List.Item.Brief;



function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

const period = {
    '0':'早餐前',
    '1':'早餐后',
    '2':'午餐前',
    '3':'午餐后',
    '4':'晚餐前',
    '5':'晚餐后',
    '6':'睡前',
};

const dreamBlood = {
    '0':{min:3.9,max:6.1},
    '1':{min:6.7,max:9.4},
    '2':{min:5.0,max:8.0},
    '3':{min:6.7,max:9.4},
    '4':{min:5.0,max:8.0},
    '5':{min:6.7,max:9.4},
    '6':{min:6.7,max:8.0},
};

class HomeTabPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            ArticleData : [],
            TopicData : [],
            HealthData : [],
            Refreshing :false,
            CarouselData : [
                {key:'1'},
                {key:'2',ddx:[],ddd:[],dda:[],ddi:[]},
                {key:'3'}
            ]
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
                navigate('SugarGuide');
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
        httpRequest.post('/home/checkin', {
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


    requestHealthRecord = (sessionId,x,n)=>{
        let Data = [];
        httpRequest.get('/home/health/records', {
            params:{
                session_id:sessionId,
                begin_id:x,
                need_number:n
            }
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

    requestGetSugarRecord = (sessionId)=>{
        let nowDate = new Date();
        let bloodDate = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
        httpRequest.get('/home/blood-sugar/record', {
            params:{
                session_id : sessionId,
                record_date : bloodDate
            }
        })
            .then((response) => {
                let data = response.data;
                let newDdx = [];
                let newDdd = [];
                let newDda = [];
                let newDdi = [];
                if (data['code'] === 0) {
                    data = data.data;
                    for (let key in data.level){
                        if(data.level[key]!=='0'){
                            newDdx.push(period[key]);
                            newDdd.push(parseFloat(data.level[key]));
                            newDda.push(dreamBlood[key].max);
                            newDdi.push(dreamBlood[key].min);
                        }
                    }
                    let newData = this.state.CarouselData.slice();
                    newData[1] = {
                        key:'2',
                        ddx:newDdx,
                        ddd:newDdd,
                        dda:newDda,
                        ddi:newDdi
                    };
                    this.setState({CarouselData: newData});
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
        this.requestGetSugarRecord(sessionId);
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
        this.requestGetSugarRecord(sessionId);
        this.requestHealthRecord(sessionId,0,5);
    };


    _renderCarouselItem = ({item, index}) =>{
        const { navigate } = this.props.navigation;
        if(item.key==='1'){
            return (
                <TouchableOpacity
                    onPress={()=>{navigate('HealthWeekly')}}
                    style={{width:'100%',height:220,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    activeOpacity={0.85}
                    key='1'
                >
                    <Image source={{uri:makeCommonImageUrl('/static/appImg/weeks.jpg')}} style={{width:'100%',height:220}}/>
                </TouchableOpacity>
            );
        }else if(item.key==='2'){
            return (
                <View  key='2' style={{height:220,width:'100%'}}>
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
                    <TodaySugarChart ddx={item.ddx} ddd={item.ddd} dda={item.dda} ddi={item.ddi}/>
                </View>
            );
        }else{

            return (
                <View  key='3' style={{height:220,width:'100%'}}>
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
                        <RecentHealth HealthData={this.state.HealthData}/>
                    </View>
                </View>
            );
        }
    };

    render(){
        const { navigate } = this.props.navigation;
        const { isAttend } = this.props.loginUserInfo;
        const GridData = [
            {text:isAttend?"已签到" : "签到",icon:GridImageURL('attend')},
            {text:'糖导',icon:GridImageURL('guide')},
            {text:'家属关联',icon:GridImageURL('link')},
            {text:'血糖记录',icon:GridImageURL('sugar')},
            {text:'每日健康记录',icon:GridImageURL('health')},
        ];

        return(
            <View style={{width:'100%',height:'100%'}}>
                <View style={{height:55,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:"#108EE9"}}>
                    <Text style={{fontSize:18,color:'white'}}><Icon name="home" size={25}/>  糖家</Text>
                    <Badge dot>
                        <TouchableOpacity onPress={()=>{navigate("MessageList")}} style={{paddingRight:2}}>
                            <Icon name="envelope" size={23} color="white"/>
                        </TouchableOpacity>
                    </Badge>
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
                        data={this.state.CarouselData}
                        renderItem={this._renderCarouselItem}
                        sliderWidth={width}
                        itemWidth={width}
                        loop
                        autoplay
                        autoplayInterval={5000}
                    />
                    <Grid data={GridData}  onClick={this._gridOnClick} />
                    <WhiteSpace size="lg"/>
                    <Card full>
                        <Card.Header title="推荐糖友" />
                        <Card.Body style={{paddingTop:0,paddingBottom:0}}>

                        </Card.Body>
                    </Card>
                </ScrollView>
            </View>
        );
    }

}

export default connect(mapStateToProps,null)(HomeTabPanel);