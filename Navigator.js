import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

import MainF from './MainF';
import Register1Panel from './WelcomePanel/Register1Panel';
import Register2Panel from './WelcomePanel/Register2Panel';
import Forget1Panel from './WelcomePanel/Forget1Panel';
import Forget2Panel from './WelcomePanel/Forget2Panel';

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
} from './MeTabPanel/UserInfoEditPanel/InfoItemEditPanel';
import SecretSettingPanel from './MeTabPanel/SettingPanel/SecretSettingPanel';
import ChatPanel from './MeTabPanel/ChatPanel';
import MyGroupListPanel from'./MeTabPanel/MyGroupListPanel';
import CreateGroupPanel from './MeTabPanel/MyGroupListPanel/CreateGroupPanel';
import GroupChatPanel from './MeTabPanel/MyGroupListPanel/GroupChatPanel';
import GroupInfoPanel from './MeTabPanel/MyGroupListPanel/GroupInfoPanel';

import {
    MyWatchListPanel,
    WatchMeListPanel,
    MyCollectedArticleListPanel,
    MyCommentListPanel,
    MyPublishedTopicListPanel,
    MyCollectedTopicListPanel,
    MyResponseListPanel,
    SubPostDetailPanel
} from './MeTabPanel/NormalListPanel';

import ArticleSearchPanel from './SchoolTabPanel/ArticleSearchPanel';
import ArticleDetailPanel from './SchoolTabPanel/ArticleDetailPanel';

import BbsSearchPanel from "./BbsTabPanel/BbsSearchPanel";
import NewPostPanel from './BbsTabPanel/NewPostPanel';
import PostDetailPanel from './BbsTabPanel/PostDetailPanel';
import ReturnPostPanel from './BbsTabPanel/ReturnPostPanel';

import KinLinkListPanel from './HomeTabPanel/KinLinkListPanel';
import KinLinkPanel from './HomeTabPanel/KinLinkPanel';
import SugarRecordPanel from './HomeTabPanel/SugarRecordPanel';
import HealthRecordPanel from './HomeTabPanel/HealthRecordPanel';
import MoreSugarRecordPanel from './HomeTabPanel/MoreSugarRecordPanel';
import MoreHealthRecordPanel from './HomeTabPanel/MoreHealthRecordPanel';
import SugarGuidePanel from './HomeTabPanel/SugarGuidePanel';
import SugarDoctorPanel from './HomeTabPanel/SugarDoctorPanel';
import HealthWeeklyPanel from './HomeTabPanel/HealthWeeklyPanel';
import MessageListPanel from './HomeTabPanel/MessageListPanel';


const StackNav = StackNavigator(
    {
        // Main
        Main: {
            screen : MainF
        },

        // Welcome
        Register1 : {
            screen :Register1Panel
        },
        Register2 : {
            screen :Register2Panel
        },
        Forget1 : {
            screen: Forget1Panel
        },
        Forget2 : {
            screen :Forget2Panel
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
        SecretSetting : {
            screen : SecretSettingPanel
        },
        MyCollectedArticleList:{
            screen : MyCollectedArticleListPanel
        },
        MyCommentList : {
            screen : MyCommentListPanel
        },
        MyPublishedTopicList: {
            screen : MyPublishedTopicListPanel
        },
        MyCollectedTopicList:{
            screen : MyCollectedTopicListPanel
        },
        MyResponseList:{
            screen : MyResponseListPanel
        },
        Chat : {
            screen : ChatPanel
        },
        SubPostDetail : {
            screen :SubPostDetailPanel
        },
        MyGroup : {
            screen: MyGroupListPanel
        },
        CreateGroup:{
            screen: CreateGroupPanel
        },
        GroupChat:{
            screen: GroupChatPanel
        },
        GroupInfo : {
            screen : GroupInfoPanel
        },


        // School
        ArticleSearch : {
            screen: ArticleSearchPanel
        },
        ArticleDetail : {
            screen : ArticleDetailPanel
        },
        // Bbs
        BbsSearch : {
            screen : BbsSearchPanel
        },
        NewPost : {
            screen : NewPostPanel
        },
        PostDetail: {
            screen : PostDetailPanel
        },
        ReturnPost : {
            screen : ReturnPostPanel
        },

        // Home
        KinLinkList : {
            screen : KinLinkListPanel
        },
        KinLink : {
            screen : KinLinkPanel
        },
        SugarRecord : {
            screen : SugarRecordPanel
        },
        HealthRecord : {
            screen : HealthRecordPanel
        },
        MoreSugarRecord : {
            screen : MoreSugarRecordPanel
        },
        MoreHealthRecord : {
            screen : MoreHealthRecordPanel
        },
        SugarGuide : {
            screen : SugarGuidePanel
        },
        SugarDoctor : {
            screen : SugarDoctorPanel
        },
        HealthWeekly : {
            screen : HealthWeeklyPanel
        },
        MessageList:{
            screen : MessageListPanel
        }
    },
    {
        headerMode: 'screen',
        initialRouteName: 'Main',
        mode: 'card'
    }
);


export default StackNav;