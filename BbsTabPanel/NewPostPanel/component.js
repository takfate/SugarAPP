import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImagePicker, List, TextareaItem, WhiteSpace,Toast} from 'antd-mobile';

import httpRequest from '../../httpRequest';

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


function mapStateToProps(state,ownProps) {
    return state.MainF;
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


class NewPostPanel extends Component{

    static navigationOptions = ({ navigation }) =>({
        headerTitle: "发布到糖圈",
        headerStyle:{
            height:55,
        },
        headerRight:
            <TouchableOpacity onPress={()=>navigation.state.params.submitPost()}>
                <Text style={{fontSize:18,color:'black',marginRight:10}} >发布</Text>
            </TouchableOpacity>
    });

    constructor(props){
        super(props);
        this.state = {
            TextContent : '',
            ImageList : []
        };
    }

    componentDidMount(){
        this.props.navigation.setParams({ submitPost:this._submitPost });
    }

    _updateTextContent = (value) =>{
        this.setState({TextContent:value});
    };

    _submitPost = ()=>{
        const {sessionId} = this.props;
        this.requestNewTopic(sessionId,this.state.TextContent,[]);
    };

    _updateImageList = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            ImageList : files,
        });
    };

    requestNewTopic = (sessionId,Content,Images)=>{
        Toast.loading('正在发布');
        httpRequest.post('/addTopic', {
            session_id:sessionId,
            content : Content,
            pictureList:JSON.stringify(Images)
        })
            .then((response) => {
                let data = response.data;
                if (data['code'] === 0) {
                    Toast.success('发布成功',1);
                    this.props.navigation.goBack();
                } else {
                    Toast.fail(data['msg']);
                }
            })
            .catch((error) => {
                Toast.fail('网络好像有问题~');
            });

    };

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                <ScrollView style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                    <View style={{paddingRight:10}}>
                        <TextareaItem
                            autoHeight
                            placeholder="输入话题的内容..."
                            count={300}
                            value={this.state.TextContent}
                            onChange={this._updateTextContent}
                        />
                    </View>

                    <WhiteSpace size="lg" />
                    <View style={{paddingLeft:10,paddingRight:10}}>
                        <ImagePicker
                            files={this.state.ImageList}
                            onChange={this._updateImageList}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

}

export default connect(mapStateToProps,null)(NewPostPanel);