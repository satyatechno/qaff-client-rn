import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddSkills from 'src/components/add-skills/AddSkills';
import PaymentWithSavedCards from 'src/components/payment-with-saved-cards/PaymentWithSavedCard';
import Contract from 'src/pages/jobs/contract/Contract';
import Escrow from 'src/pages/jobs/contract/escrow/Escrow';
import Payment from 'src/pages/jobs/contract/payment/Payment';
import PaymentDetails from 'src/pages/jobs/contract/payment/payment-details/PaymentDetails';
import PaymentMethod from 'src/pages/jobs/contract/payment/payment-method/PaymentMethod';
import SentOffer from 'src/pages/jobs/contract/sent-offer/SentOffer';
import Freelancer from 'src/pages/jobs/freelancer/Freelancer';
import Jobs from 'src/pages/jobs/Jobs';
import PortfolioDetails from 'src/pages/jobs/portfolio-details/PortfolioDetails';
import Portfolio from 'src/pages/jobs/portfolio/Portfolio';
import Budget from 'src/pages/jobs/post-a-project/budget/Budget';
import JobDescription from 'src/pages/jobs/post-a-project/job-description/JobDescription';
import JobTitle from 'src/pages/jobs/post-a-project/job-title/JobTitle';
import JobType from 'src/pages/jobs/post-a-project/job-type/JobType';
import MilestonePayment from 'src/pages/jobs/post-a-project/milestone-payments/MilestonePayment';
import ProjectAdd from 'src/pages/jobs/post-a-project/project-add/ProjectAdd';
import ProjectDetails from 'src/pages/jobs/post-a-project/project-details/ProjectDetails';
import Timeline from 'src/pages/jobs/post-a-project/timeline/Timeline';
import ProjectEdit from 'src/pages/jobs/project-edit/ProjectEdit';
import ProposalDetails from 'src/pages/jobs/proposals/proposal-details/ProposalDetails';
import Proposals from 'src/pages/jobs/proposals/Proposals';
import ViewProfile from 'src/pages/jobs/view-profile/ViewProfile';
import InviteToJob from 'src/pages/search/invite-to-job/InviteToJob';
import ShowJobs from 'src/pages/search/invite-to-job/show-jobs/ShowJobs';

const JobStack = createStackNavigator();

const myJobs = () => {
  return (
    <JobStack.Navigator screenOptions={{headerShown: false}}>
      <JobStack.Screen name="Jobs" component={Jobs} />
      <JobStack.Screen name="ProjectAdd" component={ProjectAdd} />
      <JobStack.Screen name="ProjectEdit" component={ProjectEdit} />
      <JobStack.Screen name="JobTitle" component={JobTitle} />
      <JobStack.Screen name="JobType" component={JobType} />
      <JobStack.Screen name="JobDescription" component={JobDescription} />
      <JobStack.Screen name="Budget" component={Budget} />
      <JobStack.Screen name="Timeline" component={Timeline} />
      <JobStack.Screen name="MilestonePayment" component={MilestonePayment} />
      <JobStack.Screen name="ProjectDetails" component={ProjectDetails} />
      <JobStack.Screen name="Proposals" component={Proposals} />
      <JobStack.Screen name="ViewProfile" component={ViewProfile} />
      <JobStack.Screen name="Portfolio" component={Portfolio} />
      <JobStack.Screen name="PortfolioDetails" component={PortfolioDetails} />
      <JobStack.Screen name="ProposalDetails" component={ProposalDetails} />
      <JobStack.Screen name="Contract" component={Contract} />
      <JobStack.Screen name="Payment" component={Payment} />
      <JobStack.Screen name="SentOffer" component={SentOffer} />
      <JobStack.Screen name="AddSkills" component={AddSkills} />
      <JobStack.Screen name="Freelancer" component={Freelancer} />
      <JobStack.Screen name="InviteToJob" component={InviteToJob} />
      <JobStack.Screen name="ShowJobs" component={ShowJobs} />
      <JobStack.Screen name="PaymentMethod" component={PaymentMethod} />
      <JobStack.Screen name="PaymentDetails" component={PaymentDetails} />
      <JobStack.Screen
        name="PaymentWithSavedCards"
        component={PaymentWithSavedCards}
      />
    </JobStack.Navigator>
  );
};

export default myJobs;
