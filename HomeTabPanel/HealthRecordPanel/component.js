import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import {TabBar, Button, InputItem, WhiteSpace, Slider, NoticeBar, Picker, List, Modal, Toast, Flex} from 'antd-mobile';
import httpRequest from "../../httpRequest";
import {RadiusButton} from "../../CommonComponent";
import Icon from 'react-native-vector-icons/FontAwesome';
import {AudioRecorder, AudioUtils} from "react-native-audio";

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
}



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
            BSModalVisible : false,
            currentTime: 0.0,
            recording: false,
            stoppedRecording: false,
            finished: false,
            audioPath: AudioUtils.DocumentDirectoryPath + '/sugar_record.aac',
            hasPermission: undefined,
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


    requestSaveHealthRecord = (sessionId,insulin,sportTime,weight,bloodPressure,healthTime,healthDate)=>{
        const {goBack} = this.props.navigation;
        Toast.loading('正在添加');
        httpRequest.post('/home/health/record', {
            session_id:sessionId,
            insulin:insulin,
            sport_time:sportTime,
            weight:weight,
            blood_pressure:bloodPressure,
            record_time:healthTime,
            record_date:healthDate
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
        if(this.state.YDSValueChange&&this.state.PEValueChange&&this.state.WeightValueChange&&this.state.BSValueChange){
            const {sessionId} = this.props;
            let nowDate = new Date();
            let datetime = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
            let time = nowDate.getHours()+':'+nowDate.getMinutes();
            let YDS = this.state.YDSValue[0]+this.state.YDSValue[1];
            let PE = this.state.PEValue[0]+','+this.state.PEValue[1];
            let Weight = this.state.WeightValue[0]+this.state.WeightValue[1];
            let BS = this.state.BS1Value[0]+','+this.state.BS2Value[0];
            this.requestSaveHealthRecord(sessionId,YDS,PE,Weight,BS,time,datetime);
        }else{
            Toast.fail('请填写完整的健康记录');
        }
    };


    _prepareRecordingPath = (audioPath)=>{
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000,
            IncludeBase64:true
        });
    };

    async _stop() {
        if (!this.state.recording) {
            alert('Can\'t stop, not recording!');
            return;
        }

        this.setState({stoppedRecording: true, recording: false});

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            alert(error);
        }
    }

    async _record() {
        if (this.state.recording) {
            alert('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            alert('Can\'t record, no permission granted!');
            return;
        }

        if(this.state.stoppedRecording){
            this._prepareRecordingPath(this.state.audioPath);
        }

        this.setState({recording: true});

        try {
            const filePath = await AudioRecorder.startRecording();
            // alert(`start on ${filePath}`);
        } catch (error) {
            console.error(error);
        }
    }

    _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({ finished: didSucceed ,currentTime:0.0});
        // alert(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    }

    componentDidMount(){
        const {sessionId} = this.props;
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({ hasPermission: isAuthorised });

            if (!isAuthorised) return;

            this._prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({currentTime: Math.floor(data.currentTime)});
            };

            AudioRecorder.onFinished = (data) => {
                this.requestParseHealthVoice(sessionId,data.base64);
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });
    }

    requestParseHealthVoice = (sessionId,audio)=>{
        Toast.loading('正在解析',0);
        httpRequest.post('/home/health/voice', {
            session_id:sessionId,
            audio:audio
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    data = data.data;
                    Toast.hide();
                    alert(JSON.stringify(data));
                    if (Object.keys(data).length === 0){
                        Toast.offline("解析失败，请仔细阅读上方提示再次尝试录音")
                    }else{
                        let parseResult = `解析到\n`;
                        if(data.hasOwnProperty("insulin")) {
                            parseResult += `[胰岛素用量：${data["insulin"]}U]\n`;
                        }
                        if(data.hasOwnProperty("weight")){
                            parseResult += `[体重：${data["weight"]}千克]\n`;
                        }
                        if(data.hasOwnProperty("sportsTime")){
                            parseResult += `[运动时长：${data["sportsTime"]["hour"]}小时${data["sportsTime"]["minute"]}分钟]\n`;
                        }
                        if(data.hasOwnProperty("pressure1") && data.hasOwnProperty("pressure2")){
                            parseResult += `[舒张压：${data["pressure1"]}U]\n`;
                            parseResult += `[收缩压：${data["pressure2"]}U]\n`;
                        }
                        parseResult+=`是否正确？`;
                        Modal.alert(`解析成功`,parseResult,[
                            {text:"确定",onPress:()=>{}},
                            {text:"取消",onPress:()=>{}}
                        ])
                    }

                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                alert(JSON.stringify(err))
                Toast.fail('网络好像有问题~');
            });
    };

    _renderAudioToast = ()=>{
        return (
            <Icon name="microphone" size={80} color="white"/>
        )
    };

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        const today = this._getDate();

        return (
            <ScrollView style={{height:'100%',width:'100%',backgroundColor:'white'}}>
                <NoticeBar marqueeProps={{loop: true, leading: 500, trailing: 800, fps: 60, style: {}}}>
                    提示：在进行语音输入时，每一项后尽量有停顿，体重的默认单位为千克/公斤，血压请分别说出舒张压和收缩压。
                </NoticeBar>
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
                <Flex justify="center" align="center">
                    <Flex.Item>
                        <Flex justify="center" align="center">
                            <RadiusButton
                                text={this.state.currentTime}
                                onPressIn={()=>{
                                    Toast.info(this._renderAudioToast(),0);
                                    this._record();
                                }}
                                onPressOut={()=>{
                                    Toast.hide();
                                    this._stop();
                                }}
                            />
                        </Flex>
                    </Flex.Item>
                    <Flex.Item>
                        <Flex justify="center" align="center">
                            <Button
                                type='primary'
                                style={{borderRadius:70,width:140,height:140}}
                                onClick={this._submitSaveHealthRecord}
                            >
                                保存记录
                            </Button>
                        </Flex>
                    </Flex.Item>
                </Flex>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps,null)(HealthRecordPanel);