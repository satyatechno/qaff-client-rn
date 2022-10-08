import React, { Component } from 'react'
import { View } from 'react-native'
import Proptypes from "prop-types";

class Divider extends Component {
    render() {
        return (
            <View style={this.props.style} />
        )
    }
}
Divider.proptypes = {
    style: Proptypes.object.isRequired
}

export default Divider