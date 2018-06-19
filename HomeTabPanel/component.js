

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight  } from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,Badge,Carousel,Grid,Toast} from 'antd-mobile';
import {UserImage} from '../CommonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GridImageURL,makeCommonImageUrl} from "../CommonComponent";
import httpRequest from '../httpRequest';
import {SugarChart} from './items';


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



class HomeTabPanel extends Component{

    constructor(props){
        super(props);
        // this.state = {
        //
        // };
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

    _submitAttend = ()=>{
        const {sessionId} = this.props;
        this.requestAttend(sessionId);
    };

    render(){
        const { navigate } = this.props.navigation;
        const { isAttend } = this.props.loginUserInfo;
        const GridData = [
            {text:isAttend?"已签到":"签到",icon:GridImageURL('attend')},
            {text:'糖导',icon:GridImageURL('guide')},
            {text:'血糖记录',icon:GridImageURL('sugar')},
            {text:'每日健康记录',icon:GridImageURL('health')},
            {text:'家属关联',icon:GridImageURL('link')},
            {text:'智能提醒',icon:GridImageURL('message')}
        ];
        return(
            <ScrollView style={{width:'100%',height:'100%'}}>
                <View style={{height:55,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:"#108EE9"}}>
                    <Text style={{fontSize:18,color:'white'}}><Icon name="home" size={25}/>  糖家</Text>
                </View>

                <Carousel
                    infinite
                    style={{height:220}}
                    autoplay
                    autoplayInterval={5000}
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
                            <Button type='ghost' size='small'>查看更多</Button>
                        </View>
                        <SugarChart />
                    </View>
                    <View>
                        <Text>记录</Text>
                    </View>
                </Carousel>
                <Grid data={GridData}  onClick={this._gridOnClick} />
                <WhiteSpace size="lg"/>
                <Card full>
                    <Card.Header title="推荐文章" />
                    <Card.Body>

                    </Card.Body>
                </Card>
                <Card full>
                    <Card.Header title="推荐话题" />
                    <Card.Body>

                    </Card.Body>
                </Card>
            </ScrollView>
        );
    }

}

export default connect(mapStateToProps,null)(HomeTabPanel);