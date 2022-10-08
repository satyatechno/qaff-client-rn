import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import styles from './PollsProgress.styles';
import * as Progress from 'react-native-progress';
import colors from 'src/styles/texts/colors';
import PropTypes from 'prop-types';

export class PollsProgress extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Progress.Bar
            progress={this.props.progress / 100}
            width={null}
            color={this.props.fillColor}
            animated={true}
            height={4}
            unfilledColor={this.props.unfillColor}
            borderColor={colors.appGray2}
            style={{margin: 20}}
          />
        </View>
        <View
          style={[
            styles.pollsStepsContainer,
            {
              left: `${this.props.progress - this.props.progress / 10}%`,
            },
          ]}>
          <Text style={styles.pollsStepText}>{this.props.progress / 10}</Text>
        </View>
      </View>
    );
  }
}

PollsProgress.propTypes = {
  progress: PropTypes.number.isRequired,
  fillColor: PropTypes.string,
  unfillColor: PropTypes.string,
};

PollsProgress.defaultProps = {
  fillColor: colors.skyBlue,
  unfillColor: colors.appGray,
  progress: 10,
};

export default PollsProgress;
