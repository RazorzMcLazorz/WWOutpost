import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './building';
import funct, { x } from './building';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class ResourcePage extends Component {
    render() {
        return (
            <div className='resourcePage'>
                <div id="resTop">
                    <div id="stoneTab">
                        Stone{this.props.stone}
                    </div>
                    <div id="woodTab">
                        Wood
                    </div>
                </div>
                <div id="resMid">
                    <div id="upgradeTab">
                        upgradeTab
                        <div id="upgradeTabHover">
                            hover
                        </div>
                    </div>
                    <div id="resRight">
                        <div id="oilTab">
                            Oil
                        </div> 
                        <div id="foodTab">
                            Food
                        </div>
                    </div>
                    <div id="resourceRight">
                        Supply
                    </div>
                </div>
                <div id="resBott">
                    <Link to="/PlayerBase">
                        Base
                    </Link>
                    <div id="metalTab">
                        Metal
                    </div>
                    <div id="gunPowderTab">
                        GP
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return state
}

ResourcePage = connect(mapStateToProps, actions)(ResourcePage);

export default ResourcePage;