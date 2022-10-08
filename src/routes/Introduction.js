import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreatePassword from 'src/pages/authentication/create-account/create-password/CreatePassword';
import CreateAccount from 'src/pages/authentication/create-account/CreateAccount';
import EmailVerification from 'src/pages/authentication/create-account/email-verification/EmailVerification';
import CreateProfile from 'src/pages/authentication/create-profile/CreateProfile';
import Introduction1 from 'src/pages/authentication/introduction/Introduction';
import Login from 'src/pages/authentication/login/Login';
import TwoStepWithOtp from 'src/pages/authentication/login/two-step-verification/otp-verification/TwoStepWithOtp';
import SecurityQuestion from 'src/pages/authentication/login/two-step-verification/security-question/SecurityQuestion';
import CreateNewPassword from 'src/pages/authentication/recover-password/create-new-password/CreateNewPassword';
import OtpVerification from 'src/pages/authentication/recover-password/otp-varification/OtpVerification';
import RecoverPassword from 'src/pages/authentication/recover-password/RecoverPassword';
import Signup from 'src/pages/authentication/signup/Signup';
import SocialSignup from 'src/pages/authentication/social-signup/SocialSignup';
import Splash from 'src/pages/authentication/splash/Splash';
import Welcome from 'src/pages/authentication/welcome/Welcome';

const Introduction = createStackNavigator();

function Intro() {
  return (
    <Introduction.Navigator
      initialRouteName="Splash"
      screenOptions={{headerBackTitleVisible: false}}>
      <Introduction.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Introduction.Screen
        name="Introduction"
        component={Introduction1}
        options={{headerShown: false}}
      />
      <Introduction.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="Login"
        component={Login}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="Signup"
        component={Signup}
        options={{
          headerTransparent: true,

          headerTitle: '',
          headerTintColor: 'black',
        }}
      />
      <Introduction.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="CreatePassword"
        component={CreatePassword}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="RecoverPassword"
        component={RecoverPassword}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="OtpVerification"
        component={OtpVerification}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="SocialSignup"
        component={SocialSignup}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="TwoStepWithOtp"
        component={TwoStepWithOtp}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Introduction.Screen
        name="SecurityQuestion"
        component={SecurityQuestion}
        options={{
          headerTransparent: true,
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
    </Introduction.Navigator>
  );
}

export default Intro;
