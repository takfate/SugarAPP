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


class SugarRecordPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            sugarValue : 23,
            sugarTime : 0
        }
    }

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "添加血糖记录 ",
        headerStyle:{
            height:55,
        }
    });


    log = (name) => {
        return (value) => {
            alert(`${name}: ${value}`);
        };
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
                            marks={{15:'123'}}
                            onChange={(value)=>{this.setState({sugarValue:value})}}
                        />
                        <View style={{width:'100%',height:100,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:25,color:'black'}}>
                                {(this.state.sugarValue/10).toFixed(1)} mmol/L
                            </Text>
                        </View>
                    </Card.Body>
                </Card>
                <Picker extra="请选择"
                        data={TimeSelctionData}
                        cols={1}
                        title="选择时间段"
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                >
                    <List.Item arrow="horizontal">时间段</List.Item>
                </Picker>
                <WhiteSpace size='lg'/>
                <Button type='primary' style={{marginLeft:15,marginRight:15}}>保存</Button>
            </ScrollView>

        );

    }

}


export default connect()(SugarRecordPanel);