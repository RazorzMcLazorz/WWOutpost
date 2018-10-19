import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

let num = 0;
// random function
function ourRandomRange(ourMin, ourMax) {
    num = Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin;
}

class NextRound extends Component {
    
    // the more advanced tropp deployment
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
// determinds the troop amount being set
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

// Ends Current Round and moves on to what happen
    EndRound () {
        let temp = this.props.round + 1;
        this.props.changeState({ round : temp });
        console.log('I work')
        this.props.changeState({ wood : this.props.wood + this.props.woodAdd });
        this.props.changeState({ food : this.props.food + this.props.foodAdd });
        this.props.changeState({ metal : this.props.metal + this.props.metalAdd });
        this.props.changeState({ stone : this.props.stone + this.props.stoneAdd });
        this.props.changeState({ oil : this.props.oil + this.props.oilAdd });
        ourRandomRange(1, 2);
        if (num === 1) {
            console.log('you win');
            this.props.changeState({ winLoose : 'you won the battle' });
            ourRandomRange(4, this.props.troopAdd);
            this.props.changeState({ survived : num});
            ourRandomRange(0, 2);
            this.props.changeState({ woodGained : num });
            ourRandomRange(0, 3);
            this.props.changeState({ foodGained : num });
            ourRandomRange(0, 2);
            this.props.changeState({ metalGained : num });
            ourRandomRange(0, 1);
            this.props.changeState({ stoneGained : num });
            ourRandomRange(0, 1);
            this.props.changeState({ oilGained : num });
            this.props.changeState({ battleWon : this.props.battleWon + 1 });
        }
        else if (num === 2) {
            console.log('you loose');
            this.props.changeState({ winLoose : 'you lost the battle' });
            this.props.changeState({ survived : 0 });
            this.props.changeState({ deaths : this.props.troopAdd });
            this.props.changeState({ woodGained : 0 });
            this.props.changeState({ foodGained : 0 });
            this.props.changeState({ metalGained : 0 });
            this.props.changeState({ stoneGained : 0 });
            this.props.changeState({ oilGained : 0 });
        }
        else {
            console.log('I Broke');
        }
        this.props.changeState({ text1 : '' });
        this.props.changeState({ text2 : '' });
        if (this.props.round === 12) {
            this.props.changeState({ gameOver : true });
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
                    <Link to="/WarInfo" id="send" onClick={() => this.EndRound()}>
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