import React, {useState, createRef, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import Logo from 'src/assets/images/Logo.png';
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './Introduction.styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import colors from 'src/styles/texts/colors';
import 'src/locale/en.json';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import FastImage from 'react-native-fast-image';

function Introduction({navigation}) {
  const {t, i18n} = useTranslation();
  const swiper = useRef(null);
  const [swipeIndex, setSwipeIndex] = useState(0);
  //   const swiper = createRef();

  const [screenData, setScreenData] = useState([
    //TODO: add t() in all objects
    {
      index: 0,
      logo: Logo,
      heading: t('intro.header1'),
      description: t('intro.desc1'),
    },
    {
      index: 1,
      logo: Logo,
      heading: t('intro.header2'),
      description: t('intro.desc2'),
    },
    {
      index: 2,
      logo: Logo,
      heading: t('intro.header3'),
      description: t('intro.desc3'),
    },
    {
      index: 3,
      logo: Logo,
      heading: t('intro.header4'),
      description: t('intro.desc4'),
    },
    {
      index: 4,
      logo: Logo,
      heading: t('intro.header5'),
      description: t('intro.desc5'),
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Welcome');
          }}>
          <Text style={styles.skip}>
            {swipeIndex?.index !== 4 ? t('intro.skip') : t('intro.next')}
          </Text>
        </TouchableOpacity>
        <View>
          {/* <TouchableOpacity
            style={{
              marginStart: 20,
              backgroundColor: 'gray',
              paddingVertical: 10,
              width: '40%',
            }}
            onPress={() => {
              i18n
                .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
                .then(() => {
                  I18nManager.forceRTL(i18n.language === 'ar');
                  Platform.OS === 'android' && RNRestart.Restart();
                });
            }}>
            <Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>
              Change Language
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <SwiperFlatList
        showPagination={true}
        paginationActiveColor={colors.skyBlue}
        paginationDefaultColor={colors.defaultGray}
        // ref={swiper}
        // ref={(ref) => (swiper = ref)}
        data={screenData}
        onChangeIndex={(index) => {
          setSwipeIndex(index);
        }}
        renderItem={({item, index}) => (
          <View style={styles.child}>
            <FastImage style={styles.logo} source={item.logo} />
            <Text style={styles.header}>{item.heading}</Text>

            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => JSON.stringify(item.index)}
      />
      <View>
        {/* <View>
          {swipeIndex?.index === 0 ? (
            <TouchableOpacity
              style={styles.arrowForward}
              //   onPress={changeScreen(i)}
            >
              <FontAwesomeIcon
                icon={faAngleRight}
                size={32}
                color={colors.appGray}
              />
            </TouchableOpacity>
          ) : swipeIndex?.index === 4 ? (
            <TouchableOpacity style={styles.arrowBackward}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                size={32}
                color={colors.appGray}
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.arrowBackward}>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  size={32}
                  color={colors.appGray}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowForward}>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size={32}
                  color={colors.appGray}
                />
              </TouchableOpacity>
            </>
          )}
        </View> */}
      </View>
    </SafeAreaView>
  );
}

export default Introduction;
