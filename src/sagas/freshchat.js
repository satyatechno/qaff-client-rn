import {put, takeLatest, select} from 'redux-saga/effects';
import {FreshchatUser} from 'react-native-freshchat-sdk';
import {Freshchat} from 'react-native-freshchat-sdk';
import {userProfile} from 'src/selectors/selector';
function* setupFreshchatUser(action) {
  let {profile} = yield select(userProfile);
  try {
    let freshchatUser = new FreshchatUser();
    freshchatUser.firstName = profile.first_name;
    freshchatUser.lastName = profile.last_name;
    freshchatUser.email = profile.email;
    freshchatUser.phoneCountryCode = `+${profile.country_code}` ?? '';
    freshchatUser.phone = profile.phone ?? '';
    Freshchat.setUser(freshchatUser, (error) => {
      console.error('Freshchat set user error', error);
    });
  } catch (err) {
    console.error('setup freshchat action error', err);
  }
}
export function* freshchatActionWatcher() {
  yield takeLatest('SETUP_FRESHCHAT_USER', setupFreshchatUser);
}
