import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class WarInfo extends Component {

    // Is Research complete?
    Research() {
        if (this.props.res >= this.props.prevUnlockCost) {
            console.log('research complete');
            // changes research to true
            let object = this.props.research;
            let tempvar = this.props.pUType;
            let temp = this.props.pUType + this.props.pUTier;
            object[temp] = true;
            this.props.changeState({ research: object });
            
            object = this.props.unlocklocks;

            if (this.props.pUTier === 't1') {
                // first Tech
                object['unlock' + tempvar] = '';
                object['unlock' + this.props.pUName + 't2'] = 'unlock';
                console.log('FT');
            }
            else if (this.props.pUTier === 't2') {
                // second Tech
                object['unlock' + tempvar] = '';
                object['unlock' + this.props.pUName + 't3'] = 'unlock';
                console.log('ST');
            }
            else if (this.props.pUTier === 't3') {
                // Third Tech
                object['unlock' + tempvar] = '';
                console.log('TT');
            }
            else {
                console.log('Tech change didnt work');
            }
        this.props.changeState({ res : this.props.res - this.props.prevUnlockCost });
        this.props.changeState({ pUTier : '' });
        this.props.changeState({ prevUnlockCost : 0 });
        }
        else {
            console.log('research not complete');
        }
    }

    AfterInfo() {
        this.Research();
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