// import { select } from 'redux-saga/effects'
export const token = (state) => state.myReducer.user.token;
export const newsfeed = (state) => state.myReducer.newsfeed;
export const projects = (state) => state.myReducer.projects;
export const pastProjects = (state) => state.myReducer.pastProjects;
export const draftProjects = (state) => state.myReducer.draftProjects;
export const savedPosts = (state) => state.myReducer.savedPosts;
export const likedPosts = (state) => state.myReducer.likedPosts;
export const freelancers = (state) => state.myReducer.freelancers;
export const proposals = (state) => state.proposalReducer.proposals;
export const shortlistedProposals = (state) =>
  state.proposalReducer.shortlistedProposals;

export const quickbloxUser = (state) =>
  state.myReducer?.user?.employer_profile?.quickblox;
export const messages = (state) => state.messagesReducer.messages;
export const chatDialogs = (state) => state.messagesReducer.chatDialogs;
export const contacts = (state) => state.messagesReducer.contacts;
export const notifications = (state) => state.notificationReducer.notifications;
export const latestNotification = (state) =>
  state.notificationReducer.latestNotification;
export const myContracts = (state) => state.contractsReducer.myContracts;
export const myDisputes = (state) => state.disputeReducer.myDisputes;
export const userProfile = (state) => state.myReducer.user?.employer_profile;
export const freelancerByProject = (state) =>
  state.myReducer.freelancerByProject;
