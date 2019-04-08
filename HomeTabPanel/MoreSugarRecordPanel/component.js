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

const dreamBlood = {
    '0':{min:3.9,max:6.1},
    '1':{min:6.7,max:9.4},
    '2':{min:5.0,max:8.0},
    '3':{min:6.7,max:9.4},
    '4':{min:5.0,max:8.0},
    '5':{min:6.7,max:9.4},
    '6':{min:6.7,max:8.0},
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
            ddx:[],
            dda:[],
            ddi:[]
        };
    }


    componentDidMount(){
        const {sessionId} = this.props;
        this.requestGetSugarRecord(sessionId);
    }

    requestGetSugarRecord = (sessionId)=>{
        let nowDate = new Date();
        let bloodDate = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
        httpRequest.get('/home/blood-sugar/record', {
            params:{
                session_id : sessionId,
                record_date : bloodDate
            }
        })
            .then((response) => {
                let data = response.data;
                let newDdx = [];
                let newDdd = [];
                let newDda = [];
                let newDdi = [];
                if (data['code'] === 0) {
                    data = data.data;
                    for (let key in data.level){
                        if(data.level[key]!=='0'){
                            newDdx.push(period[key]);
                            newDdd.push(parseFloat(data.level[key]));
                            newDda.push(dreamBlood[key].max);
                            newDdi.push(dreamBlood[key].min);
                        }
                    }
                    this.setState({ddd: newDdd,ddx:newDdx,dda:newDda, ddi:newDdi});
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
                            <TodaySugarChart ddx={this.state.ddx} ddd={this.state.ddd} dda={this.state.dda} ddi={this.state.ddi}/>
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