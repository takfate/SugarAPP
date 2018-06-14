import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView} from 'react-native';
import {TabBar,Button,WhiteSpace,Card,List,Radio,PickerView,Checkbox  } from 'antd-mobile';

import * as Items from './Items';
import * as Actions from "../../MainF/actions";
import {guide_update} from "../../MainF/actions";

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {
        guideUpdate : (item) => {
            dispatch(Actions.guide_update(item));
        },
        guideClear : (key) => {
            dispatch(Actions.guide_clear(key));
        }
    }
}

class GuideHome extends Component{
    static navigationOptions = {
        headerTitle: "糖导",
        headerStyle:{
            height:55,
        }
    };

    componentDidMount(){
        const {guideClear,navigation} = this.props;
        guideClear(navigation.state.key);
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    justifyContent:'center',
                    alignItems:'center',
                    paddingLeft:20,
                    paddingRight:20
                }}
            >
                <Text>糖导接下来将进行测试</Text>
                <Text>她将会为您量身定制属于你的健康周报</Text>
                <WhiteSpace size='lg' />
                <Button type='primary' onClick={()=>{navigate('GuideStep1')}}>开始测试</Button>
            </View>
        );
    }
}

class GuideStep1Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(1/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:'男'
        };
    }


    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({gender:value});
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="您的性别是?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step1.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value} onChange={()=>this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep2')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep2Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(2/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:['30']
        };
    }



    _updateSelection = (obj) => {
        this.setState({value:obj});
        const {guideUpdate} = this.props;
        guideUpdate({age:obj[0]});
    };


    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="您的年龄是?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    />
                    <Card.Body>
                        <PickerView
                            cols={1}
                            data={Items.step2}
                            value={this.state.value}
                            onChange={this._updateSelection}
                        />
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep3')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep3Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(3/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:['160']
        };
    }

    _updateSelection = (obj) => {
        this.setState({value:obj});
        const {guideUpdate} = this.props;
        guideUpdate({height:obj[0]});
    };


    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="您的身高是?(cm)"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    />
                    <Card.Body>
                        <PickerView
                            cols={1}
                            data={Items.step3}
                            value={this.state.value}
                            onChange={this._updateSelection}
                        />
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep4')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep4Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(4/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:['70','.5']
        };
    }

    _updateSelection = (obj) => {
        this.setState({value:obj});
        const {guideUpdate} = this.props;
        guideUpdate({weight:obj[0]+obj[1]});
    };


    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="您的体重是?(kg)"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    />
                    <Card.Body>
                        <PickerView
                            cols={2}
                            cascade={false}
                            data={Items.step4}
                            value={this.state.value}
                            onChange={this._updateSelection}
                        />
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep5')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep5Panel extends Component {
    static navigationOptions = {
        headerTitle: "糖导(5/19)",
        headerStyle: {
            height: 55,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '1型糖尿病'
        };
    }


    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({sugarType:value});
    };

    _switch = ()=> {
        const {sugarType} =  this.props.sugarGuide;
        const {navigate} = this.props.navigation;
        if(sugarType==='不清楚'){
            navigate('GuideStep6');
        }else{
            navigate('GuideStep14');
        }
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{height: '100%', width: '100%'}}>
                <Card style={{width: '100%', marginTop: 75}}>
                    <Card.Header
                        title="你的糖尿病类型是?"
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}
                    />
                    <Card.Body>
                        <List>
                            {Items.step5.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value}
                                           onChange={() => this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={this._switch}>下一步</Button>}/>
                </Card>
            </View>
        );
    }

}

