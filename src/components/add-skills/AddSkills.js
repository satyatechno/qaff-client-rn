import React, {Component} from 'react';

import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchSkills, fetchPredefinedSkills} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
// import Checkbox from 'src/components/checkbox-default/CheckboxDefault';

import Header from 'src/components/header/Header';
// import {Icon} from 'src/Icon';
import Snackbar from 'react-native-snackbar';
import {LOADER, UPDATE_PROFILE} from 'src/actions/action';
import CustomButton from 'src/components/custom-button/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withTranslation} from 'react-i18next';

class AddSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      skills: [],
      subCategoryIds: [],
      skillsLoading: false,
      predefinedSkills: [],
      selectedSkills: [],
      hideSkills: false,
    };
    this.selectedCheckboxes = new Set();
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this),
    );
  }

  showSkills = () => {
    this.setState({skillsLoading: true});
    fetchSkills(this.state.search, JSON.stringify(this.state.subCategoryIds))
      .then((res) => {
        this.setState({skills: res.data?.data?.skills, skillsLoading: false});
        // console.log('skills', JSON.stringify(this.state.skills, null, 2));
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
        this.setState({skillsLoading: false});
      });
  };

  showPredefinedSkills = async () => {
    try {
      const res = await fetchPredefinedSkills(this.props.token);
      // console.log('skills', JSON.stringify(res.data, null, 2));
      this.setState({predefinedSkills: res.data?.data?.skills});
    } catch (err) {
      console.error('Couldnot fetch predefined skills', err);
    }
  };

  keyboardDidShow() {
    this.setState({hideSkills: true});
  }

  keyboardDidHide() {
    this.setState({hideSkills: false});
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidMount() {
    // let temp = [];
    // this.props?.userProfile?.categories?.map((category) =>
    //   temp.push(category.id),
    // );

    this.setState({
      subCategoryIds: this.props?.route?.params?.subCategoryIds?.length
        ? [...this.props?.route?.params?.subCategoryIds]
        : [],
    });
    if (this.props.route?.params?.previousSkills) {
      this.setState({
        selectedSkills: [...this.props.route?.params?.previousSkills],
      });
    }
    this.showPredefinedSkills();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.showSkills();
    }
    if (prevProps.loading === true && this.props.loading === false) {
      const {navigationScreenName} = this.props.route?.params;
      this.props.navigation.navigate(navigationScreenName);
    }
  }

  addSkills = (item, index) => {
    let doesSkillExist = this.state.selectedSkills.some(
      (skill) => skill === item.name,
    );
    if (doesSkillExist) {
      Snackbar.show({
        text: t('addSkills.alreadyAdded'),
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      let tempSkills = [...this.state.skills];
      tempSkills.splice(index, 1);
      this.setState({skills: [...tempSkills]});

      this.setState({
        selectedSkills: [item.name, ...this.state.selectedSkills],
      });
    }
  };

  handleSubmit = () => {
    if (this.state.selectedSkills.length < 3) {
      alert(t('addSkills.minSkills'));
    } else if (this.state.selectedSkills.length > 10) {
      alert(t('addSkills.maxSkills'));
    } else {
      let data = {
        skills: this.state.selectedSkills,
      };
      this.props.dispatch(LOADER(true));
      this.props.dispatch(UPDATE_PROFILE({data: data, modal: true}));
    }
  };

  removeSkills = (index) => {
    let currentSkills = [...this.state.selectedSkills];
    currentSkills.splice(index, 1);
    this.setState({selectedSkills: [...currentSkills]});
  };
  handlePredefinedSkills = (skillName) => {
    let temp = [...this.state.selectedSkills];
    let hasSkillInSelectedSkillsIndex = temp.findIndex(
      (skill) => skill === skillName,
    );
    hasSkillInSelectedSkillsIndex > -1
      ? temp.splice(hasSkillInSelectedSkillsIndex, 1)
      : // : temp.length > 9
        // ? alert('Maximum 10 skills are allowed')
        temp.push(skillName);
    this.setState({selectedSkills: temp});
  };

  render() {
    const {
      route: {
        params: {isEdit, navigationScreenName},
      },
      t,
    } = this.props;
    const {predefinedSkills, selectedSkills} = this.state;
    // console.log('kl', JSON.stringify(this.props.userProfile, null, 2));
    console.log('skills', this.state.subCategoryIds);
    let temp1 = predefinedSkills.map((y) => y.name);
    let temp = selectedSkills.filter((x) => !temp1.includes(x));

    console.log('temp', selectedSkills.length, temp.length);
    return (
      <>
        <Header
          title={t('addSkills.selectSkills')}
          backButton
          notificationButton
          navigation={this.props.navigation}
        />
        {!this.state.hideSkills && (
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              flexWrap: 'wrap',
              marginVertical: 5,
              marginTop: 15,
            }}>
            {predefinedSkills?.map((skill, i) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: !this.state.selectedSkills?.includes(
                    skill?.name,
                  )
                    ? colors.appGray4
                    : colors.appViolet,
                  marginEnd: 5,
                  marginBottom: 5,
                  padding: 5,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                key={i}
                onPress={() => this.handlePredefinedSkills(skill.name)}>
                <Text
                  style={{
                    color: colors.defaultWhite,
                    paddingEnd: 3,
                    textAlignVertical: 'center',
                    marginTop: -1,
                    fontSize: 12,
                  }}>
                  {skill.name}
                </Text>
                {!this.state.selectedSkills?.includes(skill.name) ? (
                  <Ionicons name="add-outline" color={colors.defaultWhite} />
                ) : (
                  <Ionicons name="checkmark" color={colors.defaultWhite} />
                )}
              </TouchableOpacity>
            ))}
            {temp?.map((skill, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.removeSkills(index)}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.appViolet,
                    padding: 5,
                    alignItems: 'center',
                    borderRadius: 10,
                    marginEnd: 5,
                    marginBottom: 5,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.defaultWhite,
                      fontSize: 12,
                    }}>
                    {skill}
                  </Text>
                  <Ionicons
                    name="close"
                    style={{marginHorizontal: 5}}
                    color={colors.defaultWhite}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <TextInput
          style={{
            borderWidth: 1.5,
            borderColor: colors.skyBlue,
            height: 40,
            paddingHorizontal: 10,
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            marginBottom: 5,
          }}
          onFocus={() => this.setState({hideSkills: true})}
          onBlur={() => this.setState({hideSkills: false})}
          placeholder={t('addSkills.searchSkill')}
          onChangeText={(text) => this.setState({search: text})}
        />

        <FlatList
          style={{height: '40%', marginBottom: 10}}
          keyboardShouldPersistTaps="handled"
          data={this.state.skills}
          contentContainerStyle={{
            marginHorizontal: 10,
            marginBottom: 10,
          }}
          ListEmptyComponent={
            this.state.skillsLoading ? (
              <ActivityIndicator
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                size="small"
                color={colors.skyBlue}
              />
            ) : (
              !this.state.skillsLoading &&
              this.state.search && (
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    marginTop: 20,
                  }}>
                  {t('addSkills.noMatching')}
                </Text>
              )
            )
          }
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.addSkills(item, index)}
                style={{
                  height: 40,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appGray1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{textAlignVertical: 'center', fontSize: 15}}>
                  {item.name}
                </Text>
                <Ionicons
                  name="add-outline"
                  color={colors.appGreen}
                  size={16}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index + Math.random().toString()}
        />

        <ScrollView
          style={{marginBottom: 10}}
          contentContainerStyle={{
            flexDirection: 'row',
            marginHorizontal: 10,
            flexWrap: 'wrap',
          }}>
          {/* {this.state.selectedSkills?.map((skill, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.removeSkills(index)}
              style={{
                flexDirection: 'row',
                backgroundColor: colors.appViolet,
                padding: 5,
                alignItems: 'center',
                borderRadius: 10,
                marginEnd: 5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  color: colors.defaultWhite,
                }}>
                {skill}
              </Text>
              <Ionicons
                name="close"
                style={{marginHorizontal: 5}}
                color={colors.defaultWhite}
              />
            </TouchableOpacity>
          ))} */}
        </ScrollView>
        {/* {!isEdit ? (
          <CustomButton
            handlePress={this.handleSubmit}
            isLoading={this.props.loading}
            style={{
              backgroundColor: colors.appGreen,
              marginHorizontal: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <Text style={{color: colors.defaultWhite, fontSize: 16}}>Save</Text>
          </CustomButton>
        ) : ( */}
        <TouchableOpacity
          // title="Next"
          onPress={() => {
            this.state.selectedSkills?.length > 10
              ? alert(t('addSkills.maxSkills'))
              : this.props.navigation.navigate(navigationScreenName, {
                  currentSkills: this.state.selectedSkills,
                });
          }}
          style={{
            backgroundColor: colors.skyBlue,
            marginHorizontal: 10,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: colors.defaultWhite, fontSize: 16}}>
            {t('addSkills.next')}
          </Text>
        </TouchableOpacity>
        {/* )} */}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  userProfile: state.myReducer.userProfile,
  loading: state.myReducer.loading,
  token: state.myReducer.user.token,
});
export default connect(mapStateToProps)(withTranslation()(AddSkills));
