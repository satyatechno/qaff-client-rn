import {all, fork} from 'redux-saga/effects';

import {newsfeedActionWatcher} from './Newsfeed';
import {jobsActionWatcher} from './Jobs';
import {notificationActionWatcher} from './Notification';
import {profileActionWatcher} from './Profile';
import {proposalsActionWatcher} from './Proposals';
import {freelancerActionWatcher} from './Freelancers';
import {quickbloxActionWatcher} from './QuickBlox';
import {messagesActionWatcher} from './Messages';
import {contractsActionWatcher} from './Contracts';
import {disputeActionWatcher} from './Dispute';
import {invitationActionWatcher} from './invitation';

export default function* rootSaga() {
  yield all([
    fork(quickbloxActionWatcher),
    fork(newsfeedActionWatcher),
    fork(jobsActionWatcher),
    fork(notificationActionWatcher),
    fork(profileActionWatcher),
    fork(proposalsActionWatcher),
    fork(freelancerActionWatcher),
    fork(messagesActionWatcher),
    fork(contractsActionWatcher),
    fork(disputeActionWatcher),
    fork(invitationActionWatcher),
  ]);
}
