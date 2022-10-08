import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Divider from 'src/components/divider/Divider';
import colors from '../../../styles/texts/colors';
import styles from './JobCard.styles';
class JobCard extends Component {
  constructor(props) {
    super();
  }
  render() {
    const {
      t,
      title,
      budget,
      time,
      description,
      noOfProposals,
      noOfMessages,
      noOfHired,
      projectId,
      navigation,
      projectDetails,
      isDraft,
      item,
      deleteDraft,
      deleteDraftLoading,
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProjectDetails', {
              projectId: projectId,
              showModal: false,
            })
          }>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>{title}</Text>
              <Text style={styles.headerBudget}>
                {t('jobs.budget')}: {budget}
              </Text>
              <Text style={styles.headerTime}>
                {t('jobs.posted')} {time}
              </Text>
            </View>
            {!isDraft && (
              <View style={styles.headerRight}>
                <Pressable hitSlop={30} onPress={this.props.showActionSheet}>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={25}
                    color="#D5A5FF"
                  />
                </Pressable>
              </View>
            )}
          </View>
          <Divider style={{height: 1, backgroundColor: colors.appGray1}} />
          <View style={styles.body}>
            <Text style={styles.bodyText} numberOfLines={3}>
              {description}
            </Text>
            {description.length > 140 && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProjectDetails', {
                    projectId: projectId,
                    showModal: false,
                  });
                }}>
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            )}
          </View>
          <Divider style={{height: 1, backgroundColor: colors.appGray1}} />
        </TouchableOpacity>
        <View style={[styles.footer, isDraft && {paddingVertical: 0}]}>
          {!isDraft ? (
            <>
              <Pressable
                hitSlop={30}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.4 : 1,
                  },
                ]}
                onPress={() =>
                  navigation.navigate('Proposals', {
                    projectId: projectId,
                    projectDetails: projectDetails,
                    type: 'all',
                    contractId: item?.contract_id,
                  })
                }>
                <Text style={styles.proposals}>
                  {noOfProposals} {t('jobs.proposals')}
                </Text>
              </Pressable>
              <View style={styles.divider} />
              <Pressable
                onPress={() =>
                  navigation.navigate('InvitationTabs', {projectId: projectId})
                }
                hitSlop={30}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.4 : 1,
                  },
                ]}>
                <Text style={styles.messages}>
                  {item?.invites_count ?? 0} {t('jobs.invitation')}
                </Text>
              </Pressable>
              <View style={styles.divider} />
              <Pressable
                onPress={() =>
                  navigation.navigate('HiredTabs', {projectId: projectId})
                }
                hitSlop={30}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.4 : 1,
                  },
                ]}>
                <Text style={styles.hired}>
                  {noOfHired} {t('jobs.hired')}
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onPress={() =>
                  navigation.navigate('ProjectEdit', {
                    data: item,
                    type: 'draft',
                  })
                }
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? colors.skyBlue : 'white',
                  },
                  styles.editButton,
                ]}>
                {({pressed}) => (
                  <Text
                    style={[
                      styles.editButtonText,
                      {color: pressed ? colors.defaultWhite : colors.skyBlue},
                    ]}>
                    Edit
                  </Text>
                )}
              </Pressable>
              <Text
                style={{
                  borderRightWidth: 1,
                  borderRightColor: colors.appGray1,
                }}></Text>
              <Pressable
                onPress={() => deleteDraft('', 'draft', item?.id)}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? colors.appRed : 'white',
                  },
                  styles.editButton,
                ]}>
                {({pressed}) =>
                  !deleteDraftLoading ? (
                    <Text
                      style={[
                        styles.editButtonText,
                        {color: pressed ? colors.defaultWhite : colors.appRed},
                      ]}>
                      Delete
                    </Text>
                  ) : (
                    <ActivityIndicator color={colors.appRed} size="small" />
                  )
                }
              </Pressable>
            </>
          )}
        </View>
      </View>
    );
  }
}

JobCard.propTypes = {
  title: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  noOfProposals: PropTypes.number.isRequired,
  noOfMessages: PropTypes.number.isRequired,
  noOfHired: PropTypes.number.isRequired,
};

export default withTranslation()(JobCard);
