import React, {memo, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ExpiredTab from 'src/pages/jobs/hired/expired-tab/ExpiredTab';
import HiredTab from 'src/pages/jobs/hired/hired-tab/HiredTab';
import OffersTab from 'src/pages/jobs/hired/offers-tab/OffersTab';
import RejectedTab from 'src/pages/jobs/hired/rejected-tab/RejectedTab';
import colors from 'src/styles/texts/colors';
import Header from 'src/components/header/Header';
import {useSelector} from 'react-redux';
import {fetchStatistics} from 'src/services/http.service';
import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

function HiredTabs({navigation, route: {params}}) {
  console.log('pi', params?.projectId);
  const token = useSelector((state) => state.myReducer?.user?.token);
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    fetchStatistics(token, params?.projectId)
      .then((res) => setStatistics(res?.data?.data?.project_contract_count))
      .catch((err) => console.error('statistics', err));
  }, [params?.projectId]);

  const {t} = useTranslation();

  return (
    <>
      <Header
        title={t('hiredTopTab.hired')}
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
          name="OffersTab"
          component={OffersTab}
          options={{
            title: `${t('hiredTopTab.offers')}(${statistics?.offer ?? 0})`,
          }}
          initialParams={params}
        />
        <Tab.Screen
          name="HiredTab"
          component={HiredTab}
          options={{
            title: `${t('hiredTopTab.hired')}(${statistics?.hired ?? 0})`,
          }}
          initialParams={params}
        />
        <Tab.Screen
          name="RejectedTab"
          component={RejectedTab}
          options={{
            title: `${t('hiredTopTab.rejected')}(${statistics?.rejected ?? 0})`,
          }}
          initialParams={params}
        />
        <Tab.Screen
          name="ExpiredTab"
          component={ExpiredTab}
          options={{
            title: `${t('hiredTopTab.expired')}(${statistics?.expired ?? 0})`,
          }}
          initialParams={params}
        />
      </Tab.Navigator>
    </>
  );
}
export default memo(HiredTabs);
