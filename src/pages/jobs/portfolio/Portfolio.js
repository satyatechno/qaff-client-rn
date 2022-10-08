import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './Portfolio.styles';
import Header from 'src/components/header/Header';
import colors from 'src/styles/texts/colors';
import {fetchPortfolio, projectDetails} from '../../../services/http.service';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import {withTranslation} from 'react-i18next';
import ShimmerPortfolio from 'src/components/shimmer/ShimmerPorfolio';
import FastImage from 'react-native-fast-image';

class Portfolio extends Component {
  constructor(props) {
    super();
    this.state = {
      PortfolioData: [],
    };
  }
  componentDidMount() {
    this.props.dispatch(LOADER(true));
    fetchPortfolio({
      token: this.props.token,
      id: this.props.route.params?.id,
    })
      .then((res) => {
        // console.log("portfolio", res.data.data.portfolio.data)
        this.setState({PortfolioData: res.data.data.portfolio.data});
        this.props.dispatch(LOADER(false));
      })
      .catch((err) => {
        console.log('error', err);
        this.props.dispatch(LOADER(false));
      });
  }
  render() {
    const {t} = this.props;
    return (
      <>
        <StatusBar translucent={false} backgroundColor={colors.skyBlue} />
        <Header
          title={t('portfolio.portfolio')}
          backButton={true}
          navigation={this.props.navigation}
          notificationButton={true}
        />
        <View style={styles.container}>
          {this.props.loading ? (
            Array(3)
              .fill('')
              .map((x, i) => <ShimmerPortfolio key={i} />)
          ) : (
            <FlatList
              data={this.state.PortfolioData}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.portfolioContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('PortfolioDetails', {
                          data: item,
                          portfolioId: item.id,
                          freelancerId: this.props.route.params?.id,
                        })
                      }>
                      <FastImage
                        style={styles.image}
                        source={{
                          uri: item.image,
                        }}
                        defaultSource={require('src/assets/images/imagePlaceHolder.png')}
                      />
                      <View style={styles.portfolioInfoContainer}>
                        <Text style={styles.title}>{item.title} </Text>
                        <Text style={styles.date}>{item.date}</Text>
                      </View>
                      <Text style={styles.description}>{item.description}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(withTranslation()(Portfolio));
