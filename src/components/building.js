import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class PBFunction extends Component {
    Funct() {
        console.log('I transfered');
    }
}

const mapStateToProps = (state) => {
    return state
}

PBFunction = connect(mapStateToProps, actions)(PBFunction);

export default PBFunction;