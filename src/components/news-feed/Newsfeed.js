import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './Newsfeed.styles';
import colors from 'src/styles/texts/colors';
import PropTypes from 'prop-types';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from 'src/icon-configs/config.json';
import {saveUnsave} from 'src/services/http.service';
import {connect} from 'react-redux';
import {likeUnlike} from 'src/services/http.service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {UPDATE_SAVE_STATUS} from '../../actions/action';
import Divider from '../divider/Divider';
import {} from 'i18next';
import {withTranslation} from 'react-i18next';
const CustomIcon = createIconSetFromFontello(fontelloConfig);

class Newsfeed extends Component {
  render() {
    const {t} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (this.props.userId === this.props.user?.id) {
              this.props.navigation.navigate('ProjectDetails', {
                projectId: this.props.id,
                showModal: false,
              });
            } else {
              this.props.navigation.navigate('Description', {
                title: this.props.title,
                time: this.props.time,
                description: this.props.description,
              });
            }
          }}>
          <View style={styles.header}>
            {/* <Image style={styles.avatar} source={{uri: this.props.avatar}} /> */}
            <View style={styles.headerInfo}>
              <View style={styles.titleBudgetContainer}>
                <Text style={styles.title}>{this.props.title}</Text>

                <Text style={styles.budget}>{this.props.budget}</Text>
              </View>
              <View>
                <Text style={styles.time}>{this.props.time}</Text>
              </View>
              {/* <Text style={styles.user}>{this.props.user.name}</Text> */}
              {this.props.user.country ? (
                <View style={styles.headerRightBottomLeft}>
                  <CustomIcon
                    name="location"
                    color={colors.appGray}
                    size={14}
                  />
                  <Text style={styles.locationName}>
                    {this.props.user.city}, {this.props.user.country}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <Divider style={{height: 1, backgroundColor: colors.appGray1}} />
          <View style={styles.body}>
            <View style={styles.bodyContainer}>
              <Text numberOfLines={3} style={styles.description}>
                {this.props.description}
              </Text>
              {this.props.description.length > 140 ? (
                <TouchableOpacity
                  onPress={() => {
                    if (this.props.userId === this.props.user?.id) {
                      this.props.navigation.navigate('ProjectDetails', {
                        projectId: this.props.id,
                        showModal: false,
                      });
                    } else {
                      this.props.navigation.navigate('Description', {
                        title: this.props.title,
                        time: this.props.time,
                        description: this.props.description,
                      });
                    }
                  }}>
                  <Text style={styles.readMoreText}>{t('home.readMore')}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
        <Divider style={{height: 1, backgroundColor: colors.appGray1}} />
        <View style={styles.footer}>
          <View style={styles.footerContents}>
            <TouchableOpacity
              disabled={this.props.saveLoading}
              onPress={() =>
                this.props.handleSaved(this.props.id, this.props.isSave)
              }>
              <View style={styles.footerTextContainer}>
                {this.props.isSave ? (
                  <>
                    {this.props.activeSaveId === this.props.id &&
                    this.props.saveLoading ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.appViolet}
                      />
                    ) : (
                      <FontAwesome
                        name="star"
                        size={20}
                        color={colors.appViolet}
                        // color={this.props.saveLoading ? 'orange' : 'red'}
                      />
                    )}

                    <Text style={styles.saveText}> {t('home.saved')}</Text>
                  </>
                ) : (
                  <>
                    {this.props.activeSaveId === this.props.id &&
                    this.props.saveLoading ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.appViolet}
                      />
                    ) : (
                      <CustomIcon
                        name="star"
                        size={20}
                        color={colors.appViolet}
                      />
                    )}

                    <Text style={styles.saveText}> {t('home.save')}</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            <Text style={styles.divider} />
            <TouchableOpacity
              disabled={
                this.props.likeLoading &&
                this.props.activeLikeId === this.props.id
              }
              onPress={() =>
                this.props.handleLike(this.props.id, this.props.isLike)
              }>
              <View style={styles.footerTextContainer}>
                {this.props.isLike ? (
                  <>
                    {this.props.activeLikeId === this.props.id &&
                    this.props.likeLoading ? (
                      <ActivityIndicator size="small" color={colors.skyBlue} />
                    ) : (
                      <FontAwesome
                        name="heart"
                        size={18}
                        color={colors.skyBlue}
                      />
                    )}
                    <Text style={styles.likeText}> {t('home.liked')}</Text>
                  </>
                ) : (
                  <>
                    {this.props.activeLikeId === this.props.id &&
                    this.props.likeLoading ? (
                      <ActivityIndicator size="small" color={colors.skyBlue} />
                    ) : (
                      <CustomIcon
                        name="heart"
                        size={18}
                        color={colors.skyBlue}
                      />
                    )}
                    <Text style={styles.likeText}> {t('home.like')}</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

Newsfeed.propTypes = {
  // avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  isLike: PropTypes.bool.isRequired,
  isSave: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.myReducer.user.token,
  userId: state.myReducer.user?.employer_profile?.id,
});
export default connect(mapStateToProps)(withTranslation()(Newsfeed));
