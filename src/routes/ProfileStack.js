import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from 'src/pages/profile/Profile';
import Polls from 'src/pages/profile/polls/Polls';
import Saved from 'src/pages/profile/saved/Saved';
import MyInterest from 'src/pages/profile/my-interest/MyInterest';
import PersonalProfile from 'src/pages/profile/personal-profile/PersonalProfile';
import EditProfile from 'src/pages/profile/personal-profile/Edit-Profile/EditProfile';
import ProjectDetails from 'src/pages/jobs/post-a-project/project-details/ProjectDetails';
import Settings from '../pages/profile/settings/Settings';
import PasswordSecurity from '../pages/profile/settings/password-security/PasswordSecurity';
import MembersPermissions from '../pages/profile/settings/members-permissions/MembersPermissions';
import TaxInformation from '../pages/profile/settings/tax-information/TaxInformation';
import PrivacyPolicy from 'src/pages/profile/settings/privacy-policy/PrivacyPolicy';
import TermsOfService from 'src/pages/profile/settings/terms-of-service/TermsOfService';
import Accessibility from 'src/pages/profile/settings/accessibility/Accessibility';
import NotificationSettings from 'src/pages/profile/settings/notification-settings/NotificationSettings';
import ShowSecurityQuestion from 'src/pages/profile/settings/password-security/show-security-question/ShowSecurityQuestion';
import SecurityQuestion from 'src/pages/profile/settings/password-security/sequrity-question/SecurityQuestion';
import UpdatePassword from 'src/pages/profile/set-new-password/UpdatePassword';
import MyContracts from 'src/pages/profile/my-contracts/MyContracts';
import DisputeFile from 'src/pages/profile/dispute-file/DisputeFile';
import MyDispute from 'src/pages/profile/my-dispute/MyDispute';
import Payment from 'src/pages/profile/payment/Payment';
import PaymentMethod from 'src/pages/profile/payment/payment-method/PaymentMethod';
import PaymentDetails from 'src/pages/profile/payment/payment-details/PaymentDetails';
import ChangeEmail from 'src/pages/profile/personal-profile/change-email/ChangeEmail';
import OtpVerification from 'src/pages/profile/personal-profile/change-email/otp-verification/OtpVerification';
import Location from 'src/pages/profile/personal-profile/location/Location';
import SelectCountry from 'src/pages/profile/personal-profile/location/select-country/SelectCountry';
import Description from 'src/pages/home/description/Description';

const ProfileStack = createStackNavigator();
const MyProfile = () => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Polls" component={Polls} />
      <ProfileStack.Screen name="Saved" component={Saved} />
      <ProfileStack.Screen name="MyInterest" component={MyInterest} />
      <ProfileStack.Screen name="PersonalProfile" component={PersonalProfile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="ProjectDetails" component={ProjectDetails} />
      <ProfileStack.Screen name="Description" component={Description} />
      <ProfileStack.Screen name="Settings" component={Settings} />
      <ProfileStack.Screen
        name="PasswordSecurity"
        component={PasswordSecurity}
      />
      <ProfileStack.Screen
        name="MembersPermissions"
        component={MembersPermissions}
      />
      <ProfileStack.Screen name="TaxInformation" component={TaxInformation} />
      <ProfileStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <ProfileStack.Screen name="TermsOfService" component={TermsOfService} />
      <ProfileStack.Screen name="Accessibility" component={Accessibility} />
      <ProfileStack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
      />
      <ProfileStack.Screen name="MyContracts" component={MyContracts} />
      <ProfileStack.Screen name="DisputeFile" component={DisputeFile} />
      <ProfileStack.Screen name="MyDispute" component={MyDispute} />
      <ProfileStack.Screen name="Payment" component={Payment} />
      <ProfileStack.Screen name="PaymentMethod" component={PaymentMethod} />
      <ProfileStack.Screen name="PaymentDetails" component={PaymentDetails} />
      <ProfileStack.Screen name="ChangeEmail" component={ChangeEmail} />
      <ProfileStack.Screen name="OtpVerification" component={OtpVerification} />
      <ProfileStack.Screen name="Location" component={Location} />
      <ProfileStack.Screen
        name="SecurityQuestion"
        component={SecurityQuestion}
      />
      <ProfileStack.Screen
        name="ShowSecurityQuestion"
        component={ShowSecurityQuestion}
      />
      <ProfileStack.Screen name="SelectCountry" component={SelectCountry} />
      <ProfileStack.Screen name="UpdatePassword" component={UpdatePassword} />
    </ProfileStack.Navigator>
  );
};

export default MyProfile;
