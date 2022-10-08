import {NavigationContainer} from '@react-navigation/native';
import QB from 'quickblox-react-native-sdk';
import React, {Component} from 'react';
import {Platform} from 'react-native';
import {Freshchat, FreshchatConfig} from 'react-native-freshchat-sdk';
import 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import {connect} from 'react-redux';
import quickblox from 'src/QBConfig';
import RootNavigator from 'src/routes/RootStack';
import {isReadyRef, navigationRef} from 'src/utils/Navigation';
import {MODAL_VISIBLE} from './src/actions/action';
import ConfirmationDialog from './src/components/confirmation-dialog/ConfirmationDialog';
import ErrorDialog from './src/components/error-dialog/ErrorDialog';

// import crashlytics from '@react-native-firebase/crashlytics';
const oneSignalDevId = '46b18615-9b70-46a4-99ba-01577079a3bc';
const oneSignalLiveId = 'e091b0be-c452-4378-8e8b-afbfc6a281a3';
class App extends Component {
  constructor(props) {
    super(props);
    // OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init(oneSignalLiveId, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    Platform.OS === 'ios' &&
      OneSignal.requestPermissions(
        (permissions = {
          alert: true,
          badge: true,
          sound: true,
        }),
      );
    this.freshchatConfig = new FreshchatConfig(
      '849cf1ca-0ae1-4de7-9ecd-54d0d82b6e97',
      '7f04d821-1467-4265-bfd7-5fbb8928c1b2',
    );
    Freshchat.init(this.freshchatConfig);
  }

  quickbloxAppSetting = {
    appId: quickblox.appId,
    authKey: quickblox.authKey,
    authSecret: quickblox.authSecret,
    accountKey: quickblox.accountKey,
  };

  componentDidMount() {
    isReadyRef.current = false;
    // QB.settings
    //   .init(this.quickbloxAppSetting)
    //   .then((res) => {
    //     console.log('QuickBlox initialization successfull');
    //     QB.settings
    //       .initStreamManagement({
    //         autoReconnect: true,
    //         messageTimeout: 10,
    //       })
    //       .then((res) => {
    //         console.log('Stream established', res);
    //         QB.settings
    //           .enableAutoReconnect({enable: true})
    //           .then((res) => console.log('Quickblox auto reconnect enabled'))
    //           .catch((err) => console.error('Failed to auto reconnect'));
    //       })
    //       .catch((err) =>
    //         console.error('error while establishing stream', err),
    //       );
    //   })
    //   .catch((err) => {
    //     console.error('Quickblox initialization err', err);
    //   });
  }

  render() {
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <RootNavigator />
        {this.props.modal?.type === 1 && (
          <ConfirmationDialog
            message={this.props.modal?.message ? this.props.modal?.message : ''}
            modalVisible={
              this.props.modal?.visible ? this.props.modal.visible : false
            }
            onClose={() => {
              this.props.dispatch(
                MODAL_VISIBLE({
                  visible: false,
                  type: 1,
                  message: '',
                }),
              );
            }}
          />
        )}
        {this.props.modal?.type === 2 && (
          <ErrorDialog
            title={this.props.modal?.message ? this.props.modal?.message : ''}
            modalVisible={
              this.props.modal?.visible ? this.props.modal.visible : false
            }
            onClose={() => {
              this.props.dispatch(
                MODAL_VISIBLE({
                  visible: false,
                  type: 2,
                  message: '',
                }),
              );
            }}
          />
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.myReducer.modal,
});
export default connect(mapStateToProps)(App);
