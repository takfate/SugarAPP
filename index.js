import { AppRegistry,YellowBox  } from 'react-native';
import App from './App';
import './Storage.js';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('SugarAPP', () => App);
