import React from 'react';
import { I18nManager, View } from 'react-native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/styles/texts/colors';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerCard = () => {
  return (
    <View
      style={{
        backgroundColor: colors.defaultWhite,
        marginHorizontal: 10,
        paddingTop: 10,
        marginVertical: 5,
      }}>
      <ShimmerPlaceholder
        visible={false}
        isReversed={I18nManager.isRTL ? true : false}
        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
        shimmerStyle={{
          height: 10,
          marginStart: 10,
          width: '70%',
        }}></ShimmerPlaceholder>

      <ShimmerPlaceholder
        visible={false}
        isReversed={I18nManager.isRTL ? true : false}
        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
        shimmerStyle={{
          height: 10,
          marginStart: 10,
          marginTop: 5,
        }}></ShimmerPlaceholder>

      <ShimmerPlaceholder
        visible={false}
        isReversed={I18nManager.isRTL ? true : false}
        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
        shimmerStyle={{
          height: 10,
          marginStart: 10,
          marginTop: 5,
          width: '40%',
        }}></ShimmerPlaceholder>

      <ShimmerPlaceholder
        visible={false}
        isReversed={I18nManager.isRTL ? true : false}
        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
        shimmerStyle={{
          height: 150,
          marginHorizontal: 10,
          marginTop: 10,
          width: '95%',
          marginBottom: 10,
        }}></ShimmerPlaceholder>
    </View>
  );
};

export default ShimmerCard;
