import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import createSagaMiddleWare from 'redux-saga';
import myReducer from 'src/reducers/reducer';
import proposalReducer from 'src/reducers/proposal';
import messagesReducer from 'src/reducers/messages';
import notificationReducer from 'src/reducers/notification';
import contractsReducer from 'src/reducers/contracts';
import disputeReducer from 'src/reducers/dispute';
import chatReducer from 'src/reducers/chatReducer';

const appReducer = combineReducers({
  myReducer,
  proposalReducer,
  messagesReducer,
  notificationReducer,
  contractsReducer,
  disputeReducer,
  chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined;
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: 'PAIRROXZ_QAFF',
  storage: AsyncStorage,
};
export const sagaMiddleware = createSagaMiddleWare();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
);

// export default (state, action) =>
//   rootReducer(action.type === 'LOGOUT_USER' ? undefined : state, action);
