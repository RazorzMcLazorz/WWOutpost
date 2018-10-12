import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class NextRound extends Component {

    Troop13(arg) {
        if (arg === 'reset') {
            this.props.changeState({ troopAdd: 0 });
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
                this.props.changeState({ troopAdd: temp });
            }
            else if (arg === 'half') {
                let troops = this.props.troop;
                let temp = troops * .5;
                temp = Math.round(temp);
                console.log(temp);
                this.props.changeState({ troopAll: false });
                this.props.changeState({ troopAdd: temp });
            }
            else if (arg === 'all') {
                let troops = this.props.troop;
                let temp = troops;
                temp = Math.round(temp);
                console.log(temp);
                this.props.changeState({ troopAll: false });
                this.props.changeState({ troopAdd: temp });
            }
        }
        else {
            this.props.changeState({ text1: 'Unless reset, cant be used.' });
        }
    }

    AddMinus (sign, num) {
        let temp = 0;
        if (sign === '+') {
            temp = this.props.troopAdd + num
        }
        else if (sign === '-') {
            temp = this.props.troopAdd - num
        }
        if (temp >= 0 && temp <= this.props.troop) {
            this.props.changeState({ troopAdd: temp });
        }
        else {
            this.props.changeState({ text1: 'Not Enough Troops.' });
        }
    }

    EndRound () {
        let temp = this.props.round + 1;
        this.props.changeState({ round : temp });
        console.log('I work')
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
                        <div className="addMinus" onClick={() => this.AddMinus( '+', 10 )}>
                            + 10
                        </div>

                        <div className="addMinus" onClick={() => this.AddMinus( '+', 5 )}>
                            + 5
                        </div>

                        <div className="addMinus" onClick={() => this.AddMinus( '+', 1 )}>
                            + 1
                        </div>

                        <div className="addMinus" onClick={() => this.AddMinus( '-', 1 )}>
                            - 1
                        </div>

                        <div className="addMinus" onClick={() => this.AddMinus( '-', 5 )}>
                            - 5
                        </div>

                        <div className="addMinus" onClick={() => this.AddMinus( '-', 10 )}>
                            - 10
                        </div>
                    </div>

                </div>

                <div id="botom">
                    <Link to="/PlayerBase" id="send" onClick={() => this.EndRound()}>
                        Send Troops Off
                    </Link>
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