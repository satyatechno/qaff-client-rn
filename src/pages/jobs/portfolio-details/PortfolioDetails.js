import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './PortfolioDetails.styles';
import Header from 'src/components/header/Header';
import {fetchPortfolioDetails} from 'src/services/http.service';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import colors from 'src/styles/texts/colors';
import {withTranslation} from 'react-i18next';
import ShimmerPortfolioDetails from 'src/components/shimmer/ShimmerPortfolioDetails';
import FastImage from 'react-native-fast-image';

export class PortfolioDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      PortfolioData: undefined,
      loading: true,
    };
  }
  componentDidMount() {
    this.props.dispatch(LOADER(true));
    fetchPortfolioDetails({
      token: this.props.token,
      portfolioId: this.props.route.params?.portfolioId,
      freelancerId: this.props.route.params?.freelancerId,
    })
      .then((res) => {
        // console.log("portfolio", res.data.data)
        this.setState({PortfolioData: res.data.data.portfolio});
        this.props.dispatch(LOADER(false));
      })
      .catch((err) => {
        console.log('error', err);
        this.props.dispatch(LOADER(false));
      });
  }
  render() {
    const {data} = this.props.route.params;
    const {t} = this.props;
    return (
      <>
        <Header
          title={t('portfolioDetails.portfolio')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        {this.props.loading ? (
          <ShimmerPortfolioDetails />
        ) : !this.state.PortfolioData ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text>No data found</Text>
          </View>
        ) : (
          <ScrollView style={styles.container}>
            <View style={styles.title_date_container}>
              <Text style={styles.title}>{this.state.PortfolioData.title}</Text>
              <Text style={styles.date}>{this.state.PortfolioData.date}</Text>
            </View>
            <Text style={styles.description}>
              {this.state.PortfolioData.description}
            </Text>
            {this.state.PortfolioData.images.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                onPress={() =>
                  this.props.navigation.navigate('ImageViewer', {
                    uri: this.state.PortfolioData.images,

                    id: item?.id,
                  })
                }>
                <FastImage
                  style={styles.main_image}
                  source={{uri: item.path}}
                  defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(PortfolioDetails));
