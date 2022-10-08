import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from 'src/pages/search/Search';
import Categories from 'src/pages/search/categories/Categories';
import ViewProfile from 'src/pages/jobs/view-profile/ViewProfile';
import Portfolio from 'src/pages/jobs/portfolio/Portfolio';
import PortfolioDetails from 'src/pages/jobs/portfolio-details/PortfolioDetails';
import InviteToJob from 'src/pages/search/invite-to-job/InviteToJob';
import ShowJobs from 'src/pages/search/invite-to-job/show-jobs/ShowJobs';

const SearchStack = createStackNavigator();

const mySearch = () => {
  return (
    <SearchStack.Navigator screenOptions={{headerShown: false}}>
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="Categories" component={Categories} />
      <SearchStack.Screen name="ViewProfile" component={ViewProfile} />
      <SearchStack.Screen name="Portfolio" component={Portfolio} />
      <SearchStack.Screen
        name="PortfolioDetails"
        component={PortfolioDetails}
      />
      <SearchStack.Screen name="InviteToJob" component={InviteToJob} />
      <SearchStack.Screen name="ShowJobs" component={ShowJobs} />
    </SearchStack.Navigator>
  );
};

export default mySearch;
