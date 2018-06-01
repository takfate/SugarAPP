import {createStore, combineReducers} from 'redux';

import MainFReducer from './MainF/reducer';
import SchoolReducer from './SchoolTabPanel/reducer';

const reducers = combineReducers({
    MainF:MainFReducer,
    SchoolTabPanel:SchoolReducer
});

const store = createStore(reducers);

export default store;