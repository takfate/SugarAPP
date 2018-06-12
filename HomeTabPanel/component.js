

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight  } from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,Badge,Carousel,Grid} from 'antd-mobile';
import {UserImage} from '../CommonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GridImageURL} from "../CommonComponent";
import {makeCommonImageUrl} from "../CommonComponent";

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


const GridData = [
    {text:'签到',icon:GridImageURL('attend')},
    {text:'糖导',icon:GridImageURL('guide')},
    {text:'血糖记录',icon:GridImageURL('sugar')},
    {text:'每日健康记录',icon:GridImageURL('health')},
    {text:'家属关联',icon:GridImageURL('link')},
    {text:'智能提醒',icon:GridImageURL('message')}
];

class HomeTabPanel extends Component{

    constructor(props){
        super(props);
        // this.state = {
        //
        // };
    }

    _gridOnClick = (item) =>{
        const { navigate } = this.props.navigation;
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
            default :
                return ;
        }
    };


    render(){
        const { navigate } = this.props.navigation;
        return(
            <ScrollView style={{width:'100%',height:'100%'}}>
                <View style={{height:55,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:"#108EE9"}}>
                    <Text style={{fontSize:18,color:'white'}}><Icon name="home" size={25}/>  糖家</Text>
                </View>

                <Carousel
                    autoplay={true}
                    infinite
                    style={{height:200}}
                >
                    <View style={{width:'100%',height:200,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Image source={{uri:makeCommonImageUrl('/static/appImg/weeks.jpg')}} style={{width:'100%',height:200}}/>
                    </View>
                    <View>
                        <Text>血糖变化</Text>
                    </View>
                    <View>
                        <Text>记录</Text>
                    </View>
                </Carousel>
                <WhiteSpace size="lg"/>
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

export default connect()(HomeTabPanel);