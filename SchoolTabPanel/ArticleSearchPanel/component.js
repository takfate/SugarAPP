

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace} from 'antd-mobile';
import * as Actions from "../MainF/actions";


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
        width:80,
        height:80
    }

});



function mapStateToProps(state,ownProps) {
    // alert( JSON.stringify(state.SchoolTabPanel));
    // alert( JSON.stringify(ownProps));
    return {
        ArticleSimpleData : state.SchoolTabPanel.ArticleSimpleData,
        Refreshing : state.SchoolTabPanel.Refreshing,
        navigate : ownProps.navigation
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


class SchoolTabPanel extends Component{

    constructor(props){
        super(props);
    }

    _renderItem = (item) =>{
        return (
            <Card full>
                <Card.Header
                    title={item.item.Title}
                    thumb={<Image source={require('./head.jpg')} style={SchoolCss.ItemImage}/>}
                />
                <Card.Footer content = "2018-02-02" extra="18:00"/>
            </Card>
        );
    };

    _separator = ()  => {
        return (
          <View style={SchoolCss.ItemSeparator}><Text> </Text></View>
        );
    };

    render(){
        const { navigate } = this.props;
        const {ArticleSimpleData , Refreshing} = this.props;
        return(

            <View style={{height:"100%"}}>
                <View style={{height:55,flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingLeft:12,paddingRight:12,backgroundColor:"#108EE9"}}>
                    <Text style={{fontSize:18,color:'white'}}>糖学院</Text>
                    <Text style={{fontSize:18,color:'white'}} >搜索</Text>
                </View>
                <FlatList
                    style={SchoolCss.MainView}
                    data={ArticleSimpleData}
                    initialNumToRender={3}
                    renderItem = {this._renderItem}
                    ItemSeparatorComponent = {this._separator}
                >

                </FlatList>
            </View>
        );
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(SchoolTabPanel);