import React from 'react';
import { I18nManager, View } from 'react-native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/styles/texts/colors';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerBanner = () => {
    return (
        <View
            style={{
                backgroundColor: colors.defaultWhite,
                marginHorizontal: 20,
                // paddingVertical: 10,
                marginVertical: 10,

            }}>
            <ShimmerPlaceholder
                visible={false}
                isReversed={I18nManager.isRTL ? true : false}
                shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                shimmerStyle={{
                    height: 200,
                    // marginStart: 10,
                    width: "100%"
                }}></ShimmerPlaceholder>

        </View>
    );
};

export default ShimmerBanner;
