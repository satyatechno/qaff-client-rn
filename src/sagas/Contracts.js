import {put, takeLatest, select} from 'redux-saga/effects';
import {getContractsList} from 'src/services/http.service';
import {token, myContracts} from 'src/selectors/Selector';

function* fetchContractsList(action) {
  console.log('saga action contracts list', action.data);
  try {
    const res = yield getContractsList({
      token: yield select(token),
      page: action.data.page,
    });
    yield put({
      type: 'LOADER',
      data: false,
    });

    yield put({
      type: 'MY_CONTRACTS',
      contracts: res.data.data.contracts.data,
      has_more_contracts: res.data.data.contracts.meta.has_more_pages,
    });
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.log('fetch contracts', err);
  }
}
function* fetchMoreContractsList(action) {
  const active = yield select(myContracts);

  console.log('saga more contracts list', action.data);
  try {
    const res = yield getContractsList({
      token: yield select(token),
      page: action.data.page,
    });
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'MY_CONTRACTS',
      contracts: active.concat(res.data.data.contracts.data),
      has_more_contracts: res.data.data.contracts.meta.has_more_pages,
    });
  } catch (err) {
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.log('fetcMoreContracts', err.response.data);
  }
}
function* getContracts(action) {
  try {
    const res = yield getContractsList({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
      projectId: action.data.projectId,
    });
    console.log('get contracts list', action?.data?.type);
    if (action?.data?.type === 'pending') {
      if (action?.data?.isOfferRefreshing) {
        yield put({
          type: 'OFFER_REFRESHING',
          data: action?.data?.isOfferRefreshing,
        });
      }
      yield put({
        type: 'PENDING_CONTRACTS',
        contract: res.data?.data?.contracts,
        hasMorePendingContracts: res.data.data.contracts.meta.has_more_pages,
      });
    }
    if (action?.data?.type === 'active') {
      if (action?.data?.isHiredRefreshing) {
        yield put({
          type: 'HIRED_REFRESHING',
          data: action?.data?.isHiredRefreshing,
        });
      }
      yield put({
        type: 'ACTIVE_CONTRACTS',
        contract: res.data?.data?.contracts,
        hasMoreActiveContracts: res.data.data.contracts.meta.has_more_pages,
      });
    }
    if (action?.data?.type === 'rejected') {
      if (action?.data?.isRejectedRefreshing) {
        yield put({
          type: 'REJECTED_REFRESHING',
          data: action?.data?.isRejectedRefreshing,
        });
      }
      yield put({
        type: 'REJECTED_CONTRACTS',
        contract: res.data?.data?.contracts,
        hasMoreRejectedContracts: res.data.data.contracts.meta.has_more_pages,
      });
    }
    if (action?.data?.type === 'expired') {
      if (action?.data?.isExpiredRefreshing) {
        yield put({
          type: 'EXPIRED_REFRESHING',
          data: action?.data?.isExpiredRefreshing,
        });
      }
      yield put({
        type: 'EXPIRED_CONTRACTS',
        contract: res.data?.data?.contracts,
        hasMoreExpiredContracts: res.data.data.contracts.meta.has_more_pages,
      });
    }
  } catch (err) {
    console.log('getContracts Error', err);
  }
}

export function* contractsActionWatcher() {
  yield takeLatest('FETCH_CONTRACTS', fetchContractsList);
  yield takeLatest('FETCH_MORE_CONTRACTS', fetchMoreContractsList);
  yield takeLatest('GET_CONTRACTS', getContracts);
  // yield takeLatest('FETCH_CONTRACT_DETAILS', fetchContractDetails);
}