class GuideStep6Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(6/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:['30']
        };
    }


    _updateSelection = (obj) => {
        this.setState({value:obj});
        const {guideUpdate} = this.props;
        guideUpdate({diseaseAge:obj[0]});
    };


    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="您发病时的年龄?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    />
                    <Card.Body>
                        <PickerView
                            cols={1}
                            data={Items.step6}
                            value={this.state.value}
                            onChange={this._updateSelection}
                        />
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep7')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep7Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(7/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:'有'
        };
    }

    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({akin:value});
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="是否有家族史?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step7.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep8')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep8Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(8/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:'几乎没有'
        };
    }

    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({fm:value});
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="您的胰岛素分泌情况如何?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step8.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep9')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep9Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(9/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:'是'
        };
    }

    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({manyDrinkWC:value})
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="是否多饮多尿?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step9.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep10')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep10Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(10/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:'是'
        };
    }

    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({poison:value});
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="是否发生过酮症或酮症酸中毒?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step10.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep11')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep11Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(11/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:'是'
        };
    }

    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({thirsty:value});
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="经常口渴无力?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step11.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep12')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep12Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(12/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:'是'
        };
    }

    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({visionDown:value})
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="是否感觉有视力下降?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step12.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep13')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep13Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(13/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:'迅速'
        };
    }

    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({diseaseSpeed:value});
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="您的病发速度?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step13.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep14')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep14Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(14/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);

    }



    componentDidMount(){
        const {sugarType,diseaseAge,akin,fm,manyDrinkWC,poison,thirsty,visionDown,diseaseSpeed,height,weight} = this.props.sugarGuide;
        const {guideUpdate} = this.props;
        if(sugarType==='不清楚'){
            let one = 0;
            let two = 0;
            if(parseInt(diseaseAge)<20)one++;
            else two++;
            if(akin==='是')one++;
            else two++;
            if(fm==='几乎没有')one++;
            else if(fm==='正常或稍高')two++;
            if(manyDrinkWC==='是')one++;
            else two++;
            if(poison==='是')one++;
            else if(poison==='不是')two++;
            if(thirsty==='是')two++;
            else one++;
            if(visionDown==='是')one++;
            else two++;
            if(diseaseSpeed==='迅速')one++;
            else two++;
            let he = parseFloat(height);
            let we = parseFloat(weight);
            let bmi = we/(he*he/10000);
            if(bmi<18.4){
                one++;
            }else if(bmi>28){
                two++;
            }
            if(one>=two){
                guideUpdate({sugarType:'1型糖尿病'});
            }else{
                guideUpdate({sugarType:'2型糖尿病'})
            }

        }
    }

    render(){
        const {navigate} = this.props.navigation;

        const {sugarType} = this.props.sugarGuide;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="根据预测，您所患的糖尿病类型是"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}
                    />
                    <Card.Body>
                        <Text style={{textAlign:'center',fontSize:30,color:'black'}}>{sugarType}</Text>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep15')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep15Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(15/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:['2018']
        };
    }

    _updateSelection = (obj) => {
        this.setState({value:obj});
        const {guideUpdate} = this.props;
        guideUpdate({verifyYear:obj[0]});
    };


    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="糖尿病的确证年份是?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    />
                    <Card.Body>
                        <PickerView
                            cols={1}
                            data={Items.step15}
                            value={this.state.value}
                            onChange={this._updateSelection}
                        />
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep16')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep16Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(16/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:[]
        };
    }


    _updateSelection = (ev,value) => {
        const {guideUpdate} = this.props;
        if(!ev.target.checked){
            let tmp = [];
            for(let i=0;i<this.state.value.length;i++){
                if(this.state.value[i]!==value)tmp.push(this.state.value[i]);
            }
            this.setState({value:tmp});
            guideUpdate({cureWay:tmp.join(',')});
        }else{
            let tmp = this.state.value.slice();
            tmp.push(value);
            this.setState({value:tmp});
            guideUpdate({cureWay:tmp.join(',')});
        }
    };


    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="您的治疗方式是什么?(多选)"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step16.map(i => (
                                <CheckboxItem key={i.value} onChange={(ev)=>this._updateSelection(ev,i.value)}>
                                    {i.label}
                                </CheckboxItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep17')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep17Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(17/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:'基础一针'
        };
    }


    _updateSelection = (value) => {
        this.setState({value:value});
        const {guideUpdate} = this.props;
        guideUpdate({dsPlan:value});
    };


    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="您使用的胰岛素方案是?"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    />
                    <Card.Body>
                        <List>
                            {Items.step17.map(i => (
                                <RadioItem key={i.value} checked={this.state.value === i.value} onChange={()=>this._updateSelection(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}

                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep18')}}>下一步</Button>}/>
                </Card>
            </View>
        );
    }
}

class GuideStep18Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(18/19)",
        headerStyle:{
            height:55,
        }
    };

    constructor(props){
        super(props);
        this.state = {
            value:[]
        };
    }


    _updateSelection = (ev,value) => {
        const {guideUpdate} = this.props;
        if(!ev.target.checked){
            let tmp = [];
            for(let i=0;i<this.state.value.length;i++){
                if(this.state.value[i]!==value)tmp.push(this.state.value[i]);
            }
            this.setState({value:tmp});
            guideUpdate({complication:tmp.join(',')});
        }else{
            let tmp = this.state.value.slice();
            tmp.push(value);
            this.setState({value:tmp});
            guideUpdate({complication:tmp.join(',')});
        }
    };


    render(){
        const {navigate} = this.props.navigation;
        return(
            <ScrollView style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="是否存在以下并发症?(多选)"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    />
                    <Card.Body>
                        <List >
                            {Items.step18.map(i => (
                                <CheckboxItem key={i.value} onChange={(ev)=>this._updateSelection(ev,i.value)}>
                                    {i.label}
                                </CheckboxItem>
                            ))}
                        </List>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{navigate('GuideStep19')}}>下一步</Button>}/>
                </Card>
            </ScrollView>
        );
    }
}

