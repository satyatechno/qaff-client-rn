import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ClippingRectangle,
  I18nManager,
} from 'react-native';
import styles from './Polls.styles';
import Header from 'src/components/header/Header';
import PollsProgress from 'src/components/polls-progress/PollsProgress';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/styles/texts/colors';
import CheckboxGroup from 'src/components/checkbox-group/CheckboxGroup';
import {polls, pollsSubmit} from 'src/services/http.service';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import LottieView from 'lottie-react-native';
import {withTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';

export class Polls extends Component {
  constructor(props) {
    super(props);
    this.selectedCheckboxes = new Set();

    this.state = {
      activePollNo: 0,
      questions: [],
      answers: [],
      pollId: undefined,
      loading: false,
    };
  }

  async componentDidMount() {
    this.props.dispatch(LOADER(true));
    const {
      data: {
        data: {questions},
      },
    } = await polls();
    console.log('POLLS', questions);
    this.props.dispatch(LOADER(false));
    this.setState({questions});
  }

  onRadioButtontSelected = async (item, id) => {
    // alert(item.name);
    await this.setState({answers: [item.name], pollId: id});
    console.log('answers', this.state.answers);
    console.log('pollId', this.state.pollId);
  };

  onSubmitQuestion = () => {
    if (!this.state.pollId) {
      alert(this.props.t('polls.pleaseChooseText'));
    } else {
      this.setState({loading: true});
      pollsSubmit({
        data: {question_id: this.state.pollId, answer_ids: this.state.answers},
        token: this.props.token,
      })
        .then((res) => {
          this.setState({
            activePollNo: this.state.activePollNo + 1,
            loading: false,
          });
          console.log('POll Submitted', res.data);
          this.setState({pollId: undefined});
        })

        .catch((err) => {
          console.error('Error whike submitting polls', err);
          this.setState({loading: false});
        });
    }
  };

  toggleCheckbox = async (data, id) => {
    if (this.selectedCheckboxes.has(data.name)) {
      this.selectedCheckboxes.delete(data.name);
    } else {
      this.selectedCheckboxes.add(data.name);
    }
    // for (const checkbox of this.selectedCheckboxes) {
    //   console.log('checkbox', checkbox);
    // }
    await this.setState({answers: [...this.selectedCheckboxes], pollId: id});
    console.log('answers', this.state.answers);
    console.log('pollId', this.state.pollId);
  };
  onSkip = () => {
    this.setState({activePollNo: this.state.activePollNo + 1});
  };

  render() {
    const {questions} = this.state;
    const {isLoading, t} = this.props;
    if (isLoading) {
      return (
        <>
          <Header
            title={t('polls.polls')}
            backButton={true}
            navigation={this.props.navigation}
            notificationButton={true}
          />
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator color={colors.skyBlue} size="large" />
          </View>
        </>
      );
    }
    if (!questions.length) {
      return (
        <>
          <Header
            title={t('polls.polls')}
            backButton={true}
            navigation={this.props.navigation}
            notificationButton={true}
          />
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text>{t('polls.noData')}</Text>
          </View>
        </>
      );
    }

    const CURRENT_POLL = [questions[this.state.activePollNo]];

    return (
      <View style={{flex: 1, backgroundColor: colors.appBackground}}>
        <Header
          title={t('polls.polls')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        {this.state.activePollNo >= 0 && this.state.activePollNo < 10 && (
          <PollsProgress progress={(this.state.activePollNo + 1) * 10} />
        )}

        {this.state.activePollNo < 10 ? (
          <>
            <FlatList
              data={CURRENT_POLL}
              renderItem={({item, index}) => {
                // console.log('options', item.options);
                return (
                  <View style={styles.container}>
                    {/* <PollsProgress progress={item.pollNo * 10} /> */}
                    <Text style={styles.pollTitle}>{item.title}</Text>
                    {/* <View style={styles.radioGroupContainer}>
                      {item?.options?.map((value, i) => {
                        item.type === 'multiple' ? (
                          <CheckboxGroup
                            handleCheckboxChange={this.toggleCheckbox}
                            label={value.name}
                            key={value.id}
                          />
                        ) : (
                          <RadioGroup
                            data={value}
                            onSelect={this.onRadioButtontSelected}
                          />
                        );
                      })}
                    </View>
                    <View style={styles.radioGroupContainer}>
                      {item.type === 'multiple' ? (
                        <CheckboxGroup
                          handleCheckboxChange={this.toggleCheckbox}
                          data={item.options}
                        />
                      ) : (
                        <RadioGroup
                          data={item.options}
                          onSelect={this.onRadioButtontSelected}
                        />
                      )}
                    </View> */}
                    <View style={styles.radioGroupContainer}>
                      {item.type === 'multiple' ? (
                        item.options.map((value, i) => {
                          return (
                            <CheckboxGroup
                              handleCheckboxChange={this.toggleCheckbox}
                              data={value}
                              id={item.id}
                              key={value.id}
                            />
                          );
                        })
                      ) : (
                        <RadioGroup
                          data={item.options}
                          onSelect={this.onRadioButtontSelected}
                          id={item.id}
                        />
                      )}
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => item.id.toString()}
            />

            <View style={styles.footer}>
              <TouchableOpacity onPress={this.onSkip} style={styles.skipButton}>
                <Text style={styles.skipButtonText}>{t('polls.skip')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onSubmitQuestion}
                disabled={this.state.loading}
                style={styles.submitButton}>
                {!this.state.loading ? (
                  <>
                    <Text style={styles.submitButtonText}>
                      {t('polls.submitQuestion')}
                    </Text>

                    <Ionicons
                      name="checkmark-outline"
                      size={25}
                      color={colors.defaultWhite}
                      style={
                        I18nManager.isRTL
                          ? {paddingStart: 15}
                          : {paddingEnd: 15}
                      }
                    />
                  </>
                ) : (
                  <ActivityIndicator color={colors.defaultWhite} size="large" />
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>{t('polls.thankYou')}</Text>
            {/*  <FastImage 
              style={styles.greetingImage}
              source={require('src/components/confirmation-dialog/images/modal-confirmation.png')}
            /> */}
            <LottieView
              style={styles.greetingImage}
              source={require('src/assets/lottie-animation/confirmation-new.json')}
              autoPlay
              loop
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.myReducer.loading,
  token: state.myReducer.user.token,
});

export default connect(mapStateToProps)(withTranslation()(Polls));
