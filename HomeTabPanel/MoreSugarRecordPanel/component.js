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

        };
    }


    componentDidMount(){

    }

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        return (
            <ScrollView style={{height:'100%',width:'100%',backgroundColor:'white'}}>

                <Card full>
                    <Card.Header title='今日血糖记录'/>
                    <Card.Body style={{height:200}}>
                        <Carousel
                            dots={false}
                        >
                            <TodaySugarChart />
                        </Carousel>
                    </Card.Body>
                </Card>
                <Card full>
                    <Card.Header title='一周血糖记录'/>
                    <Card.Body style={{height:200}}>
                        <Carousel
                            dots={false}
                        >
                            <LongSugarChart DayLength={7}/>
                        </Carousel>
                    </Card.Body>
                </Card>
                <Card full>
                    <Card.Header title='两周血糖记录'/>
                    <Card.Body style={{height:200}}>
                        <Carousel
                            dots={false}
                        >
                            <LongSugarChart DayLength={14}/>
                        </Carousel>
                    </Card.Body>
                </Card>
                <Card full>
                    <Card.Header title='一月血糖记录'/>
                    <Card.Body style={{height:200}}>
                        <Carousel
                            dots={false}
                        >
                            <LongSugarChart DayLength={30}/>
                        </Carousel>
                    </Card.Body>
                </Card>
            </ScrollView>

        );

    }

}


export default connect(mapStateToProps,null)(MoreSugarRecordPanel);