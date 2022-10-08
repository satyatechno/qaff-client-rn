import React from 'react';
import { View, Text } from 'react-native';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';

const SentOffer = ({ route, navigation }) => {
    const { t } = useTranslation()
    return (
        <>
            <Header
                backButton={true}
                title={t("sentOffer.sent")}
                navigation={navigation}
                notificationButton={true}
            />
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                }}>
                <LottieView
                    style={{
                        width: 100,
                        height: 100,
                        //   backgroundColor: 'orange',
                    }}
                    source={require('./lottie-animation/offer-sent.json')}
                    autoPlay
                    loop={true}
                />

                <Text
                    style={{
                        fontSize: 16,
                        color: colors.appBlack,
                        fontFamily: fonts.primarySB,
                    }}>
                    {t("sentOffer.offerSentTo")}
                    {' '}
                    {route?.params?.freelancer?.first_name}
                    {' '}
                    {route?.params?.freelancer?.last_name}!
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.appBlack,
                        fontFamily: fonts.primary,
                        width: '70%',
                        textAlign: 'center',
                        marginTop: 5,
                    }}>
                    {t("sentOffer.weNotifyText")}
                    {' '}
                    {route?.params?.freelancer?.first_name}
                    {' '}
                    {route?.params?.freelancer?.last_name}
                    {' '}
                    {t("sentOffer.respondText")}
                </Text>
            </View>
        </>
    );
};

export default SentOffer;
