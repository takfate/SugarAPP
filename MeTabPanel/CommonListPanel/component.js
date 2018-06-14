

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace} from 'antd-mobile';

const Brief = List.Item.Brief;


const CommonListCss = StyleSheet.create({
    MainView :{
        backgroundColor:'#F5F5F5',
        paddingBottom:20
    }
});

class CommonListPanel extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {RealData,InitNum} = this.props;
        const {RenderItem,Separator} = this.props;
        const {refreshing ,onRefresh,onEndReached,onEndReachedThreshold} = this.props;
        return(
            <FlatList
                style={CommonListCss.MainView}
                data={RealData}
                initialNumToRender={InitNum}
                renderItem = {RenderItem}
                ItemSeparatorComponent = {Separator}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
            >
            </FlatList>
        );
    }

}

export default connect()(CommonListPanel);