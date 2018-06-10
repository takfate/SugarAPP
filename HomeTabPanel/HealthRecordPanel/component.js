import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView,View,Text,TextInput,TouchableOpacity } from 'react-native';
import {TabBar,Button,InputItem,WhiteSpace,Slider,Card,Picker,List } from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

function mapStateToProps(state) {
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

class HealthRecordPanel extends Component{

    constructor(props){
        super(props);

    }

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "每日健康记录",
        headerStyle:{
            height:55,
        }
    });

    _getDate = ()=>{
        let dt = new Date();

        let year = dt.getFullYear().toString();
        let month = (dt.getMonth()+1).toString();
        let day = dt.getDate().toString();
        return year + '年'+month+'月'+day+'日'+'(今天)';
    };

    render(){
        const { navigate } = this.props.navigation;
        const {params} =  this.props.navigation.state;
        const today = this._getDate();

        return (
            <ScrollView style={{height:'100%',width:'100%',backgroundColor:'white'}}>
                <List>
                    <List.Item extra={<Text style={{fontSize:12}}>{today}</Text>}>日期</List.Item>
                    <Picker extra="请选择"
                            data={YDSData}
                            cols={1}
                            title="胰岛素用量(U)"
                            cascade={false}
                            onOk={e => console.log('ok', e)}
                            onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">胰岛素用量</List.Item>
                    </Picker>
                    <Picker extra="请选择"
                            data={TimeSelctionData}
                            cols={2}
                            title="选择时间段"
                            onOk={e => console.log('ok', e)}
                            onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">时间段</List.Item>
                    </Picker>

                    <Picker extra="请选择"
                            data={TimeSelctionData}
                            cols={1}
                            title="选择时间段"
                            onOk={e => console.log('ok', e)}
                            onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">时间段</List.Item>
                    </Picker>
                    <Picker extra="请选择"
                            data={TimeSelctionData}
                            cols={1}
                            title="选择时间段"
                            onOk={e => console.log('ok', e)}
                            onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">时间段</List.Item>
                    </Picker>
                </List>
            </ScrollView>

        );

    }

}


export default connect()(HealthRecordPanel);