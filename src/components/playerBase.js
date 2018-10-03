import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './building';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

// board costs: wood refund [0], food refund [1], metal refund [2], stone refund [3], oil refund [4], population [5], research [6]
const board = {
    'home' : [3, 2, 0, 0, 0, 10, 0],
    'camp' : [4, 1, 1, 2, 0, 0, 0],
    'store' : [5, 3, 0, 0, 0, 0, 0],
    'school' : [1, 0, 0, 4, 0, 0, 5],
    'factory' : [1, 0, 2, 3, 2, 0, 0],
};

class PlayerBase extends Component {
    
// makes sure that the img is correct
    asset(arg) {
        if (this.props.built[arg]) {
            arg = this.props.built[arg] + this.props.builtTier[arg];
           return arg = `./assets/${arg}.png`; 
            // console.log(arg);
        }
        else {
            return arg = './assets/default.png';
        }
    }

// CONSTRUCTS buildings with requirements filled
    construct(typer, W, F, M, S, O) {
        this.props.changeState({ buildResource : false });
        let temp = this.props.buildConnect;
        let tier = this.props.builtTier[temp];
        let unlocked = typer + this.props.builtTier[temp];
        console.log('unlocked: ' + unlocked);
        if (W <= this.props.wood && F <= this.props.food && M <= this.props.metal && S <= this.props.stone && O <= this.props.oil && this.props.research[unlocked] === true) {
            
            let object = this.props.built;
            console.log(this.props.built[temp]);
            object[temp] = typer;
            this.props.changeState({built: object });
            console.log(temp);
            console.log(this.props.built);
            console.log(typer);
            W = this.props.wood - W;
            this.props.changeState({wood : W});
            console.log(W);
            F = this.props.food - F;
            this.props.changeState({food : F});
            console.log(F);
            M = this.props.metal - M;
            this.props.changeState({metal : M});
            console.log(M);
            S = this.props.stone - S;
            this.props.changeState({stone : S});
            console.log(S);
            O = this.props.oil - O;
            this.props.changeState({oil : O});
            console.log(O);

            console.log('boardval pop: ' + board[typer][5]);
            let popt = this.props.pop + board[typer][5];
            this.props.changeState({ pop : popt});
            // population increase
            
            console.log('boardval res: ' + board[typer][6]);
            let rest = this.props.res + board[typer][6];
            this.props.changeState({ res : rest});
            // population increase

            this.props.changeState({build : false});
            object = this.props.building;
            object[temp] = true;
            this.props.changeState({ building: object });
            this.props.changeState({ buildResource : false });
        }
        else {
            console.log('broke');
            this.props.changeState({ buildResource : true });
        }
    }

    Deconstruct() {
        let temp = this.props.upgradeConnect;
        let object = this.props.built;
        let num = 0;
        let item = object[temp];

        num = this.props.wood + board[item][0];
        this.props.changeState({ wood: num });
        console.log('Wood Refund : ' + item + ' : ' + board[item][0])
        // Wood Refund

        num = this.props.food + board[item][1];
        this.props.changeState({ food: num });
        console.log('Food Refund : ' + item + ' : ' + board[item][1])
        // Food Refund

        num = this.props.metal + board[item][2];
        this.props.changeState({ metal: num });
        console.log('Metal Refund : ' + item + ' : ' + board[item][2])
        // Metal Refund
        
        num = this.props.stone + board[item][3];
        this.props.changeState({ stone: num });
        console.log('Stone Refund : ' + item + ' : ' + board[item][3])
        // Stone Refund

        num = this.props.oil + board[item][4];
        this.props.changeState({ oil: num });
        console.log('Oil Refund : ' + item + ' : ' + board[item][4])
        // Oil Refund

        num = this.props.pop - board[item][5];
        this.props.changeState({ pop: num });
        console.log('Population Removal : ' + item + ' : ' + board[item][5])
        // Population Removal
        
        num = this.props.res - board[item][6];
        this.props.changeState({ res: num });
        console.log('Research Removal : ' + item + ' : ' + board[item][6])
        // Research Removal

        object[temp] = '';
        this.props.changeState({built: object });
        object = this.props.building;
        object[temp] = false;
        this.props.changeState({ building: object });
        this.props.changeState({upgrade: false});
    }

