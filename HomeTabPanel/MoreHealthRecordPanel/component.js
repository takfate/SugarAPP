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


class MoreHealthRecordPanel extends Component{

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "查看健康记录",
        headerStyle:{
            height:55,
        },
    });

    constructor(props){
        super(props);
        this.state = {
            Data  : [
                {
                    List : [
                        {text:'日期'},
                        {text:'糖尿素用量'},
                        {text:'运动时长'},
                        {text:'体重'},
                        {text:'血压'}
                    ],
                    key : '1'
                }
            ],
            Refreshing: false
        };
    }

    _renderGridItem = (el,index) => {
        return (
            <View style={{paddingTop:3}}>
                <Text style={{fontSize:12,color:'black',textAlign:'center'}}>{el.text}</Text>
            </View>
        )
    };

    _renderItem = (item) =>{
        return (
            <Grid
                data={item.item.List}
                columnNum={5}
                itemStyle={{ height: 25 }}
                key={md5(JSON.stringify(item.item))}
                renderItem={this._renderGridItem}
            />
        );
    };


    _dataWrapper = (initData) => {
        let Data = [];
        for(let i=0;i<initData.length;i++){
            Data.push({text:initData[i].healthDate});
            Data.push({text:initData[i].insulin});
            Data.push({text:initData[i].sportTime});
            Data.push({text:initData[i].weight});
            Data.push({text:initData[i].bloodPressure});
        }
        console.log(Data);
        return {
            List :Data,
            key : md5(JSON.stringify(Data))
        };
    };

    requestGetHealthRecordList = (Data,sessionId,x,n)=>{
        this.setState({Refreshing:true});
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
                    Data.push(this._dataWrapper(data.data));
                    this.setState({
                        Refreshing:false,
                        Data:Data
                    });
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                alert(error);
                Toast.fail('网络好像有问题~');
            });
    };

    _refresh = ()=>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        let Data = [
            {
                List : [
                    {text:'日期'},
                    {text:'糖尿素用量'},
                    {text:'运动时长'},
                    {text:'体重'},
                    {text:'血压'}
                ],
                key : '1'
            }

        ];
        this.requestGetHealthRecordList(Data,sessionId,0,10);
    };

    _getItemCount = ()=>{
        let cnt = 0;
        for(let i=0;i<this.state.Data.length;i++){
            cnt+=this.state.Data[i].List.length;
        }
        return parseInt(cnt/5)-1;
    };

    componentDidMount(){
        const {sessionId}  = this.props;
        this.requestGetHealthRecordList(this.state.Data.slice(),sessionId,0,10);
    }

    _loadMoreData = () =>{
        if(this.state.Refreshing)return ;
        const {sessionId}  = this.props;
        this.requestGetHealthRecordList(this.state.Data.slice(),sessionId,this._getItemCount(),10);
    };

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


export default connect(mapStateToProps,null)(MoreHealthRecordPanel);