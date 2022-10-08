import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ContractDetails from 'src/components/contract-detail/ContractDetail';
import ImageViewer from 'src/components/image-viewer/ImageViewer';
import NotificationComponent from 'src/components/notification-component/NotificationComponent';
import PaymentWebView from 'src/components/payment-webview/PaymentWebView';
import PaymentWithSavedCards from 'src/components/payment-with-saved-cards/PaymentWithSavedCard';
import SettingsWebView from 'src/components/settings-webview/SettingsWebView';
import Escrow from 'src/pages/jobs/contract/escrow/Escrow';
import Milestone from 'src/pages/jobs/contract/milestone/Milestone';
import ProjectDetails from 'src/pages/jobs/post-a-project/project-details/ProjectDetails';
import ProposalDetails from 'src/pages/jobs/proposals/proposal-details/ProposalDetails';
import Ratings from 'src/pages/jobs/rating-freelacer/Ratings';
import Chat from 'src/pages/messages/chat/Chat';
import FirebaseChat from 'src/pages/messages/firebase-chat/FirebaseChat';
// import Login from 'src/pages/authentication/login/Login';
import MyTabs from 'src/routes/Home';
import Intro from 'src/routes/Introduction';
import colors from 'src/styles/texts/colors';
import HiredTabs from './HiredTopTabNavigator';
import InvitationTabs from './InvitationTopTabNavigator';

const RootStack = createStackNavigator();

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  gestureEnabled: true,

  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Intro" component={Intro} />
      <RootStack.Screen name="Tabs" component={MyTabs} />
      <RootStack.Screen name="Chat" component={Chat} />
      <RootStack.Screen name="FirebaseChat" component={FirebaseChat} />
      <RootStack.Screen
        name="NotificationComponent"
        component={NotificationComponent}
        options={horizontalAnimation}
      />
      <RootStack.Screen name="HiredTabs" component={HiredTabs} />
      <RootStack.Screen name="InvitationTabs" component={InvitationTabs} />
      <RootStack.Screen name="ProposalDetails" component={ProposalDetails} />
      <RootStack.Screen name="ContractDetails" component={ContractDetails} />
      <RootStack.Screen name="ProjectDetails" component={ProjectDetails} />
      <RootStack.Screen
        name="ImageViewer"
        component={ImageViewer}
        options={
          (horizontalAnimation,
          {
            headerShown: true,
            headerTransparent: true,
            headerTintColor: colors.defaultWhite,
            headerTitle: '',
            headerBackTitle: 'Back',
          })
        }
      />
      <RootStack.Screen
        name="PaymentWebView"
        component={PaymentWebView}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Back',
        }}
      />
      <RootStack.Screen name="Escrow" component={Escrow} />
      <RootStack.Screen name="Milestone" component={Milestone} />
      <RootStack.Screen
        name="SettingsWebView"
        component={SettingsWebView}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Back',
        }}
      />
      <RootStack.Screen name="Ratings" component={Ratings} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