    Build (model) {
        this.props.changeState({ buildResource : false });
        // connecting to Build Menu
        if (this.props.building[model] === true) {
            console.log('nope');
            this.props.changeState({upgrade: true});
            this.props.changeState({build: false});
            this.props.changeState({upgradeConnect: model});
        }
        else if (this.props.building[model] === false) {
            console.log('it worked');
            this.props.changeState({ build: true });
            this.props.changeState({ upgrade: false });
            this.props.changeState({ buildConnect: model });
        }
        else {
            console.log('not working');
        }
    }

    render() {
        return (
            <div className='playerBase'>
                <div id="center">
                    <div id="resourcesLeft">
                        <a>supplies</a>
                        <div>
                            <img src="./assets/wood.svg"></img>
                            {this.props.wood}
                        </div>
                        <a>
                            + {this.props.woodAdd}
                        </a>
                        <div>
                            <img src="./assets/food.svg"></img>
                            {this.props.food}
                        </div>
                        <a>
                            + {this.props.foodAdd}
                        </a>
                        <div>
                            <img src="./assets/metal.svg"></img>
                            {this.props.metal}
                        </div>
                        <a>
                            + {this.props.metalAdd}
                        </a>
                        <div>
                            <img src="./assets/stone.svg"></img>
                            {this.props.stone}
                        </div>
                        <a>
                            + {this.props.stoneAdd}
                        </a>
                        <div>
                            <img src="./assets/oil.svg"></img>
                            {this.props.oil}
                        </div>
                        <a>
                            + {this.props.oilAdd}
                        </a>
                        <div>
                            <img src="./assets/pop.svg"></img>
                            {this.props.pop}
                        </div>
                        <div>
                            <img src="./assets/res.svg"></img>
                            {this.props.res}
                        </div>
                    </div>
                    <div id="base">
                        {/* LEFT */}
                        <div id="leftRow">
                            <div id="topL2" onClick={() => this.Build( 'tl2' )}>
                                <img src={this.asset('tl2')}></img>
                            </div>
                            <div id="topL1"  onClick={() => this.Build( 'tl1' )}>
                                <img src={this.asset('tl1')}></img>
                            </div>
                            <div id="topL"  onClick={() => this.Build( 'tl' )}>
                                <img src={this.asset('tl')}></img>
                            </div>
                            <div id="middleL" onClick={() => this.Build( 'ml' )}>
                                <img src={this.asset('ml')}></img>
                            </div>
                            <div id="bottomL" onClick={() => this.Build( 'bl' )}>
                                <img src={this.asset('bl')}></img>
                            </div>
                            <div id="bottomL1" onClick={() => this.Build( 'bl1' )}>
                                <img src={this.asset('bl1')}></img>
                            </div>
                            <div id="bottomL2" onClick={() => this.Build( 'bl2' )}>
                                <img src={this.asset('bl2')}></img>
                            </div>
                        </div>
                        {/* MID */}
                        <div id="middleRow">
                            <div id="topM2" onClick={() => this.Build( 'tm2' )}>
                                <img src={this.asset('tm2')}></img>
                            </div>
                            <div id="topM1" onClick={() => this.Build( 'tm1' )}>
                                <img src={this.asset('tm1')}></img>
                            </div>
                            <div id="topM" onClick={() => this.Build( 'tm' )}>
                                <img src={this.asset('tm')}></img>
                            </div>
                            <div id="middleM" onClick={() => this.Build( 'mm' )}>
                                {/* <img src={this.asset('mm')}></img> */}
                                mm
                            </div>
                            <div id="bottomM" onClick={() => this.Build( 'bm' )}>
                                <img src={this.asset('bm')}></img>
                            </div>
                            <div id="bottomM1" onClick={() => this.Build( 'bm1' )}>
                                <img src={this.asset('bm1')}></img>
                            </div>
                            <div id="bottomM1" onClick={() => this.Build( 'bm2' )}>
                                <img src={this.asset('bm2')}></img>
                            </div>
                        </div>
                        {/* RIGHT */}
                        <div id="rightRow">
                            <div id="topR2" onClick={() => this.Build( 'tr2' )}>
                                <img src={this.asset('tr2')}></img>
                            </div>
                            <div id="topR1" onClick={() => this.Build( 'tr1' )}>
                                <img src={this.asset('tr1')}></img>
                            </div>
                            <div id="topR" onClick={() => this.Build( 'tr' )}>
                                <img src={this.asset('tr')}></img>
                            </div>
                            <div id="middleR" onClick={() => this.Build( 'mr' )}>
                                <img src={this.asset('mr')}></img>
                            </div>
                            <div id="bottomR" onClick={() => this.Build( 'br' )}>
                                <img src={this.asset('br')}></img>
                            </div>
                            <div id="bottomR1" onClick={() => this.Build( 'br1' )}>
                                <img src={this.asset('br1')}></img>
                            </div>
                            <div id="bottomR2" onClick={() => this.Build( 'br2' )}>
                                <img src={this.asset('br2')}></img>
                            </div>
                        </div>
                    </div>
                    {/* Build Menu */}
                    <div id="buildMenu">
                        {this.props.build ?
                        <a className="buildMenuTitle">
                            build menu
                        </a> : '' }
                        {this.props.buildResource ?
                        <div id="x">
                            <i className="far fa-times-circle"></i>
                        </div>: ''}
                        {this.props.build ?
                        <div>
                            {/* typer, Wood, Food, Metal, Stone, Oil */}
                            <div onClick={() => this.construct('home', 5, 3, 0, 0, 0)}>
                                Home
                                <div>
                                    <a><img src="./assets/wood.svg"></img> - 5</a>
                                    <a><img src="./assets/food.svg"></img> - 3</a>
                                    <a><img src="./assets/pop.svg"></img> + 10</a>
                                </div>
                            </div>
                            <div onClick={() => this.construct('camp', 7, 2, 2, 4, 0)}>
                                Camp
                                <div>
                                    <a><img src="./assets/wood.svg"></img> - 7</a>
                                    <a><img src="./assets/food.svg"></img> - 2</a>
                                    <a><img src="./assets/metal.svg"></img> - 2</a>
                                    <a><img src="./assets/stone.svg"></img> - 4</a>
                                </div>
                            </div>
                            <div onClick={() => this.construct('store', 9, 6, 0, 0, 0)}>
                                Store
                                <div>
                                    <a><img src="./assets/wood.svg"></img> - 9</a>
                                    <a><img src="./assets/food.svg"></img> - 6</a>
                                </div>
                            </div>
                            <div onClick={() => this.construct('school', 2, 0, 0, 8, 0)}>
                                School
                                <div>
                                    <a><img src="./assets/wood.svg"></img> - 2</a>
                                    <a><img src="./assets/stone.svg"></img> - 8</a>
                                    <a><img src="./assets/res.svg"></img> + 5</a>
                                </div>
                            </div>
                            <div onClick={() => this.construct('factory', 1, 0, 4, 6, 4)}>
                                Factory
                                <div>
                                    <a><img src="./assets/wood.svg"></img> - 1</a>
                                    <a><img src="./assets/metal.svg"></img> - 4</a>
                                    <a><img src="./assets/stone.svg"></img> - 6</a>
                                    <a><img src="./assets/oil.svg"></img> - 4</a>
                                </div>
                            </div>
                        </div> : '' }
                        
                        {/* UPGRADE */}
                        {this.props.upgrade ?
                        <a className="buildMenuTitle">
                            <i className="fas fa-arrow-circle-up"></i> menu
                        </a> : '' }
                        {this.props.upgrade ?
                        <div>
                            <div>
                                Upgrade
                            </div>
                            <div onClick={() => this.Deconstruct()}>
                                Destroy
                            </div>
                        </div> : ''}
                    </div>
                </div>
                <div id="bottomTabs">
                    <Link to="/TechnologyMenu" id="techTab" className="bTab">
                        Tech
                    </Link>
                    <Link to="/ResourcePage" id="resourceTab" className="bTab">
                        Resource
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

PlayerBase = connect(mapStateToProps, actions)(PlayerBase);

export default PlayerBase;