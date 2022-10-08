import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './NetInfoStatus.styles';
import * as Animatable from 'react-native-animatable';
import {useNetInfo} from '@react-native-community/netinfo';
import NetInfo from '@react-native-community/netinfo';

const NetInfoStatus = () => {
  const [wasOffline, setWasOffline] = useState(false);
  const [online, setOnline] = useState(false);
  const [backOnline, setBackOnline] = useState(false);
  const netInfo = useNetInfo();
  // console.log(netIn);
  // const handleNetworkChange = (state) => {
  //   if (state.isConnected) {
  //     if (wasOffline) {
  //       setTimeout(() => {
  //         netInfo.isConnected === true && setBackOnline(false);
  //       }, 2000);

  //       setBackOnline(true);
  //     }
  //     setOnline(true);
  //   } else {
  //     if (online) {
  //       setOnline(false);
  //       setWasOffline(true);
  //     }
  //   }
  // };

  // NetInfo.addEventListener((state) => {
  //   // console.log('Connection type', state.type);
  //   // console.log('Is connected?', state.isConnected);
  //   handleNetworkChange(state);
  // });

  useEffect(() => {
    // console.log('Net is connected', netInfo.isConnected);
    if (netInfo.isConnected) {
      if (wasOffline) {
        setTimeout(() => {
          netInfo.isConnected === true && setBackOnline(false);
        }, 2000);

        setBackOnline(true);
      }
      setOnline(true);
    } else {
      if (online) {
        setOnline(false);
        setWasOffline(true);
      }
    }
  }, [netInfo]);

  return (
    <Animatable.View
      style={online ? styles.onlineContainer : styles.offlineContainer}
      animation="slideInLeft"
      duration={500}>
      {backOnline === true && (
        <Text style={styles.onlineText}>Back Online</Text>
      )}
      {!online && (
        <Text style={styles.offlineText}>Not connected to Internet</Text>
      )}
    </Animatable.View>
  );
};

export default NetInfoStatus;
