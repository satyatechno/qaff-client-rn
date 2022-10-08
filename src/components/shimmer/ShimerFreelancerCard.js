import React from 'react';
import { I18nManager, View } from 'react-native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/styles/texts/colors';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerFreelancerCard = () => {
    return (
        <View
            style={{
                backgroundColor: colors.defaultWhite,
                marginHorizontal: 10,
                paddingTop: 10,
                marginVertical: 5,
            }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "65%", flexDirection: "row", overflow: "hidden" }}>

                    <ShimmerPlaceholder
                        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                        visible={false}
                        isReversed={I18nManager.isRTL ? true : false}
                        style={{
                            height: 60,
                            marginStart: 10,
                            width: 60,
                            borderRadius: 30,
                            overflow: "hidden"
                        }}
                        shimmerStyle={{
                            // height: 60,
                            // // marginStart: 10,
                            // width: 60,
                        }}></ShimmerPlaceholder>

                    <ShimmerPlaceholder
                        visible={false}
                        isReversed={I18nManager.isRTL ? true : false}
                        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                        shimmerStyle={{
                            height: 10,
                            marginStart: 10,
                            marginTop: 5,
                            width: '50%',
                        }}></ShimmerPlaceholder>
                </View>
                <View style={{ width: "35%" }}>
                    <ShimmerPlaceholder
                        visible={false}
                        isReversed={I18nManager.isRTL ? true : false}
                        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                        shimmerStyle={{
                            height: 10,
                            // marginStart: 10,
                            width: '90%',
                        }}></ShimmerPlaceholder>

                    <ShimmerPlaceholder
                        visible={false}
                        isReversed={I18nManager.isRTL ? true : false}
                        shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                        shimmerStyle={{
                            height: 10,
                            marginStart: "10%",
                            marginTop: 5,
                            width: '80%',
                        }}></ShimmerPlaceholder>
                </View>
            </View>
            <ShimmerPlaceholder
                visible={false}
                isReversed={I18nManager.isRTL ? true : false}
                shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                shimmerStyle={{
                    height: 10,
                    marginHorizontal: 10,
                    marginTop: 10,
                    width: '60%',
                    marginBottom: 10,
                }}></ShimmerPlaceholder>
            <ShimmerPlaceholder
                visible={false}
                isReversed={I18nManager.isRTL ? true : false}
                shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                shimmerStyle={{
                    height: 80,
                    marginHorizontal: 10,
                    marginTop: 10,
                    width: '95%',
                    marginBottom: 10,
                }}></ShimmerPlaceholder>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginHorizontal: 5 }}>
                <ShimmerPlaceholder
                    visible={false}
                    isReversed={I18nManager.isRTL ? true : false}
                    shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                    style={{
                        height: 100,
                        marginTop: 10,
                        width: '30%',
                        marginBottom: 10,
                        borderRadius: 10,
                        overflow: "hidden"
                    }}
                />
                <ShimmerPlaceholder
                    visible={false}
                    isReversed={I18nManager.isRTL ? true : false}
                    shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                    style={{
                        height: 100,
                        marginTop: 10,
                        width: '30%',
                        marginBottom: 10,
                        borderRadius: 10,
                        overflow: "hidden"
                    }}
                />
                <ShimmerPlaceholder
                    visible={false}
                    isReversed={I18nManager.isRTL ? true : false}
                    shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                    style={{
                        height: 100,
                        marginTop: 10,
                        width: '30%',
                        marginBottom: 10,
                        borderRadius: 10,
                        overflow: "hidden"
                    }}
                />
            </View>
            <ShimmerPlaceholder
                visible={false}
                isReversed={I18nManager.isRTL ? true : false}
                shimmerColors={[colors.appGray1, colors.appGray2, colors.appGray1]}
                shimmerStyle={{
                    height: 50,
                    marginHorizontal: 10,
                    marginTop: 10,
                    width: '95%',
                    marginBottom: 10,
                }}></ShimmerPlaceholder>
        </View>
    );
};

export default ShimmerFreelancerCard;