class GuideStep19Panel extends Component{
    static navigationOptions = {
        headerTitle: "糖导(19/19)",
        headerStyle:{
            height:55,
        },
        headerLeft:null
    };

    constructor(props){
        super(props);
        this.state = {
            value:[]
        };
    }




    render(){
        const {goBack} = this.props.navigation;
        const {navigationKey} = this.props.sugarGuide;
        return(
            <View style={{  height: '100%', width: '100%'}}>
                <Card style={{width:'100%',marginTop:75}}>
                    <Card.Header
                        title="恭喜你！糖导结束"
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    />
                    <Card.Body>
                        <Text style={{textAlign:'center',fontSize:20,color:'black'}}>
                            生成的健康周报在糖家的状态滚动栏中可以查看哦~
                        </Text>
                    </Card.Body>
                    <Card.Footer content={<Button type='primary' onClick={()=>{goBack(navigationKey)}}>完成</Button>}/>
                </Card>
            </View>
        );
    }
}

const SugarGuideNavigation = {
    GuideHome : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideHome)
    },
    GuideStep1 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep1Panel)
    },
    GuideStep2 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep2Panel)
    },
    GuideStep3 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep3Panel)
    },
    GuideStep4 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep4Panel)
    },
    GuideStep5 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep5Panel)
    },
    GuideStep6 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep6Panel)
    },
    GuideStep7 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep7Panel)
    },
    GuideStep8 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep8Panel)
    },
    GuideStep9 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep9Panel)
    },
    GuideStep10 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep10Panel)
    },
    GuideStep11 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep11Panel)
    },
    GuideStep12 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep12Panel)
    },
    GuideStep13 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep13Panel)
    },
    GuideStep14 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep14Panel)
    },
    GuideStep15 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep15Panel)
    },
    GuideStep16 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep16Panel)
    },
    GuideStep17 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep17Panel)
    },
    GuideStep18 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep18Panel)
    },
    GuideStep19 : {
        screen : connect(mapStateToProps,mapDispatchToProps)(GuideStep19Panel)
    }

};

export default SugarGuideNavigation;