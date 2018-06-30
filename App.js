import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './Store.js';

import StackNav from './Navigator';



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

