import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView,View,Text,TextInput,TouchableOpacity } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,Slider,Card,Picker,List,Modal,Toast } from 'antd-mobile';
import httpRequest from "../../httpRequest";

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
}


const TimeSelctionData = [
    {
        label: '早餐前',
        value: 'breforeBF',
    },
    {
        label: '早餐后',
        value: 'afterBF',
    },
    {
        label: '午餐前',
        value: 'breforeLC',
    },
    {
        label: '午餐后',
        value: 'afterLC',
    },
    {
        label: '晚餐前',
        value: 'breforeDN',
    },
    {
        label: '晚餐后',
        value: 'afterDN',
    },
    {
        label: '睡前',
        value: 'breforeSP',
    },
];


const YDSData = function () {
    let res = [];
    let intPart = [];
    let realPart = [];
    for(let i=0;i<=99;i++){
        intPart.push({
            value:i.toString(),
            label:i.toString()
        });
    }
    for(let i=0;i<=9;i++){
        realPart.push({
            value:'.'+i.toString(),
            label:'.'+i.toString()
        });
    }

    res.push(intPart);
    res.push(realPart);
    return res;
}();

const PEData = function () {
    let res = [];
    let hourPart = [];
    let minutePart = [];
    for(let i=0;i<=11;i++){
        hourPart.push({
            value:i.toString(),
            label:i.toString()+'小时'
        });
    }
    for(let i=0;i<=59;i++){
        minutePart.push({
            value:i.toString(),
            label:i.toString()+'分钟'
        });
    }
    res.push(hourPart);
    res.push(minutePart);
    return res;
}();

const WeightData = function () {
    let res = [];
    let intPart = [];
    let realPart = [];
    for(let i=20;i<=150;i++){
        intPart.push({
            value:i.toString(),
            label:i.toString()
        });
    }
    for(let i=0;i<=9;i++){
        realPart.push({
            value:'.'+i.toString(),
            label:'.'+i.toString()
        });
    }

    res.push(intPart);
    res.push(realPart);
    return res;
}();


const BSData = function () {
    let res = [];
    for(let i=30;i<=300;i++){
        res.push({
            value:i.toString(),
            label:i.toString()
        });
    }
    return res;
}();



