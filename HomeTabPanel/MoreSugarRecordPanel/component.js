import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,TextInput,TouchableOpacity,ScrollView } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,List,Card,Toast,Carousel } from 'antd-mobile';

import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from "../../httpRequest";
import {TodaySugarChart ,LongSugarChart} from '../items';

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
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


class MoreSugarRecordPanel extends Component{

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "查看血糖记录",
        headerStyle:{
            height:55,
        },
    });

    constructor(props){
        super(props);
        this.state = {
            ddd:[],
            ddx:[]
        };
    }


    componentDidMount(){
        const {sessionId} = this.props;
        this.requestGetSugarRecord(sessionId);
    }

    requestGetSugarRecord = (sessionId)=>{
        let nowDate = new Date();
        let bloodDate = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
        httpRequest.post('/getUserOneDayBlood', {
            session_id : sessionId,
            bloodDate : bloodDate
        })
            .then((response) => {
                let data = response.data;
                let newDdx = [];
                let newDdd = [];
                if (data['code'] === 0) {
                    for (let key in data.level){
                        if(data.level[key]!=='0'){
                            newDdx.push(period[key]);
                            newDdd.push(parseFloat(data.level[key]));
                        }
                    }
                    this.setState({ddd: newDdd,ddx:newDdx});
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                alert(error);
                Toast.fail('网络好像有问题~');
            });
    };

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        return (
            <ScrollView style={{height:'100%',width:'100%',backgroundColor:'white'}}>

                <Card full>
                    <Card.Header title='今日血糖记录'/>
                    <Card.Body style={{height:200}}>
                        <Carousel dots={false}>
                            <TodaySugarChart ddx={this.state.ddx} ddd={this.state.ddd}/>
                        </Carousel>
                    </Card.Body>
                </Card>
                <Card full>
                    <Card.Header title='一周血糖记录'/>
                    <Card.Body style={{height:200}}>
                        <Carousel dots={false}>
                            <LongSugarChart DayLength={7}/>
                        </Carousel>
                    </Card.Body>
                </Card>
                <Card full>
                    <Card.Header title='两周血糖记录'/>
                    <Card.Body style={{height:200}}>
                        <Carousel dots={false}>
                            <LongSugarChart DayLength={14}/>
                        </Carousel>
                    </Card.Body>
                </Card>
                <Card full>
                    <Card.Header title='一月血糖记录'/>
                    <Card.Body style={{height:200}}>
                        <Carousel dots={false}>
                            <LongSugarChart DayLength={30}/>
                        </Carousel>
                    </Card.Body>
                </Card>
            </ScrollView>

        );

    }

}


export default connect(mapStateToProps,null)(MoreSugarRecordPanel);