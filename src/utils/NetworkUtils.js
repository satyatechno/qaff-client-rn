import NetInfo from '@react-native-community/netinfo';

export function addNetworkCheckListener(callback) {
  NetInfo.addEventListener('connectionChange', callback);
}

export function removeNetworkCheckListener() {
  NetInfo.isConnected.removeEventListener('connectionChange');
}

export function isNetworkAvailable(callback) {
  NetInfo.isConnected.fetch().then((isConnected) => {
    callback(isConnected);
  });
}
