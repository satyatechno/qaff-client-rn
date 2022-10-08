import React from 'react';
import { I18nManager, View } from 'react-native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/styles/texts/colors';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerPortfolioDetails = () => {
    return (
        <View
            style={{
                backgroundColor: colors.defaultWhite,
                marginHorizontal: 20,
                padding: 10,
                marginVertical: 10,

            }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                <ShimmerPlaceholder
                    visible={false}
                    isReversed={I18nManager.isRTL ? true : false}
                    shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                    shimmerStyle={{
                        height: 10,
                        width: "45%"

                    }}></ShimmerPlaceholder>
                <ShimmerPlaceholder
                    visible={false}
                    isReversed={I18nManager.isRTL ? true : false}
                    shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                    shimmerStyle={{
                        height: 10,
                        width: "30%"

                    }}></ShimmerPlaceholder>

            </View>
            <ShimmerPlaceholder
                visible={false}
                isReversed={I18nManager.isRTL ? true : false}
                shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                shimmerStyle={{
                    height: 20,
                    width: "100%"

                }}></ShimmerPlaceholder>
            <ShimmerPlaceholder
                visible={false}
                isReversed={I18nManager.isRTL ? true : false}
                shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                shimmerStyle={{
                    height: 200,
                    marginTop: 10,
                    width: "100%"
                }}></ShimmerPlaceholder>
        </View>
    );
};

export default ShimmerPortfolioDetails;
