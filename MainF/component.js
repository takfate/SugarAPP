

import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {TabBar,Button} from 'antd-mobile';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import * as Actions from './actions';
import MeTabPanel from '../MeTabPanel';
import SchoolTabPanel from '../SchoolTabPanel';

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
                        title="糖家"
                        key="Home"
                        selected={selectedTab==="Home"}
                        onPress={()=>{SelectTab("Home")}}
                    >
                        <Button>糖家</Button>
                    </TabBar.Item>
                    <TabBar.Item
                        title="糖学院"
                        key="School"
                        selected={selectedTab==="School"}
                        onPress={()=>{SelectTab("School")}}
                    >
                        <SchoolTabPanel navigation={this.props.navigation}/>
                    </TabBar.Item>
                    <TabBar.Item
                        title="糖圈"
                        key="Bbs"
                        selected={selectedTab==="Bbs"}
                        onPress={()=>{SelectTab("Bbs")}}
                    >
                        <Button>糖圈</Button>
                    </TabBar.Item>
                    <TabBar.Item
                        title="我的"
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