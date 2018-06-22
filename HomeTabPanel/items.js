

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,TouchableOpacity,FlatList,TouchableHighlight  } from 'react-native';
import {Button, NavBar,Card,List,ListView,WhiteSpace,Badge,Carousel,Grid,Toast} from 'antd-mobile';
import {UserImage} from '../CommonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GridImageURL,makeCommonImageUrl} from "../CommonComponent";
import httpRequest from '../httpRequest';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
const {width} = Dimensions.get('window');
const Brief = List.Item.Brief;


function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch,ownProps) {
    return {

    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, stateProps, dispatchProps)
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

class TodaySugarChartPanel extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.props.ddx
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '血糖值',
                    type: 'line',
                    data: this.props.ddd,
                    roam: false
                },
            ],
            grid:{
                top:10,
            }
        };
        return (
            <Echarts option={option} height={210} width={width}/>
        );
    }
}

class LongSugarChartPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            ddx : [],
            avead : [],
            maxd : [],
            mind : []
        }
    }

    requestGetSugarRecord = (sessionId,x,n)=>{
        httpRequest.post('/getBloodSugar', {
            session_id : sessionId,
            x:x,
            n:n
        })
            .then((response) => {
                let data = response.data;
                let newAvead = [];
                let newMaxd = [];
                let newMind = [];
                let newDdx = [];
                if (data['code'] === 0) {
                    for(let i=data.data.length-1;i>=0;i--){
                        newAvead.push(parseFloat(data.data[i]['averageBlood']));
                        newMaxd.push(data.data[i]['maxBlood']);
                        newMind.push(data.data[i]['minBlood']);
                        newDdx.push(data.data[i]['bloodDate'].split('-')[2])
                    }
                    this.setState({
                        avead : newAvead,
                        maxd : newMaxd,
                        mind : newMind,
                        ddx : newDdx
                    })
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    componentDidMount(){
        const {sessionId} = this.props;

        this.requestGetSugarRecord(sessionId,0,this.props.DayLength);
    }

    render(){
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.state.ddx
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '平均值',
                    type: 'line',
                    data: this.state.avead,
                    roam: false
                },
                {
                    name: '最大值',
                    type: 'line',
                    data: this.state.maxd,
                    roam: false
                },
                {
                    name: '最小值',
                    type: 'line',
                    data: this.state.mind,
                    roam: false
                },
            ],
            grid:{
                top:10,
            }
        };


        return (
            <Echarts option={option} height={210} width={width}/>
        );
    }
}

export const TodaySugarChart = connect(mapStateToProps,null,mergeProps,{withRef:true})(TodaySugarChartPanel);
export const LongSugarChart = connect(mapStateToProps,null)(LongSugarChartPanel);