

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

function mapDispatchToProps(dispatch) {
    return {

    }
}


class SugarChartPanel extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
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
                    data: ['早餐前', '早餐后', '午餐前', '午餐后', '晚餐前', '晚餐后', '睡前']
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
                    data: [10.5, 16.8, 9.8, 16.5, 11.5, 16.8, 12.2],
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

export const SugarChart = connect(mapStateToProps,null)(SugarChartPanel);