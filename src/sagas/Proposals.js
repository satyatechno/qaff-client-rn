import {put, takeLatest, select} from 'redux-saga/effects';
import {
  createContract,
  getProposals,
  shortUnshortProposal,
} from 'src/services/http.service';
import {token, proposals, shortlistedProposals} from 'src/selectors/Selector';
import Snackbar from 'react-native-snackbar';
import colors from 'src/styles/texts/colors';

function* fetchProposals(action) {
  try {
    const res = yield getProposals({
      token: yield select(token),
      id: action.data.id,
      page: action.data.page,
      type: action.data.type,
    });
    if (action.data?.type === 'all') {
      yield put({
        type: 'PROPOSALS',
        proposals: res.data.data.proposals.data,
        has_more_page: res.data.data.proposals.meta.has_more_pages,
      });
      yield put({
        type: 'LOADER',
        data: false,
      });
    } else {
      yield put({
        type: 'SHORTLISTED_PROPOSALS',
        proposals: res.data.data.proposals.data,
        has_more_page: res.data.data.proposals.meta.has_more_pages,
      });
      yield put({
        type: 'LOADER',
        data: false,
      });
    }
    // console.log('gggg', res.data.data?.proposals?.data);
  } catch (err) {
    console.log('fetch proposal error', err);
    yield put({
      type: 'LOADER',
      data: false,
    });
  }
}
function* fetchMoreProposals(action) {
  const proposal = yield select(proposals);
  const shortlistProposal = yield select(shortlistedProposals);

  try {
    const res = yield getProposals({
      token: yield select(token),
      id: action.data.id,
      page: action.data.page,
    });
    if (action.data?.type === 'all') {
      yield put({
        type: 'PROPOSALS',
        proposals: proposal.concat(res.data.data.proposals.data),
        has_more_page: res.data.data.proposals.meta.has_more_pages,
      });
    } else {
      yield put({
        type: 'SHORTLISTED_PROPOSALS',
        proposals: shortlistProposal.concat(res.data.data.proposals.data),
        has_more_page: res.data.data.proposals.meta.has_more_pages,
      });
    }
    // console.log('gggg', res.data.data.proposals);
  } catch (err) {
    console.log('myError', err);
  }
}
function* createContracts(action) {
  try {
    const res = yield createContract({
      token: yield select(token),
      id: action.data.id,
      data: action.data.data,
    });
    yield put({
      type: 'LOADER',
      data: false,
    });

    action.data.navigation.replace('SentOffer', {
      freelancer: action.data.freelancer,
    });
    console.log('response Create Contracts', res.data);
  } catch (err) {
    console.log('myError CreateContract', err.response.data);
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'MODAL_VISIBLE',
      data: {
        visible: true,
        type: 2,
        message: err.response.data.message,
      },
    });
  }
}

function* shortlistUnshortlistProposal(action) {
  const currentProposals = yield select(proposals);
  try {
    const res = yield shortUnshortProposal({
      token: yield select(token),
      id: action.data.id,
      type: action.data.type,
    });

    // console.log('current', JSON.stringify(currentProposals[0], null, 2));

    currentProposals.map((proposal) => {
      if (proposal?.id === action.data.id) {
        proposal.is_shortlisted = !proposal.is_shortlisted;
      }
    });

    let shortlistProposal = currentProposals.filter(
      (proposal) => proposal.is_shortlisted,
    );
    console.log(
      'shortlisted proposals',
      JSON.stringify(currentProposals, null, 2),
    );
    yield put({
      type: 'PROPOSALS',
      proposals: [...currentProposals],
      // has_more_page: res.data.data.proposals.meta.has_more_pages,
    });

    yield put({
      type: 'SHORTLISTED_PROPOSALS',
      proposals: [...shortlistProposal],
      // has_more_page: res.data.data.proposals.meta.has_more_pages,
    });

    // yield put({
    //   type: 'LOADER',
    //   data: false,
    // });

    // action.data.navigation.replace('SentOffer', {
    //   freelancer: action.data.freelancer,
    // });
    // console.log('response onShortlist proposal', res.data);
    Snackbar.show({
      text: res.data?.message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: colors.appGreen,
    });
  } catch (err) {
    console.log('proposal shortlist error', err?.response?.data);
    Snackbar.show({
      text: err.response?.data?.message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: colors.appRed,
    });
  }
}

export function* proposalsActionWatcher() {
  yield takeLatest('FETCH_PROPOSALS', fetchProposals);
  yield takeLatest('FETCH_MORE_PROPOSALS', fetchMoreProposals);
  yield takeLatest('CREATE_CONTRACTS', createContracts);
  yield takeLatest('SHORTLIST_UNSHORTLIST', shortlistUnshortlistProposal);
}
