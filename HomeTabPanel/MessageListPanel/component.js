import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,TouchableHighlight,FlatList} from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,List,Card,Toast,Carousel,Grid } from 'antd-mobile';

import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";
import {TodaySugarChart ,LongSugarChart} from '../items';
import {makeCommonImageUrl} from "../../CommonComponent";
import md5 from 'js-md5';

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {

}

const MoreHealthRecordCss = StyleSheet.create({
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


class MyMessageListPanel extends Component{

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "消息",
        headerStyle:{
            height:55,
        },
    });

    constructor(props){
        super(props);
        this.state = {
            Refreshing: false
        };
    }

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        return (
            <FlatList
                style={MoreHealthRecordCss.MainView}
                data={this.state.Data}
                initialNumToRender={3}
                renderItem = {this._renderItem}
                refreshing={this.state.Refreshing}
                onRefresh={this._refresh}
                onEndReached={this._loadMoreData}
                onEndReachedThreshold={0.1}
            />

        );
    }
}


export default connect(mapStateToProps,null)(MyMessageListPanel);