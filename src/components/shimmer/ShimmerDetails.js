import React, { Component } from 'react';
import { I18nManager, View } from 'react-native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/styles/texts/colors';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
class ShimmerDetails extends Component {
  render() {
    return (
      <>
        <View style={{ paddingHorizontal: 5, marginBottom: 5 }}>
          <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
            shimmerStyle={{
              height: 10,
              marginTop: 30,
              width: '60%',
              marginBottom: 5,
            }}></ShimmerPlaceholder>
          <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
            shimmerStyle={{
              height: 10,
              marginTop: 10,
              width: '40%',
              marginBottom: 5,
            }}></ShimmerPlaceholder>
          <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
            shimmerStyle={{
              height: 10,
              marginTop: 10,
              width: '30%',
              marginBottom: 5,
            }}></ShimmerPlaceholder>

          <ShimmerPlaceholder></ShimmerPlaceholder>

          <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
            shimmerStyle={{
              height: 100,
              marginTop: 10,
              width: '95%',
              marginBottom: 5,
            }}></ShimmerPlaceholder>

          <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
            shimmerStyle={{
              height: 25,
              marginTop: 10,
              width: '80%',
              marginBottom: 5,
            }}></ShimmerPlaceholder>

          <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
            shimmerStyle={{
              height: 25,
              marginTop: 10,
              width: '70%',
              marginBottom: 5,
            }}></ShimmerPlaceholder>

          <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
            shimmerStyle={{
              height: 25,
              marginTop: 10,
              width: '60%',
              marginBottom: 5,
            }}></ShimmerPlaceholder>

          <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
            shimmerStyle={{
              height: 10,
              marginTop: 10,
              width: '40%',
              marginBottom: 5,
            }}></ShimmerPlaceholder>
          <View style={{ paddingBottom: 10 }}>
            {Array(2)
              .fill('')
              .map((item, i) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 10,

                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.appGray,
                    }}
                    key={i}>
                    <ShimmerPlaceholder
                      visible={false}
                      isReversed={I18nManager.isRTL ? true : false}
                      shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                      shimmerStyle={{
                        height: 50,
                        marginTop: 10,
                        width: 80,
                        marginBottom: 5,
                      }}></ShimmerPlaceholder>
                    <ShimmerPlaceholder
                      visible={false}
                      isReversed={I18nManager.isRTL ? true : false}
                      shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                      shimmerStyle={{
                        height: 5,
                        marginTop: 10,
                        width: '60%',
                        marginBottom: 5,
                        marginStart: 10,
                      }}></ShimmerPlaceholder>
                  </View>
                );
              })}
          </View>
          <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
            shimmerStyle={{
              height: 50,
              marginTop: 10,
              width: '95%',
              marginBottom: 5,
            }}></ShimmerPlaceholder>
        </View>
      </>
    );
  }
}

export default ShimmerDetails;
