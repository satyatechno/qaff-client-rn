import QB from 'quickblox-react-native-sdk';
import Snackbar from 'react-native-snackbar';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  chatDialogs,
  contacts,
  freelancerByProject,
  freelancers,
  token,
} from 'src/selectors/Selector';
import {
  addContacts,
  removeContacts,
  showContacts,
} from 'src/services/http.service';

function* fetchContacts() {
  try {
    yield put({
      type: 'SET_CONTACT_LOADING',
      data: true,
    });
    const {
      data: {
        data: {contacts},
      },
    } = yield showContacts({token: yield select(token)});
    yield put({
      type: 'CONTACTS',
      data: contacts,
    });
    yield put({
      type: 'SET_CONTACT_LOADING',
      data: false,
    });
    yield put({
      type: 'SET_CONTACT_REFRESHING',
      data: false,
    });
  } catch (err) {
    yield put({
      type: 'SET_CONTACT_LOADING',
      data: false,
    });
    yield put({
      type: 'SET_CONTACT_REFRESHING',
      data: false,
    });
    console.error('Couldnot fetch contacts', err);
  }
}

function* addContact(action) {
  let allFreelancers = yield select(freelancers);
  let allFreelancersByProject = yield select(freelancerByProject);
  const existingContacts = yield select(contacts);

  try {
    yield put({
      type: 'ADD_CONTACT_LOADING',
      data: true,
    });
    yield put({
      type: 'ADD_CONTACT_ID',
      data: action.data,
    });

    let newContact = yield addContacts({
      token: yield select(token),
      data: {
        profile_type: 'freelancer',
        profile_id: action.data,
      },
    });

    if (allFreelancers.length > 0) {
      yield allFreelancers.map((freelancer) => {
        if (freelancer.id === action?.data) {
          freelancer.is_contact = true;
          freelancer.contact_id = newContact?.data?.data?.contact?.id;
        }
      });
      yield put({
        type: 'UPDATE_FREELANCER',
        freelancers: [...allFreelancers],
      });
    }
    if (allFreelancersByProject.length > 0) {
      yield allFreelancersByProject.map((freelancer) => {
        if (freelancer.id === action?.data) {
          freelancer.is_contact = true;
          freelancer.contact_id = newContact?.data?.data?.contact?.id;
        }
      });
      yield put({
        type: 'UPDATE_FREELANCER_BY_PROJECT',
        data: [...allFreelancersByProject],
      });
    }
    yield put({
      type: 'CONTACTS',
      data: [...existingContacts, newContact.data.data.contact],
    });
    yield put({
      type: 'ADD_CONTACT_LOADING',
      data: false,
    });
    yield put({
      type: 'ADD_CONTACT_ID',
      data: null,
    });

    Snackbar.show({
      text: 'Contact added successfully',
      duration: Snackbar.LENGTH_SHORT,
    });
  } catch (err) {
    yield put({
      type: 'ADD_CONTACT_LOADING',
      data: false,
    });
    console.error('Couldnot add contact', JSON.stringify(err, null, 2));
  }
}
function* removeFromContact(action) {
  let allFreelancers = yield select(freelancers);
  let allFreelancersByProject = yield select(freelancerByProject);
  const existingContacts = yield select(contacts);

  try {
    yield put({
      type: 'REMOVE_CONTACT_LOADING',
      data: true,
    });
    yield put({
      type: 'ADD_CONTACT_ID',
      data: action.data?.freelancerId,
    });
    yield removeContacts({
      token: yield select(token),
      id: action?.data?.contactId,
    });

    if (allFreelancers.length > 0) {
      yield allFreelancers.map((freelancer) => {
        if (freelancer.id === action?.data?.freelancerId) {
          freelancer.is_contact = false;
          freelancer.contact_id = 0;
        }
      });
      yield put({
        type: 'UPDATE_FREELANCER',
        freelancers: [...allFreelancers],
      });
    }

    if (allFreelancersByProject.length > 0) {
      console.log(allFreelancersByProject.length);
      yield allFreelancersByProject.map((freelancer) => {
        if (freelancer.id === action?.data?.freelancerId) {
          freelancer.is_contact = false;
          freelancer.contact_id = 0;
        }
      });
      yield put({
        type: 'UPDATE_FREELANCER_BY_PROJECT',
        data: [...allFreelancersByProject],
      });
    }
    if (existingContacts.length > 0) {
      let newContacts = [...existingContacts];
      let index = yield newContacts.findIndex(
        (item) => item.profile.id === action?.data?.freelancerId,
      );
      if (index !== -1) {
        yield newContacts.splice(index, 1);
      }

      yield put({
        type: 'CONTACTS',
        data: [...newContacts],
      });
    }
    yield put({
      type: 'REMOVE_CONTACT_LOADING',
      data: false,
    });

    Snackbar.show({
      text: 'Contact removed successfully',
      duration: Snackbar.LENGTH_SHORT,
    });
  } catch (err) {
    yield put({
      type: 'REMOVE_CONTACT_LOADING',
      data: false,
    });
    console.error('Couldnot remove contact', JSON.stringify(err, null, 2));
  }
}

function* updateChatDialog(action) {
  const newChatDialogs = yield select(chatDialogs);
  try {
    yield put({
      type: 'CHAT_DIALOG',
      data: [...newChatDialogs, action.data],
    });
  } catch (err) {
    console.error('Couldnot update chat dialog', err);
  }
}
function* uploadFile(action = {}) {
  const {url} = action.data;
  try {
    let progress = yield call(QB.content.subscribeUploadProgress, {url});
    console.log('file upload success', progress);

    const file = yield call(QB.content.upload, {url, public: false});
    // yield put(fileUploadSucess(file))
  } catch (e) {
    // yield put(fileUploadFail(e.message))
  } finally {
    yield call(QB.content.unsubscribeUploadProgress, {url});
  }
}

export function* messagesActionWatcher() {
  yield takeLatest('FETCH_CONTACTS', fetchContacts);
  yield takeLatest('ADD_CONTACT', addContact);
  yield takeLatest('REMOVE_CONTACT', removeFromContact);
  yield takeLatest('UPDATE_CHAT_DIALOG', updateChatDialog);
  yield takeLatest('FILE_UPLOAD_SUCCESS', uploadFile);
}
