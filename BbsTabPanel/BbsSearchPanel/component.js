

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Image,StyleSheet,FlatList} from 'react-native';
import {Button, NavBar, Icon,Card,List,ListView,WhiteSpace,SearchBar,Tag,Carousel,WingBlank } from 'antd-mobile';


const Brief = List.Item.Brief;


const BbsSearchCss = StyleSheet.create({
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



class BbsSearchPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: "搜索",
        headerStyle:{
            height:55,
        }
    });
    constructor(props){
        super(props);
        this.state = {
            SearchedData:[
                {
                    key:"1",
                    Title:"糖友，生活规律，别睡懒觉",
                    Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
                    Image:""
                }, {
                    key:"2",
                    Title:"222222222",
                    Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
                    Image:""
                },{
                    key:"3",
                    Title:"333333333",
                    Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
                    Image:""
                },{
                    key:"4",
                    Title:"444444444",
                    Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
                    Image:""
                },{
                    key:"5",
                    Title:"555555555",
                    Content:"随着糖尿病教育的开展，对糖尿病的正确认识可减轻糖尿病患者的心理压力。我们要时不时的对糖友们进行心理分析。",
                    Image:""
                }
            ],
        };
    }

    _renderSearchedItem = (item) =>{
        return (
            <Card full>
                <Card.Header
                    title={item.item.Title}
                    thumb={<Image source={require('./head.jpg')} style={BbsSearchCss.ItemImage}/>}
                />
                <Card.Footer content = "2018-02-02" extra="18:00"/>
            </Card>
        );
    };

    _SearchedSeparator = ()  => {
        return (
            <View style={BbsSearchCss.ItemSeparator}><Text> </Text></View>
        );
    };


    render(){
        const { navigate } = this.props;
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{borderBottomColor:'#DDDDDD',borderBottomWidth:1}}>
                    <SearchBar
                        placeholder="输入关键字搜索文章"
                        maxLength={8}
                    />
                </View>

                {
                    this.state.Searched?
                        <FlatList
                            style={BbsSearchCss.MainView}
                            data={this.state.SearchedData}
                            initialNumToRender={3}
                            renderItem = {this._renderSearchedItem}
                            ItemSeparatorComponent = {this._SearchedSeparator}
                        >

                        </FlatList>
                        :

                        <ScrollView style={{width:"100%"}}>
                            <WhiteSpace size="md"/>
                            <Card full>
                                <Card.Header title="历史搜索" />
                                <Card.Body>
                                    <List >
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                        <List.Item  onClick={()=>{}}>Title</List.Item>
                                    </List>
                                </Card.Body>
                                <Card.Footer content={<Button>清除搜索记录</Button>} style={{paddingTop:20,paddingBottom:10}} />
                            </Card>
                        </ScrollView>


                }

            </View>
        );
    }

}

export default BbsSearchPanel;