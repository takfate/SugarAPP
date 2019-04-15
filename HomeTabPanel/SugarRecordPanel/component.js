import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View,TouchableWithoutFeedback} from 'react-native';
import {Button, Card, List, Picker, Slider, WhiteSpace,Toast,Flex,WingBlank} from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import httpRequest from '../../httpRequest';
import {RadiusButton} from '../../CommonComponent';

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
}

const TimeSelctionData = [
    {
        label: '早餐前',
        value: 'beforeBF',
    },
    {
        label: '早餐后',
        value: 'afterBF',
    },
    {
        label: '午餐前',
        value: 'beforeLC',
    },
    {
        label: '午餐后',
        value: 'afterLC',
    },
    {
        label: '晚餐前',
        value: 'beforeDN',
    },
    {
        label: '晚餐后',
        value: 'afterDN',
    },
    {
        label: '睡前',
        value: 'beforeSP',
    },
];

const checkOutTime = ()=>{
    let nowDate = new Date();
    let Hour = nowDate.getHours();
    if(Hour<7){
        return 'beforeBF';
    }else if(Hour>=7&&Hour<9){
        return 'afterBF';
    }else if(Hour>=9&&Hour<12){
        return 'beforeLC';
    }else if(Hour>=12&&Hour<15){
        return 'afterLC';
    }else if(Hour>=15&&Hour<18){
        return 'beforeDN';
    }else if(Hour>=18&&Hour<20){
        return 'afterDN';
    }else if(Hour>=20){
        return 'beforeSP';
    }
};

class SugarRecordPanel extends Component{
    static navigationOptions = ({ navigation }) =>({
        headerTitle: "添加血糖记录 ",
        headerStyle:{
            height:55,
        }
    });

    constructor(props){
        super(props);
        this.state = {
            sugarValue : 100,
            sugarPeriod : [checkOutTime()]
        }
    }

    requestSaveSugarRecord = (sessionId,Period,bLevel,bTime,bloodDate)=>{
        const {goBack} = this.props.navigation;
        Toast.loading('正在添加');
        httpRequest.post('/home/blood-sugar/record', {
            session_id:sessionId,
            period:Period,
            blood_sugar_value:bLevel,
            record_time:bTime,
            record_date:bloodDate
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    Toast.success('添加成功',1);
                    goBack();
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });
    };

    _updatePeriod = (value)=>{
        this.setState({sugarPeriod:value});
    };

    _submitSaveSugarRecord = ()=>{
        const {sessionId} = this.props;
        let sugarValue = (this.state.sugarValue/10).toFixed(1).toString();
        let nowData = new Date();
        let HourMinute = nowData.getHours()+':'+nowData.getMinutes();
        let datetime = nowData.getFullYear()+'-'+(nowData.getMonth()+1)+'-'+nowData.getDate();
        this.requestSaveSugarRecord(sessionId,this.state.sugarPeriod[0],sugarValue,HourMinute,datetime);
    };

    _renderAudioToast = ()=>{
        return (
            <Icon name="microphone" size={80} color="white"/>
        )
    };

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        return (
            <ScrollView style={{height:'100%',width:'100%',backgroundColor:'white'}}>
                <Card full>
                    <Card.Body>
                        <View style={{width:'100%',height:100,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:25,color:'black'}}>
                                请输入血糖值
                            </Text>
                        </View>
                        <Slider
                            defaultValue={120}
                            min={10}
                            max={333}
                            step={1}
                            dots
                            value={this.state.sugarValue}
                            onChange={(value)=>{this.setState({sugarValue:value})}}
                        />
                        <View style={{width:'100%',height:100,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:25,color:'black'}}>
                                {(this.state.sugarValue/10).toFixed(1)} mmol/L
                            </Text>
                        </View>
                    </Card.Body>
                </Card>
                <Picker extra={this.state.sugarPeriod[0]}
                        data={TimeSelctionData}
                        cols={1}
                        title="选择时间段"
                        value={this.state.sugarPeriod}
                        onChange={this._updatePeriod}
                >
                    <List.Item arrow="horizontal">时间段</List.Item>
                </Picker>
                <WhiteSpace size='lg'/>
                <WingBlank>
                    <Flex justify="center" align="center">
                        <Flex.Item>
                            <Flex justify="center" align="center">
                                <RadiusButton
                                    text="语音输入"
                                    onPressIn={()=>{Toast.info(this._renderAudioToast(),0)}}
                                    onPressOut={()=>{Toast.hide()}}
                                />
                            </Flex>
                        </Flex.Item>
                        <Flex.Item>
                            <Flex justify="center" align="center">
                                <Button
                                    type='primary'
                                    style={{borderRadius:70,width:140,height:140}}
                                    onClick={this._submitSaveSugarRecord}
                                >
                                    保存记录
                                </Button>
                            </Flex>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </ScrollView>

        );

    }

}


export default connect(mapStateToProps,null)(SugarRecordPanel);