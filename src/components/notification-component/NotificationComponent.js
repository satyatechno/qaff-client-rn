import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {connect} from 'react-redux';
import {
  FETCH_MORE_NOTIFICATIONS,
  FETCH_NOTIFICATIONS,
  UNREAD_NOTIFICATION,
} from 'src/actions/notification';
import fontelloConfig from 'src/icon-configs/config.json';
import {readNotification} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import Header from '../header/Header';
import styles from './NotificationComponent.styles';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
export const {width, height} = Dimensions.get('window');

class NotificationComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      page: 1,
      onEndReachedCalledDuringMomentum: true,
      isRefreshing: false,
    };
  }
  componentDidMount() {
    readNotification({token: this.props.token})
      .then((res) => {
        this.props.dispatch(UNREAD_NOTIFICATION(0));
        console.log('notification read', res.data);
      })
      .catch((err) => console.error('notification', err));
  }
  LoadMoreNotification = (Page1) => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true});
      if (this.props.has_more_notifications_page === true) {
        this.props.dispatch(
          FETCH_MORE_NOTIFICATIONS({
            page: Page1 + 1,
          }),
        );
        this.setState({page: Page1 + 1});
      }
    }
  };
  onRefresh = async () => {
    this.setState({isRefreshing: true, page: 1});
    await this.props.dispatch(FETCH_NOTIFICATIONS());
    this.setState({isRefreshing: false});
  };

  handleNotificationPress = (item) => {
    const {navigation} = this.props;
    const {type} = item;
    const {data} = item;
    console.log('object', type);
    switch (type) {
      case 'App\\Notifications\\ProposalReceiveNotification':
      case 'App\\Notifications\\ProposalUpdatedNotification':
        navigation.navigate('ProposalDetails', {
          id: data?.proposal_id,
          projectId: data?.project_id,
        });
        break;
      case 'App\\Notifications\\Job\\JobPostedNotification':
        navigation.navigate('ProjectDetails', {
          projectId: data?.project_id,
        });
        break;
      case 'App\\Notifications\\Contract\\RequestMilestonePaymentNotification':
      case 'App\\Notifications\\Contract\\OfferAcceptedNotification':
      case 'App\\Notifications\\Contract\\OfferRejectedNotification':
        navigation.navigate('ContractDetails', {
          contractId: data?.contract_id,
        });
        break;
        // case 'App\\Notifications\\Invitation\\RecieveNotification':
        //   navigation.navigate('InvitationDetails', {
        //     id: data?.invitation_id,
        //   });
        break;

      default:
        console.log('Default');
    }
  };

  renderFooter = () => {
    const {isLoadingMore} = this.props;
    return isLoadingMore ? (
      <ActivityIndicator
        size="large"
        style={{alignSelf: 'center', marginVertical: 10}}
        color={colors.skyBlue}
      />
    ) : null;
  };
  render() {
    const {notifications, latestNotification, t} = this.props;
    console.log('hhh', this.props.notifications);
    return (
      <View style={{flex: 1}}>
        <Header
          backButton
          title={t('notification.notification')}
          notificationButton
          navigation={this.props.navigation}
          transparent={false}
        />

        {!notifications.length && !latestNotification.length ? (
          <View style={styles.body}>
            <View style={styles.imageContainer}>
              <LottieView
                style={styles.image}
                source={require('./lottie-animation/empty-notification.json')}
                autoPlay
                loop
              />
              <Text style={styles.imageContainerText}>
                {t('notification.noData')}
              </Text>
              <Text style={styles.imageContainerText}>
                {' '}
                {t('notification.moment')}
              </Text>
            </View>
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <SectionList
              sections={[
                {
                  title: t('notification.latest'),
                  data: latestNotification,
                },
                {
                  title: t('notification.earlier'),
                  data: notifications,
                },
              ]}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.handleNotificationPress(item)}
                  activeOpacity={0.5}
                  delayPressIn={0}
                  delayPressOut={0}
                  style={styles.sectionItem}>
                  {/* {item.icon === 'project' ? ( */}
                  <CustomIcon
                    name={'project'}
                    color={colors.skyBlue}
                    size={30}
                    style={{margin: 15, marginStart: 8}}
                  />
                  {/* ) : (
                          <Ionicons
                            name={item.icon}
                            color={item.iconColor}
                            size={35}
                            style={{ margin: 15, marginEnd: 10 }}
                          />
                        )} */}
                  <View style={styles.sectionItemTitleView}>
                    <Text style={styles.sectionItemTitle}>{item.message}</Text>
                    <Text style={styles.sectionItemTime}>
                      {moment.unix(item.created_at).format('DD MMM, h:mm a')}
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => alert('Coming Soon...')}
                    style={{alignItems: 'flex-end', marginStart: 10}}>
                    <Ionicons
                      name="ellipsis-horizontal"
                      color={colors.appGray}
                      size={25}
                      style={{marginTop: 5}}
                    />
                  </TouchableOpacity> */}
                </TouchableOpacity>
              )}
              renderSectionHeader={({section: {title, data}}) => {
                if (data.length > 0)
                  return <Text style={styles.sectionHeader}>{title}</Text>;
              }}
              ItemSeparatorComponent={() => (
                <View style={styles.saperator}></View>
              )}
              onEndReachedThreshold={0.2}
              onEndReached={() => this.LoadMoreNotification(this.state.page)}
              onMomentumScrollBegin={() =>
                this.setState({onEndReachedCalledDuringMomentum: false})
              }
              renderSectionFooter={this.renderFooter}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefreshing}
            />
          </View>
        )}
      </View>
      // </Animatable.View>
    );
  }
}
const mapStateToProps = (state) => ({
  notifications: state.notificationReducer.notifications,
  notification_loading: state.notificationReducer.notification_loading,
  has_more_notifications_page:
    state.notificationReducer.has_more_notifications_page,
  latestNotification: state.notificationReducer.latestNotification,
  isLoadingMore: state.notificationReducer.isLoadingMore,
  token: state.myReducer.user.token,
});
export default connect(mapStateToProps)(
  withTranslation()(NotificationComponent),
);
