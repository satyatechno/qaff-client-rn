import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import Header from 'src/components/header/Header';
import AcceptedInvitation from 'src/pages/jobs/invites/AcceptedInvitation';
import ExpiredInvitation from 'src/pages/jobs/invites/ExpiredInvitation';
import PendingInvitation from 'src/pages/jobs/invites/PendingInvitation';
import RejectedInvitation from 'src/pages/jobs/invites/RejectedInvitation';
import colors from 'src/styles/texts/colors';
const Tab = createMaterialTopTabNavigator();

function InvitationTabs({navigation, route: {params}}) {
  //   console.log('pi', params?.projectId);
  //   const token = useSelector((state) => state.myReducer?.user?.token);
  //   const [statistics, setStatistics] = useState({});
  //   useEffect(() => {
  //     fetchStatistics(token, params?.projectId)
  //       .then((res) => setStatistics(res?.data))
  //       .catch((err) => console.error('statistics', err));
  //   }, [params?.projectId]);
  //   console.log(' 👍 ', JSON.stringify(statistics, null, 2));

  const {t} = useTranslation();
  return (
    <>
      <Header
        title={t('invitationTopTab.invitation')}
        notificationButton
        backButton
        navigation={navigation}
      />
      <Tab.Navigator
        backBehavior="none"
        lazy={true}
        tabBarOptions={{
          activeTintColor: colors.skyBlue,
          inactiveTintColor: colors.appGray,

          labelStyle: {fontSize: 10, fontWeight: 'bold'},

          indicatorStyle: {
            borderBottomColor: colors.skyBlue,
            borderBottomWidth: 1.5,
          },
        }}>
        <Tab.Screen
          name="PendingInvitation"
          component={PendingInvitation}
          options={{title: t('invitationTopTab.pending')}}
          initialParams={params}
        />
        <Tab.Screen
          name="AcceptedInvitation"
          component={AcceptedInvitation}
          options={{title: t('invitationTopTab.accepted')}}
          initialParams={params}
        />
        <Tab.Screen
          name="RejectedInvitation"
          component={RejectedInvitation}
          options={{title: t('invitationTopTab.rejected')}}
          initialParams={params}
        />
        <Tab.Screen
          name="Expiredinvitation"
          component={ExpiredInvitation}
          options={{title: t('invitationTopTab.expired')}}
          initialParams={params}
        />
      </Tab.Navigator>
    </>
  );
}
export default memo(InvitationTabs);
