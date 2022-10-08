import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Header from 'src/components/header/Header';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import {fetchCountriesList} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './SelectCountry.styles';

class SelectCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      searchCountry: [],
      isLoading: false,
      noMatchFound: false,
    };
  }
  componentDidMount() {
    this.setState({isLoading: true});
    fetchCountriesList()
      .then(async (countries) => {
        let tempCountries = countries.data.data.country_list?.map(
          (data, i) => ({
            name: `${data.name}(+${data.phonecode})`,
            iso_value: data.iso,
            value: data.name,
            id: i,
          }),
        );
        // console.log('Country', JSON.stringify(tempCountries, null, 2));
        await this.setState({countries: [...tempCountries]});
        this.setState({isLoading: false});
      })
      .catch((err) => {
        this.setState({isLoading: false});
        console.error('Couldnot get countries list', err);
      });
  }
  handleRadioSelect = (item) => {
    console.log('item', item);
    this.props.navigation.navigate('Location', {
      country: item,
      lastName: this.props.route.params?.lastName,
      firstName: this.props.route.params?.firstName,
    });
  };
  Searching = (text) => {
    if (text.length) {
      let Temp = [...this.state.countries].filter(
        (x) => x.value.toLowerCase().indexOf(text.toLowerCase()) !== -1,
      );
      // console.log('serached', JSON.stringify(Temp, null, 2));
      if (Temp.length) this.setState({noMatchFound: false});
      else this.setState({noMatchFound: true});
      this.setState({searchCountry: [...Temp]});
    }
  };
  render() {
    const {countries, searchCountry, noMatchFound} = this.state;
    return (
      <>
        <Header
          title="Edit Profile"
          backButton={true}
          navigation={this.props.navigation}
        />
        {this.state.isLoading ? (
          <ActivityIndicator
            color={colors.skyBlue}
            size="large"
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          />
        ) : (
          <View style={styles.container}>
            <Text style={styles.label}>Select a country</Text>
            <TextInput
              style={styles.input}
              placeholder="Search Country"
              onChangeText={(text) => {
                this.Searching(text);
              }}
            />
            {noMatchFound ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>No match found</Text>
              </View>
            ) : (
              <ScrollView>
                <RadioGroup
                  data={
                    searchCountry.length ? [...searchCountry] : [...countries]
                  }
                  onSelect={this.handleRadioSelect}
                />
              </ScrollView>
            )}
          </View>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
  token: state.myReducer.user?.token,
});
export default connect(mapStateToProps)(SelectCountry);
