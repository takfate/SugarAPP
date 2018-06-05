

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View,Text} from 'react-native';
import {TabBar,Button} from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import * as Actions from './actions';
import MeTabPanel from '../MeTabPanel';
import SchoolTabPanel from '../SchoolTabPanel';
import BbsTabPanel from '../BbsTabPanel';
import Icon from 'react-native-vector-icons/FontAwesome';

function mapStateToProps(state) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {
        SelectTab:(new_tab) =>{
            dispatch(Actions.select_tab(new_tab));
        }
    }
}

class MainF extends Component{
    static navigationOptions = {
        headerStyle:{
            height:0
        }
    };

    render(){
        const {selectedTab} = this.props;
        const {SelectTab}  = this.props;
        return(

            <View style={{  height: '100%', width: '100%', top: 0}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title={<Text><Icon name="home" size={25}/>糖家</Text>}
                        key="Home"
                        selected={selectedTab==="Home"}
                        onPress={()=>{SelectTab("Home")}}

                    >
                        <Button>糖家</Button>
                    </TabBar.Item>
                    <TabBar.Item
                        title={<Text><Icon name="graduation-cap" size={25}/>糖学院</Text>}
                        key="School"
                        selected={selectedTab==="School"}
                        onPress={()=>{SelectTab("School")}}
                    >
                        <SchoolTabPanel navigation={this.props.navigation}/>
                    </TabBar.Item>
                    <TabBar.Item
                        title={<Text><Icon name="compass" size={25}/>糖圈</Text>}
                        key="Bbs"
                        selected={selectedTab==="Bbs"}
                        onPress={()=>{SelectTab("Bbs")}}
                    >
                        <BbsTabPanel navigation={this.props.navigation}/>
                    </TabBar.Item>
                    <TabBar.Item
                        title={<Text><Icon name="user" size={25}/>我的</Text>}
                        key="Me"
                        selected={selectedTab==="Me"}
                        onPress={()=>{SelectTab("Me")}}
                    >
                        <MeTabPanel navigation={this.props.navigation}/>
                    </TabBar.Item>
                </TabBar>
            </View>
        );
    }

}


export default connect(mapStateToProps,mapDispatchToProps)(MainF);