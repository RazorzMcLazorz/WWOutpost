import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class NextRound extends Component {

    Troop13(arg) {
        if (arg === 'reset') {
            this.props.changeState({ troopAll: true });
            this.props.changeState({ text1: 'Has been reset.' });
        }
        else if (this.props.troopAll === true) {
            if (arg === '3rd') {
                let troops = this.props.troop;
                let temp = troops * 0.3;
                temp = Math.round(temp);
                console.log(temp);
                this.props.changeState({ troopAll: false });
            }
            else if (arg === 'half') {

            }
            else if (arg === 'all') {

            }
        }
        else {
            this.props.changeState({ text1: 'Unless reset, cant be used.' });
        }
    }

    render() {
        return (
            <div className='nextRound'>
                <div id="nextTitle">
                    Troop Deployment
                </div>
                <div id="numberTroops">
                    <a>
                        Troops: {this.props.troop}
                    </a>
                    <a>
                        Whos being sent: {this.props.troopAdd}
                    </a>
                </div>

                <div id="centerNext">

                    <div id="nextLeft">
                        <div>
                            {this.props.text1}
                        </div>
                        <div id="sending1" className="sending" onClick={() => this.Troop13( '3rd' )}>
                            1/3 Troops
                        </div>

                        <div id="sending2" className="sending" onClick={() => this.Troop13( 'half' )}>
                            1/2 Troops
                        </div>

                        <div id="sending3" className="sending" onClick={() => this.Troop13( 'all' )}>
                            All Troops
                        </div>

                        <div id="reset" className="sending" onClick={() => this.Troop13( 'reset' )}>
                            Reset
                        </div>
                    </div>

                    <div id="precise">
                        <div className="addMinus">
                            + 10
                        </div>

                        <div className="addMinus">
                            + 5
                        </div>

                        <div className="addMinus">
                            + 1
                        </div>

                        <div className="addMinus">
                            - 1
                        </div>

                        <div className="addMinus">
                            - 5
                        </div>

                        <div className="addMinus">
                            - 10
                        </div>
                    </div>

                </div>

                <div id="botom">
                    <div id="send">
                        Send Troops Off
                    </div>
                    <Link to="/PlayerBase" id="backNext">
                        Back
                    </Link>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

NextRound = connect(mapStateToProps, actions)(NextRound);

export default NextRound;