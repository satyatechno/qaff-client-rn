import React from 'react';
import {Platform,View,Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from 'src/pages/home/Home';
import Messages from 'src/pages/messages/Messages';
import Description from 'src/pages/home/description/Description';
import myJobs from 'src/routes/JobsStack';
import MyProfile from 'src/routes/ProfileStack';
import colors from 'src/styles/texts/colors';

import mySearch from 'src/routes/SearchStack';
import ProjectDetails from 'src/pages/jobs/post-a-project/project-details/ProjectDetails';

import {Icon} from 'src/Icon';
import { useSelector } from 'react-redux';

const TabStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const myHome = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Description"
        component={Description}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ProjectDetails"
        component={ProjectDetails}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const Tabs = () => {
  const unreadMessage = useSelector(state=> state.chatReducer.unreadMessageCount)
  return (
    <Tab.Navigator
      initialRouteName="Search"
      tabBarOptions={{
        activeTintColor: colors.skyBlue,
        inactiveTintColor: colors.appGray4,
        keyboardHidesTabBar: true,
        labelStyle: {
          fontSize: 13,
          textAlign: 'center',
          paddingBottom: 5,
          fontWeight: '600',

          // color: colors.appGray,
        },
        tabStyle: {
          height: Platform.OS === 'android' ? 55 : 70,
          borderTopWidth: 0.5,
          borderTopColor: colors.appGray2,
          paddingVertical: 5,
        },
        // style: {height: Platform.OS === 'android' ? 70 : 100},
      }}>
      <Tab.Screen
        name="Jobs"
        component={myJobs}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="case0" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={mySearch}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search0" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={myHome}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="Home0" color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{width: 20, height: 20}}>
            {
              unreadMessage > 0 &&
            
            <View
            style={{ backgroundColor: colors.appRed,
              borderRadius: 10,
              justifyContent:'center',
              height: 20,
              width: 20,
              alignItems:'center',
              position: 'absolute',
              left: 10,
              zIndex:1,
              top: -5,
            
            }}
            >
              <Text
              style={{
                color: colors.defaultWhite, fontSize:12, textAlign: 'center'
              }}
              >{unreadMessage}</Text>
            </View>
      }
            <Icon name="email0" color={color} size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user0" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MyTabs = () => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="Home"
        component={Tabs}
        options={{headerShown: false}}
      />
    </TabStack.Navigator>
  );
};

export default MyTabs;
