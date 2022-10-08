import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Header from 'src/components/header/Header';
import {displayJobs} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';

class ShowJobs extends Component {
  state = {
    search: '',
    jobs: [],
    loading: false,
    showEmptyComponent: false,
  };

  fetchJobs = () => {
    displayJobs({
      type: 'progress',
      token: this.props?.token,
      search: this.state.search,
    })
      .then((res) => {
        this.setState({jobs: res.data?.data?.projects?.data});
        this.setState({loading: false});
      })
      .catch((err) => {
        console.error(
          'Couldnot fetch jobs',
          JSON.stringify(err?.response?.data, null, 2),
        );
        this.setState({loading: false});
      });
  };

  componentDidMount() {
    this.fetchJobs();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({loading: true});
      this.fetchJobs();
    }
    if (prevState.loading && !this.state.loading) {
      this.setState({showEmptyComponent: true});
    }
  }

  handleJobSelection = (job) => {
    this.props.navigation.navigate('InviteToJob', {
      job: job,
    });
  };
  render() {
    const {jobs, loading, showEmptyComponent} = this.state;
    const {navigation, t} = this.props;
    // console.log('jj', JSON.stringify(jobs, null, 2));
    // if (loading) {
    //     return ;
    //   }
    return (
      <>
        <Header
          title={t('showjobs.searchJobs')}
          backButton
          navigation={navigation}
        />
        <View>
          <TextInput
            style={{
              marginTop: 10,
              borderWidth: 1,
              height: 40,
              marginHorizontal: 10,
              borderColor: colors.skyBlue,
              borderRadius: 10,
              paddingStart: 10,
            }}
            placeholder={t('showjobs.searchForJobs')}
            onChangeText={(search) => this.setState({search})}
          />
          {loading ? (
            <ActivityIndicator
              size={25}
              color={colors.skyBlue}
              style={{marginTop: 20}}
            />
          ) : (
            <FlatList
              data={jobs}
              ListEmptyComponent={
                showEmptyComponent && (
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 20,
                    }}>
                    No relavant jobs found
                  </Text>
                )
              }
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.handleJobSelection(item)}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.appGray1,
                    marginHorizontal: 10,
                    paddingVertical: 10,
                  }}>
                  <Text style={{color: colors.appViolet}}>
                    {item?.project_serial}
                  </Text>
                  <Text style={{fontSize: 16}}>{item?.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item?.id.toString()}
            />
          )}
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
});

export default connect(mapStateToProps)(withTranslation()(ShowJobs));
