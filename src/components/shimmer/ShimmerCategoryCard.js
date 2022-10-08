import React from 'react';
import {I18nManager, View} from 'react-native';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/styles/texts/colors';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerCategoryCard = () => {
  return (
    <View
      style={{
        backgroundColor: colors.defaultWhite,
        marginHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        width: 170,
        // paddingEnd: 10,
      }}>
      <ShimmerPlaceholder
        visible={false}
        isReversed={I18nManager.isRTL ? true : false}
        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
        shimmerStyle={{
          height: 150,
          marginStart: 10,
          width: 150,
        }}></ShimmerPlaceholder>
      <ShimmerPlaceholder
        visible={false}
        isReversed={I18nManager.isRTL ? true : false}
        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
        shimmerStyle={{
          height: 20,
          //   marginEnd: 10,
          marginTop: 10,
          width: 150,
        }}></ShimmerPlaceholder>
    </View>
  );
};

export default ShimmerCategoryCard;
