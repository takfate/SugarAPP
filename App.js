import React, { Component } from 'react';
import {Provider} from 'react-redux';

import StackNav from './Navigator';
import store from './Store.js';

class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <StackNav/>
            </Provider>
        );
    }
}


export default App;

