import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

import MainF from './MainF';
import SettingPanel from './MeTabPanel/SettingPanel';
import UserInfoPanel from './MeTabPanel/UserInfoPanel';
import UserInfoEditPanel from './MeTabPanel/UserInfoEditPanel';
import {
    NickNameEditPanel,
    GenderEditPanel,
    AgeEditPanel,
    JobEditPanel,
    LocationEditPanel,
    HeightEditPanel,
    WeightEditPanel
} from './MeTabPanel/UserInfoEditPanel/InfoItemEditPanel'

import {
    MyWatchListPanel,
    WatchMeListPanel
} from './MeTabPanel/NormalListPanel';

import ArticleSearchPanel from './SchoolTabPanel/ArticleSearchPanel';
import ArticleDetailPanel from './SchoolTabPanel/ArticleDetailPanel';


const StackNav = StackNavigator(
    {
        // Main
        Main: {
            screen : MainF
        },

        // Me
        Settings:{
            screen : SettingPanel
        },
        UserInfo:{
            screen : UserInfoPanel
        },
        UserInfoEdit:{
            screen : UserInfoEditPanel
        },
        NickNameEdit:{
            screen : NickNameEditPanel
        },
        GenderEdit:{
            screen : GenderEditPanel
        },
        AgeEdit : {
            screen : AgeEditPanel
        },
        JobEdit : {
            screen : JobEditPanel
        },
        LocationEdit: {
            screen : LocationEditPanel
        },
        HeightEdit : {
            screen : HeightEditPanel
        },
        WeightEdit :{
            screen : WeightEditPanel
        },
        MyWatchList:{
            screen: MyWatchListPanel
        },
        WatchMeList:{
            screen : WatchMeListPanel
        },

        // School
        ArticleSearch : {
            screen: ArticleSearchPanel
        },
        ArticleDetail : {
            screen : ArticleDetailPanel
        }
    },
    {
        headerMode: 'screen',
        initialRouteName: 'Main',
        mode: 'card'
    }
);


export default StackNav;