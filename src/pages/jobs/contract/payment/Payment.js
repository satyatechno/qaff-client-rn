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
import {
  createContract,
  fetchPaymentCards,
  paymentWithSavedCard,
} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
import styles from './Payment.styles';
import LottieView from 'lottie-react-native';

export class Payment extends Component {
  state = {
    option: 1,
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
    const {projectId, fd, project} = this.props?.route?.params;
    const {paymentCards, selectedCardIndex} = this.state;
    const {navigation} = this.props;
    this.setState({buttonLoading: true});
    // this.props.dispatch(LOADER(true));
    // this.props.dispatch(
    //   CREATE_CONTRACTS({
    //     id: this.props.route.params?.projectId,
    //     data: this.props.route.params?.fd,
    //     navigation: this.props.navigation,
    //     freelancer: this.props.route.params?.freelancer,
    //   }),
    // );
    createContract({
      data: fd,
      id: projectId,
      token: this.props.token,
    })
      .then((data) => {
        // this.props.dispatch(HIRE_REDIRECT(true));
        parseInt(project?.amount_in_escrow) === 0
          ? paymentWithSavedCard({
              token: this.props.token,
              data: {
                registration_id:
                  paymentCards[selectedCardIndex]?.registration_id,
                order_id: data?.data?.data?.order.id,
              },
            })
              .then((res) => {
                const response = res.data?.data?.redirect;
                let tempUrl = `${response.url}`;
                response.parameters.map((item, index) => {
                  index === 0 &&
                    (tempUrl = tempUrl.concat(`?${item.name}=${item.value}`));
                  index > 0 &&
                    (tempUrl = tempUrl.concat(`&${item.name}=${item.value}`));
                });
                // window.location.href = tempUrl;
                navigation.pop(3);
                navigation.navigate('PaymentWebView', {
                  url: tempUrl,
                });
              })
              .catch((err) => {
                navigation.navigate('ContractDetails', {
                  contractId: data?.data?.data?.contract?.id,
                });

                console.log('Payment err', err);
              })
          : navigation.navigate('ContractDetails', {
              contractId: data?.data?.data?.contract?.id,
            });
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        console.log(err);
        this.setState({apiLoader: false});
      })
      .finally(() => this.setState({buttonLoading: false}));
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
        {/* <FastImage
          source={require('./images/payment.png')}
          style={styles.image}
        /> */}
        <LottieView
          style={styles.image}
          source={require('src/assets/lottie-animation/payment-method.json')}
          autoPlay
          loop
        />
        <Text style={styles.paymentText}>
          {t('payment.choosePaymentMethod')}
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
            <Text style={styles.buttonText}>{t('payment.pay')}</Text>
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
            <Text style={{fontFamily: fonts.primary}}>
              {t('payment.noSavedCard')}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('PaymentMethod')}
              style={{
                backgroundColor: colors.appGreen,
                width: '40%',
                height: 36,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.defaultWhite,
                  fontFamily: fonts.primary,
                }}>
                {t('payment.addCard')}
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
          title={t('payment.payment')}
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
                  {t('payment.expiry')}: {item?.data?.card?.expiryMonth}/
                  {item?.data?.card?.expiryYear}
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
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(Payment));
