/**
 * @format
 */
import React from 'react';
import {ActivityIndicator, AppRegistry, LogBox} from 'react-native';
import 'src/locale/i18n';

import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/integration/react';

import {persistStore} from 'redux-persist';
import {store, sagaMiddleware} from './src/store';

import rootSaga from 'src/sagas/RootSaga';

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
LogBox.ignoreLogs([
  'Warning: componentWillReceiveProps has been renamed',
  'Animated: `useNativeDriver` was not specified.',
]);

const Loading = () => <ActivityIndicator size="large" color="blue" />;

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
