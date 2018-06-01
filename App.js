/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import store from './Store.js';

import StackNav from './Navigator';

import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Button} from 'antd-mobile';



class App extends Component {
    render() {
        return (
            <Provider store={store}>

                    <StackNav/>

            </Provider>
        );
    }
}


export default App;

