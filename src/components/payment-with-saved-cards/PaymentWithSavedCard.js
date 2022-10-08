import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import Header from 'src/components/header/Header';
import {fetchPaymentCards} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './PaymentWithSavedCards.styles';

export class PaymentWithSavedCards extends Component {
  state = {
    paymentCards: null,
    loading: false,
    selectedCardIndex: 0,
    buttonLoading: false,
  };
  Check = () => {
    return (
      <View
        style={[
          styles.check,
          this.state.option === 2 && {backgroundColor: colors.defaultWhite},
        ]}>
        <Icon name="check" size={30} color={colors.appGray1} />
      </View>
    );
  };
  onAccept = () => {
    const {t} = this.props;
    const {paymentCards, selectedCardIndex} = this.state;
    if (!paymentCards?.length) {
      alert(t('paymentSavedCard.pleasAdd'));
    } else {
      this.props.navigation.navigate('Escrow', {
        contractData: this.props?.route?.params?.contractData,
        paymentCards: paymentCards,
        selectedCardIndex: selectedCardIndex,
      });
    }
  };

  getSavedCards = () => {
    this.setState({loading: true});
    fetchPaymentCards({token: this.props.token})
      .then((res) => {
        console.log(' 👍 ', JSON.stringify(res.data, null, 2));
        this.setState({paymentCards: res.data?.data?.saved_methods});
      })
      .catch((err) => {
        console.error('Paymenet cards fetching err', err);
      })
      .finally(() => this.setState({loading: false}));
  };

  componentDidMount() {
    this.getSavedCards();
  }

  componentDidUpdate(prevProps) {
    const {success} = this.props?.route?.params;
    if (prevProps.route?.params?.success !== success) {
      this.getSavedCards();
    }
  }

  listHeader = () => {
    const {t} = this.props;
    return (
      <View style={styles.imageView}>
        <FastImage
          source={require('./images/payment.png')}
          style={styles.image}
        />
        <Text style={styles.paymentText}>
          {t('paymentSavedCard.choosePaymentMethod')}
        </Text>
      </View>
    );
  };
  listFooter = () => {
    const {t} = this.props;
    const {paymentCards} = this.state;
    return paymentCards?.length ? (
      <TouchableOpacity
        disabled={this.state.buttonLoading}
        onPress={this.onAccept}
        style={[styles.button, {flex: 1}]}>
        {this.state.buttonLoading ? (
          <ActivityIndicator color={colors.defaultWhite} size={30} />
        ) : (
          <>
            <Text style={styles.buttonText}>{t('paymentSavedCard.next')}</Text>
            <Icon name="check" size={16} color={colors.defaultWhite} />
          </>
        )}
      </TouchableOpacity>
    ) : null;
  };

  listEmpty = () => {
    const {navigation, t} = this.props;
    const {loading} = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!loading ? (
          <>
            <Text style={{fontFamily: fonts.primarySB}}>
              {t('paymentSavedCard.noCards')}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PaymentMethod', {
                  myNavigation: 'PaymentWithSavedCards',
                })
              }
              style={{
                backgroundColor: colors.appGreen,
                width: '40%',
                height: 36,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 16, color: colors.defaultWhite}}>
                {t('paymentSavedCard.addCard')}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <ActivityIndicator size="large" color={colors.skyBlue} />
        )}
      </View>
    );
  };
  render() {
    const {t} = this.props;
    const {paymentCards, selectedCardIndex} = this.state;

    return (
      <>
        <Header
          title={t('paymentSavedCard.savedCards')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />

        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          style={styles.container}
          data={paymentCards}
          keyExtractor={(item) => item?.id?.toString()}
          ListEmptyComponent={this.listEmpty}
          ListHeaderComponent={this.listHeader}
          ListFooterComponent={this.listFooter}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.setState({selectedCardIndex: index})}
                style={{
                  backgroundColor:
                    selectedCardIndex === index
                      ? colors.appGreen
                      : colors.appGray,
                  padding: 10,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 16, color: colors.defaultWhite}}>
                    ****
                    {item?.data?.card?.last4Digits}
                  </Text>
                  <Text style={{fontSize: 16, color: colors.defaultWhite}}>
                    {' '}
                    ({item?.payment_brand})
                  </Text>
                </View>
                <Text style={{fontSize: 16, color: colors.defaultWhite}}>
                  {t('paymentSavedCard.expiry')} {item?.data?.card?.expiryMonth}
                  /{item?.data?.card?.expiryYear}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
});

export default connect(mapStateToProps)(
  withTranslation()(PaymentWithSavedCards),
);
