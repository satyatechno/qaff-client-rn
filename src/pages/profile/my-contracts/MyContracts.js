import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import {FETCH_CONTRACTS, FETCH_MORE_CONTRACTS} from 'src/actions/contracts';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

class MyContracts extends Component {
  state = {
    page: 1,
    onEndReachedCalledDuringMomentum: true,
  };
  componentDidMount() {
    this.props.dispatch(LOADER(true));
    this.props.dispatch(FETCH_CONTRACTS({page: 1}));
  }
  fetchMoredata(page1) {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.has_more_contracts_page === true) {
        this.props.dispatch(FETCH_MORE_CONTRACTS({page: page1 + 1}));
        this.setState({page: page1 + 1});
      }
    }
  }
  render() {
    const {myContracts, loading, has_more_contracts_page, t} = this.props;
    console.log('Contracts ', JSON.stringify(myContracts?.[0], null, 2));
    // console.log("Loading ", this.props.loading)
    return (
      <>
        <Header
          backButton={true}
          title={t('fileDispute.myContracts')}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.skyBlue} />
          </View>
        ) : myContracts.length === 0 ? (
          <View
            style={{
              height: Dimensions.get('screen').height * 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              style={{height: '50%', width: '50%'}}
              source={require('src/assets/images/no-jobs.png')}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 16,
                color: colors.appBlack,
                fontFamily: fonts.primary,
              }}>
              {t('fileDispute.noData')}
            </Text>
          </View>
        ) : (
          <FlatList
            data={myContracts}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                style={index === myContracts.length - 1 && {marginBottom: 30}}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  delayPressIn={0}
                  delayPressOut={0}
                  disabled={item?.dispute_id !== null}
                  onPress={() => {
                    this.props.navigation.navigate('DisputeFile', {
                      contractId: item?.id,
                    });
                  }}
                  style={{
                    backgroundColor: colors.defaultWhite,
                    padding: 10,
                    marginHorizontal: 10,
                    marginTop: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.skyBlue,
                      fontFamily: fonts.primarySB,
                      textAlign: 'left',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.skyBlue,
                      fontFamily: fonts.primarySB,
                      textAlign: 'left',
                    }}>
                    {item.contract_serial}
                  </Text>
                  {item?.dispute_id && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.appRed,
                        fontFamily: fonts.primarySB,
                        textAlign: 'left',
                      }}>
                      Disputed
                    </Text>
                  )}
                </TouchableOpacity>
                {has_more_contracts_page && index === myContracts?.length - 1 && (
                  <ActivityIndicator
                    color={colors.skyBlue}
                    size="large"
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                )}
              </View>
            )}
            keyExtractor={(item, index) => item.id.toString()}
            onEndReachedThreshold={0.2}
            onMomentumScrollBegin={() =>
              this.setState({onEndReachedCalledDuringMomentum: false})
            }
            onEndReached={() => {
              this.fetchMoredata(this.state.page);
            }}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  myContracts: state.contractsReducer.myContracts,
  has_more_contracts_page: state.contractsReducer.has_more_contracts_page,
});
export default connect(mapStateToProps)(withTranslation()(MyContracts));
