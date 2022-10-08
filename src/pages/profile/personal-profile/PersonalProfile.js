import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  I18nManager,
  Dimensions,
} from 'react-native';
import Header from 'src/components/header/Header';
import styles from './PersonalProfile.styles';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import colors from 'src/styles/texts/colors';
const CustomIcon = createIconSetFromFontello(fontelloConfig);
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import ActionSheet from 'react-native-actionsheet';

import {updateProfile} from 'src/services/http.service';

import {
  UPDATE_PROFILE,
  FETCH_NEWSFEED,
  LOADER,
  MODAL_VISIBLE,
} from 'src/actions/action';

import LottieView from 'lottie-react-native';
import Divider from 'src/components/divider/Divider';
import {withTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import {updateQbUser} from 'src/helpers/updateQuickbloxUser';
import QB from 'quickblox-react-native-sdk';

class PersonalProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionListColor: 0,
      listColor: [colors.appYellow, colors.appViolet, colors.appBlue],
      isLoading: false,
      profileImage: '',
      buttonType: 'Edit',
      disable: false,
      gender: '',
      isSaveButtonVisible: false,
      updateLoading: false,
    };
  }
  PROFILE_ITEMS = [
    {
      title: this.props.t('personalProfile.general'),
      sectionId: 1,
      color: colors.appViolet,
      data: [
        {
          iconName: 'project',
          listName: this.props.t('personalProfile.firstName'),
          listId: 1,
        },
        {
          iconName: 'project',
          listName: this.props.t('personalProfile.lastName'),
          listId: 2,
        },
      ],
    },
    {
      title: this.props.t('personalProfile.contacts'),
      sectionId: 2,
      data: [
        {
          iconName: 'messages',
          listName: this.props.t('personalProfile.email'),
          listId: 3,
        },
        {
          iconName: 'phone-outline',
          listName: this.props.t('personalProfile.mobile'),
          listId: 4,
        },
      ],
    },
    {
      title: 'Other',
      sectionId: 3,
      data: [
        {
          iconName: 'human-male-female',
          listName: this.props.t('personalProfile.gender'),
          listId: 5,
        },
        {
          iconName: 'location',
          listName: this.props.t('personalProfile.location'),
          listId: 6,
        },
        {
          iconName: 'gift-outline',
          listName: this.props.t('personalProfile.birthday'),
          listId: 7,
        },
      ],
    },
  ];

  onSave = () => {
    // this.setState({ gender: this.state.gender.toLowerCase() })
    this.setState({updateLoading: true});
    // this.props.dispatch(LOADER(true));
    const fd = new FormData();
    let firstName = this.props.route.params?.first_name
      ? this.props.route.params?.first_name
      : this.props.profileData?.first_name;

    let lastName = this.props.route.params?.last_name
      ? this.props.route.params?.last_name
      : this.props.profileData?.last_name;

    fd.append('first_name', firstName);

    fd.append('last_name', lastName);
    (this.state.gender || this.props.profileData?.gender) &&
      fd.append(
        'gender',
        this.state.gender
          ? this.state.gender.toLowerCase()
          : this.props.profileData.gender,
      );

    (this.props.route.params?.birthday || this.props.profileData?.dob) &&
      fd.append(
        'dob',
        this.props.route.params?.birthday
          ? this.props.route.params?.birthday
          : this.props.profileData?.dob,
      );

    fd.append(
      'country',
      this.props.route.params?.location
        ? this.props.route.params?.location
        : this.props.profileData?.country,
    );

    fd.append('language', 'en');

    this.state.profileImage &&
      fd.append('profile_image', {
        name: this.state.profileImage.name,
        type: this.state.profileImage.type,
        uri:
          Platform.OS === 'android'
            ? this.state.profileImage.uri
            : this.state.profileImage.uri.replace('file://', ''),
      });

    // console.log('image', this.state.profileImage);
    console.log('update Profile form data', fd);

    updateProfile(fd, this.props.token)
      .then((res) => {
        updateQbUser(firstName, lastName, this.props.quickblox.login);

        this.props.dispatch(UPDATE_PROFILE(res.data.data.profile));

        this.props.dispatch(FETCH_NEWSFEED({page: 1}));

        this.setState({updateLoading: false});

        this.props.dispatch(
          MODAL_VISIBLE({
            visible: true,
            type: 1,
            message: res.data.message,
          }),
        );
        this.setState({
          buttonType: 'Edit',
          disable: false,
          isSaveButtonVisible: false,
        });
      })
      .catch((error) => {
        this.setState({updateLoading: false});

        console.log('err', error);
        console.log('errdata', error?.response?.data);
        console.log('errmsg', error?.response?.data?.message);
        // this.props.dispatch(LOADER(false));
        this.setState({
          buttonType: 'Edit',
          disable: false,
          isSaveButtonVisible: false,
        });
      });
  };

  Item = ({title, section, t}) => {
    const listColor =
      section.sectionId === 2
        ? colors.appViolet
        : section.sectionId === 3
        ? colors.appBlue
        : colors.appYellow;

    return (
      <TouchableOpacity
        style={{marginEnd: 15}}
        disabled={this.state.disable}
        onPress={() => this.handleProfileNavigation(title)}>
        <View style={styles.listContainer}>
          {title.listId === 5 || title.listId === 7 || title.listId === 4 ? (
            <MCIcon name={title.iconName} size={20} color={listColor} />
          ) : (
            <CustomIcon name={title.iconName} size={18} color={listColor} />
          )}
          <Text style={styles.listItem}>{title.listName}</Text>
          <Text>{[section.length]}</Text>
          <Text style={[styles.value, {color: listColor}]}>
            {title.listId === 1 &&
              (this.props.route.params?.first_name
                ? this.props.route.params?.first_name
                : this.props.profileData?.first_name)}
            {title.listId === 2 &&
              (this.props.route.params?.last_name
                ? this.props.route.params?.last_name
                : this.props.profileData?.last_name)}
            {title.listId === 3 && this.props.profileData?.email}
            {title.listId === 6 &&
              (!this.props.profileData?.country
                ? this.props.t('personalProfile.notSet')
                : `${this.props.profileData?.city},${this.props.profileData?.country}`)}
            {title.listId === 5 &&
              (this.state.gender
                ? this.state.gender
                : this.props.profileData?.gender === 'male'
                ? this.props.t('personalProfile.male')
                : this.props.profileData?.gender === 'female'
                ? this.props.t('personalProfile.female')
                : this.props.t('personalProfile.notSet'))}
            {title.listId === 7 &&
              (this.props.route.params?.birthday
                ? this.props.route.params?.birthday
                : this.props.profileData?.dob
                ? this.props.profileData?.dob
                : this.props.t('personalProfile.notSet'))}
            {title.listId === 4 &&
              (this.props.profileData?.phone
                ? '+' +
                  this.props.profileData?.country_code +
                  ' ' +
                  this.props.profileData?.phone
                : this.props.t('personalProfile.notSet'))}
          </Text>

          <CustomIcon
            name={I18nManager.isRTL ? 'back' : 'next'}
            size={18}
            color={listColor}
          />
        </View>
      </TouchableOpacity>
    );
  };

  handleProfileNavigation = (title) => {
    if (title.listId === 1) {
      this.props.navigation.navigate('EditProfile', {
        first_name: this.props.route.params?.first_name
          ? this.props.route.params?.first_name
          : this.props.profileData?.first_name,
      });
    } else if (title.listId === 2) {
      this.props.navigation.navigate('EditProfile', {
        last_name: this.props.route.params?.last_name
          ? this.props.route.params?.last_name
          : this.props.profileData?.last_name,
      });
    } else if (title.listId === 5) {
      this.ActionSheetGender.show();
    } else if (title.listId === 7) {
      this.props.navigation.navigate('EditProfile', {
        birthday: this.props.route.params?.birthday
          ? this.props.route.params?.birthday
          : this.props.profileData?.dob
          ? this.props.profileData?.dob
          : '  ',
      });
    } else if (title.listId === 3) {
      this.props.navigation.navigate('ChangeEmail', {type: 'email'});
    } else if (title.listId === 4) {
      this.props.navigation.navigate('ChangeEmail', {type: 'mobile'});
    } else if (title.listId === 6) {
      this.props.navigation.navigate('Location', {
        firstName: this.props.profileData?.first_name,
        lastName: this.props.profileData?.last_name,
      });
    }
  };
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  onActionSheetGenderItemPress = (index) => {
    if (index == 0) {
      this.setState({
        gender: 'Male',
      });
    } else if (index == 1) {
      this.setState({
        gender: 'Female',
      });
    }
  };

  onActionSheetItemPress = (index) => {
    if (index == 0) {
      ImagePicker.openCamera({
        width: 720,
        height: 720,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.9,
      }).then((image) => {
        this.setState({
          profileImage: {
            name: Math.random().toString(),
            uri: image.path,
            type: image.mime,
          },
        });
      });
    } else if (index == 1) {
      ImagePicker.openPicker({
        width: 720,
        height: 720,
        cropping: true,
        includeBase64: false,
      }).then((image) => {
        this.setState({
          profileImage: {
            name: Math.random().toString(),
            uri: image.path,
            type: image.mime,
          },
        });
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps?.route?.params !== this.props?.route?.params ||
      prevState.gender !== this.state.gender
    ) {
      this.setState({isSaveButtonVisible: true});
    }
  }

  render() {
    const {t} = this.props;

    return (
      <>
        <Header
          backButton={true}
          navigation={this.props.navigation}
          title={t('personalProfile.editProfile')}
          notificationButton={true}
        />
        <View style={styles.container}>
          <SectionList
            style={{flex: 1, marginBottom: 20}}
            sections={this.PROFILE_ITEMS}
            stickySectionHeadersEnabled={false}
            stickyHeaderIndices={[0]}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={() => (
              <>
                {/* <TouchableOpacity
                  style={styles.editContainer}
                  disabled={this.state.disable}
                  onPress={() => this.ActionSheet.show()}>
                  <FastImage
                    style={styles.editimage}
                    source={require('./images/edit.png')}
                    defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                    fadeDuration={300}
                  />
                
                </TouchableOpacity> */}
                {this.props.profileData?.profile_image === null &&
                this.state.profileImage === '' ? (
                  <LottieView
                    style={styles.profileImage}
                    source={
                      this.props.profileData?.gender === ''
                        ? require('../lottie-animation/male.json')
                        : this.props.profileData?.gender === 'male'
                        ? require('../lottie-animation/male.json')
                        : require('../lottie-animation/female.json')
                    }
                    autoPlay
                    loop
                  />
                ) : (
                  <FastImage
                    style={[styles.profileImage, {borderRadius: 70}]}
                    source={
                      this.state.profileImage?.uri
                        ? {uri: this.state.profileImage?.uri}
                        : {uri: this.props.profileData?.profile_image}
                    }
                    defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                  />
                )}

                <Text style={styles.profileOwnerName}>
                  {this.props.route.params?.first_name
                    ? this.props.route.params?.first_name
                    : this.props.profileData?.first_name}{' '}
                  {this.props.route.params?.last_name
                    ? this.props.route.params?.last_name
                    : this.props.profileData?.last_name}
                </Text>
                {this.props.profileData?.country !== '' && (
                  <View style={styles.locationContainer}>
                    <CustomIcon
                      name="location"
                      color={colors.appGray}
                      size={15}
                    />
                    <Text
                      style={
                        styles.locationName
                      }>{`${this.props.profileData?.city},${this.props.profileData?.country}`}</Text>
                  </View>
                )}
              </>
            )}
            renderItem={({item, section}) => {
              return <this.Item title={item} section={section} t={t} />;
            }}
            ItemSeparatorComponent={() => (
              <Divider
                style={{
                  height: 1,
                  backgroundColor: colors.appGray1,
                  marginHorizontal: 15,
                }}
              />
            )}
            SectionSeparatorComponent={() => (
              <Divider style={{height: 1, backgroundColor: colors.appGray1}} />
            )}
            renderSectionHeader={({section: {title, sectionId}}) => (
              <View style={styles.listItemHeader}>
                <Text
                  style={
                    sectionId === 2
                      ? [styles.listItemHeaderText, {color: colors.appViolet}]
                      : sectionId === 3
                      ? [styles.listItemHeaderText, {color: colors.appBlue}]
                      : styles.listItemHeaderText
                  }>
                  {title}
                </Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={{justifyContent: 'center'}}>
                {this.state.isSaveButtonVisible && (
                  <TouchableOpacity
                    style={[
                      styles.Button,
                      // this.state.buttonType === 'Save' && {
                      //   backgroundColor: colors.skyBlue,
                      // },
                    ]}
                    onPress={() => {
                      // this.state.buttonType === 'Edit'
                      //   ? this.setState({buttonType: 'Save', disable: false})
                      //   : this.onSave();
                      this.onSave();
                    }}>
                    {this.props.loading ? (
                      <ActivityIndicator
                        color={colors.defaultWhite}
                        size={30}
                      />
                    ) : (
                      <Text style={styles.buttonText}>
                        {/* {this.state.buttonType === 'Save'
                          ? t('personalProfile.save')
                          : t('personalProfile.edit')} */}
                        {t('personalProfile.save')}
                        <MCIcon name="check" size={22} />
                        {/* {this.state.buttonType === 'Save' && (
                          <MCIcon name="check" size={22} style={{margin: 20}} />
                        )} */}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={t('personalProfile.chooseOption')}
          options={[
            t('personalProfile.takePhoto'),
            t('personalProfile.fromGallery'),
            t('personalProfile.cancel'),
          ]}
          cancelButtonIndex={2}
          onPress={(index) => {
            this.onActionSheetItemPress(index);
          }}
        />
        <ActionSheet
          ref={(o) => (this.ActionSheetGender = o)}
          title={'Gender'}
          options={['Male', 'Female', 'Cancel']}
          cancelButtonIndex={2}
          onPress={(index) => {
            this.onActionSheetGenderItemPress(index);
          }}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profileData: state.myReducer.user?.employer_profile,
  token: state.myReducer.user?.token,
  loading: state.myReducer.loading,
  quickblox: state.myReducer?.user?.employer_profile?.quickblox,
});

export default connect(mapStateToProps)(withTranslation()(PersonalProfile));
