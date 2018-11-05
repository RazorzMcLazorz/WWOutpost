import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class WarInfo extends Component {

    AfterInfo() {
        this.props.changeState({ text1 : 'Welcome to Round ' + this.props.round + ' of 12' });
        this.props.changeState({ text2 : 'Click yellow to begin again.' });
    }

    render() {
        return (
            <div className='warInfo'>
                {/* top part */}
                <div id="warInfoTop">
                    {this.props.winLoose}
                </div>
                <div className="wItext">
                    {this.props.text1}
                </div>
                <div className="wItext">
                    {this.props.text2}
                </div>
                {/* middle part */}
                <div id="warInfoMid">
                    {/* left */}
                    <div id="wILeft">
                        <div>
                            <a>
                                Survived
                            </a>
                            <a className="point">
                                {this.props.survived}
                            </a>
                        </div>
                    </div>
                    {/* right */}
                    <div id="wIRight">
                        <div id="warInfoSupplys">
                            <a>Supplies</a>
                            <a>Collected</a>
                            <div>
                                <img src="./assets/wood.svg"></img>
                                {this.props.woodGained}
                            </div>
                            <div>
                                <img src="./assets/food.svg"></img>
                                {this.props.foodGained}
                            </div>
                            <div>
                                <img src="./assets/metal.svg"></img>
                                {this.props.metalGained}
                            </div>
                            <div>
                                <img src="./assets/stone.svg"></img>
                                {this.props.stoneGained}
                            </div>
                            <div>
                                <img src="./assets/oil.svg"></img>
                                {this.props.oilGained}
                            </div>
                        </div>
                    </div>
                </div>
                {/* bottom */}
                <div id="wIScore">
                    <a>Score</a>
                    <a className="point">{this.props.scoreAdd}</a>
                </div>
                {this.props.gameOver ?
                <Link to="/GameOver" className="wICont">
                    Continue
                </Link> :
                <Link to="/PlayerBase" className="wICont" onClick={() => this.AfterInfo()}>
                    Continue
                </Link>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

WarInfo = connect(mapStateToProps, actions)(WarInfo);

export default WarInfo;