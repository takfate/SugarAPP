import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImagePicker, List, TextareaItem, WhiteSpace} from 'antd-mobile';

const Brief = List.Item.Brief;



const NewPostCss = StyleSheet.create({
    MainView :{
        backgroundColor:'white',
    },
    ItemSeparator : {
        height:5,
        backgroundColor:'#F5F5F5'
    },
    ItemContent:{
        paddingLeft:15,
        paddingRight:15
    },
    ItemImage:{
        marginRight:15,
        width:80,
        height:80
    }

});

class NewPostPanel extends Component{

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "发布到糖圈",
        headerStyle:{
            height:55,
        },
        headerRight:
            <TouchableOpacity onPress={()=>{}}>
                <Text style={{fontSize:18,color:'black',marginRight:10}} >发布</Text>
            </TouchableOpacity>
    });

    constructor(props){
        super(props);
        this.state = {

        };
    }


    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                <ScrollView style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                    <View style={{paddingRight:10}}>
                        <TextareaItem
                            autoHeight
                            placeholder="输入帖子的内容..."
                            count={300}

                        />
                    </View>

                    <WhiteSpace size="lg" />
                    <View style={{paddingLeft:10,paddingRight:10}}>
                        <ImagePicker />
                    </View>
                </ScrollView>
            </View>
        );
    }

}

export default connect()(NewPostPanel);