class HealthRecordPanel extends Component{

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "每日健康记录",
        headerStyle:{
            height:55,
        }
    });

    constructor(props){
        super(props);
        this.state = {
            YDSValue : ['45','.5'],
            PEValue : ['2','30'],
            WeightValue : ['100','.5'],
            BS1Value : ['100'],
            BS2Value : ['100'],
            BSValue : '',
            YDSValueChange : false,
            PEValueChange : false,
            WeightValueChange : false,
            BSValueChange : false,
            BS1ValueChange : false,
            BS2ValueChange : false,
            BSModalVisible : false
        };
    }

    _getDate = ()=>{
        let dt = new Date();
        let year = dt.getFullYear().toString();
        let month = (dt.getMonth()+1).toString();
        let day = dt.getDate().toString();
        return year + '年'+month+'月'+day+'日'+'(今天)';
    };

    _updateYDS = (value)=>{
        this.setState({YDSValue:value,YDSValueChange:true});
    };

    _updatePE = (value)=>{
        this.setState({PEValue:value,PEValueChange:true});
    };

    _updateWeight = (value)=>{
        this.setState({WeightValue:value,WeightValueChange:true});
    };

    _updateBS1 = (value)=>{
        this.setState({BS1Value:value,BS1ValueChange:true});
    };

    _updateBS2 = (value)=>{
        this.setState({BS2Value:value,BS2ValueChange:true});
    };

    _updateBS = ()=>{
        if(!this.state.BS1ValueChange||!this.state.BS2ValueChange){
            Modal.alert('请选择舒张压和收缩压','',[
                {text:'确定',onPress:()=>{}}
            ])
        }else{
            this.setState({
                BSValue:'舒张压 '+this.state.BS1Value+',收缩压 '+this.state.BS2Value,
                BSValueChange:true,
                BSModalVisible:false
            });
        }

    };

    _updatePeriod = (value)=>{
        this.setState({sugarPeriod:value});
    };

    requestSaveHealthRecord = (sessionId,insulin,sportTime,weight,bloodPressure,healthTime,healthDate)=>{
        const {goBack} = this.props.navigation;
        Toast.loading('正在添加');
        httpRequest.post('/saveHealthRecords', {
            session_id:sessionId,
            insulin:insulin,
            sportTime:sportTime,
            weight:weight,
            bloodPressure:bloodPressure,
            healthTime:healthTime,
            healthDate:healthDate
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

    _submitSaveHealthRecord = ()=>{
        const {sessionId} = this.props;
        let nowDate = new Date();
        let datetime = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
        let time = nowDate.getHours()+':'+nowDate.getMinutes();
        let YDS = this.state.YDSValue[0]+this.state.YDSValue[1];
        let PE = this.state.PEValue[0]+','+this.state.PEValue[1];
        let Weight = this.state.WeightValue[0]+this.state.WeightValue[1];
        let BS = this.state.BS1Value[0]+','+this.state.BS2Value[0];
        this.requestSaveHealthRecord(sessionId,YDS,PE,Weight,BS,time,datetime);
    };


    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        const today = this._getDate();

        return (
            <ScrollView style={{height:'100%',width:'100%',backgroundColor:'white'}}>
                <List>
                    <List.Item extra={<Text style={{fontSize:12}}>{today}</Text>}>日期</List.Item>
                    <Picker data={YDSData}
                            cols={2}
                            title="胰岛素用量(U)"
                            format={(labels)=>{return this.state.YDSValueChange?labels[0]+labels[1]+' U':'请选择'}}
                            value={this.state.YDSValue}
                            cascade={false}
                            onChange={this._updateYDS}
                    >
                        <List.Item arrow="horizontal">胰岛素用量</List.Item>
                    </Picker>
                    <Picker data={PEData}
                            cols={2}
                            title="选择运动时长"
                            format={(labels)=>{return this.state.PEValueChange?labels[0]+labels[1]:'请选择'}}
                            cascade={false}
                            value={this.state.PEValue}
                            onChange={this._updatePE}
                    >
                        <List.Item arrow="horizontal">运动时长</List.Item>
                    </Picker>

                    <Picker data={WeightData}
                            cols={1}
                            title="选择体重(kg)"
                            cascade={false}
                            format={(labels)=>{return this.state.WeightValueChange?labels[0]+labels[1]+' kg':'请选择'}}
                            value={this.state.WeightValue}
                            onChange={this._updateWeight}
                    >
                        <List.Item arrow="horizontal">体重</List.Item>
                    </Picker>
                    <List.Item
                        arrow="horizontal"
                        onClick={()=>{this.setState({BSModalVisible:true})}}
                        extra={this.state.BSValueChange?this.state.BSValue:'请选择'}
                    >
                        血压
                    </List.Item>
                </List>
                <Modal
                    visible={this.state.BSModalVisible}
                    maskClosable={false}
                    title='设置血压'
                    transparent
                    footer={[
                        {text:'取消',onPress:()=>{this.setState({BSModalVisible:false})}},
                        {text:'确定',onPress:this._updateBS}
                    ]}
                >
                    <List >
                        <Picker extra="请选择"
                                data={BSData}
                                cols={1}
                                title="选择舒张压(mmHg)"
                                format={(labels)=>{return this.state.BS1ValueChange?labels[0]+' mmHg':'请选择'}}
                                value={this.state.BS1Value}
                                onChange={this._updateBS1}

                        >
                            <List.Item arrow="horizontal">舒张压</List.Item>
                        </Picker>
                        <Picker extra="请选择"
                                data={BSData}
                                cols={1}
                                title="选择收缩压(mmHg)"
                                format={(labels)=>{return this.state.BS2ValueChange?labels[0]+' mmHg':'请选择'}}
                                value={this.state.BS2Value}
                                onChange={this._updateBS2}
                                style={{backgroundColor:'transparent'}}
                        >
                            <List.Item arrow="horizontal">收缩压</List.Item>
                        </Picker>
                    </List>
                </Modal>
                <WhiteSpace size='lg'/>
                <Button
                    type='primary'
                    style={{marginLeft:15,marginRight:15}}
                    onClick={this._submitSaveHealthRecord}
                >
                    保存
                </Button>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps,null)(HealthRecordPanel);