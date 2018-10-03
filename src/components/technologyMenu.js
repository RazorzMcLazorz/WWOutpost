import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './building';
import funct, { x } from './building';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class TechnologyMenu extends Component {
    render() {
        return (
            <div className='technologyMenu'>
                <div id="techTab">
                    Tech Tab
                </div>
                <div id="techTierStart">
                    <div id="tech0T0">
                        Tech 0
                    </div>
                </div>
                <div id="techTier1">
                    <div id="tech1T1">
                        Tech 1
                    </div>
                </div>
                <div id="techTier2">
                    <div id="tech2T2">
                        Tech 2
                    </div>
                </div>
                <div id="techTier3">
                    <div id="tech3T3">
                        Tech 3
                    </div>
                </div>
                <Link to="/PlayerBase">
                    back
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return state
}

TechnologyMenu = connect(mapStateToProps, actions)(TechnologyMenu);

export default TechnologyMenu;