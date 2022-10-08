import React, {createRef} from 'react';
import {ActivityIndicator, Dimensions, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {FETCH_PROJECTS} from 'src/actions/action';
import colors from 'src/styles/texts/colors';
const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;

class PaymentWebView extends React.Component {
  constructor(props) {
    super(props);
    this.webview = createRef();
  }

  handleWebViewNavigationStateChange = async (newNavState) => {
    const {url} = newNavState;
    console.log('USRL', url);
    if (url.includes(`make_payment`)) {
      console.log('success', url);

      const code = await this.getCodeFromWindowURL(url);
      console.log('code', code);

      switch (code.reference_type) {
        case 'contract_payment':
          setTimeout(() => {
            // this.webview.stopLoading();
            this.props.dispatch(FETCH_PROJECTS({type: 'progress', page: 1}));
            this.props.navigation.replace('ContractDetails', {
              contractId: code?.reference_id,
            });
          }, 1000);
          break;
        default:
          console.log('abccc');
      }
    }
  };

  getCodeFromWindowURL = (url) => {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    console.log('dsfsfffsdada', params);
    // return obj;
    return params;
  };

  render() {
    const {url} = this.props?.route?.params;
    return (
      // <SafeAreaView >
     
      <WebView
      style={{flex: 1, marginTop: 35, backgroundColor: 'green'}}
      containerStyle={{  height: Dimensions.get('screen').height,}}
      // style={{height: Dimensions.get('screen').height, marginTop: 70}}
        ref={(ref) => (this.webview = ref)}
        source={{
          uri: url,
        }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
        // injectedJavaScript={INJECTEDJAVASCRIPT}
        scalesPageToFit={true}
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={colors.skyBlue} size="large" />
          </View>
        )}
      />
    //  </SafeAreaView>
    );
  }
}

export default connect()(PaymentWebView);
