import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './building';
import funct, { x } from './building';

class PlayerBase extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            buildMenuValue : '',
            upgrade : false,
            upgradeConnect : '',
            build : false,
            buildConnect : '',
            building : {
                'tl2' : false,
                'tl1' : false,
                'tl' : false,
                'ml' : false,
                'bl' : false,
                'bl1' : false,
                'bl2' : false,
            
                'tm2' : false,
                'tm1' : false,
                'tm' : false,
                'mm' : true,
                'bm' : false,
                'bm1' : false,
                'bm2' : false,
            
                'tr2' : false,
                'tr1' : false,
                'tr' : false,
                'mr' : false,
                'br' : false,
                'br1' : false,
                'br2' : false,
            },
            built : {
                'tl2' : '',
                'tl1' : '',
                'tl' : '',
                'ml' : '',
                'bl' : '',
                'bl1' : '',
                'bl2' : '',
            
                'tm2' : '',
                'tm1' : '',
                'tm' : '',
                'mm' : '',
                'bm' : '',
                'bm1' : '',
                'bm2' : '',
            
                'tr2' : '',
                'tr1' : '',
                'tr' : '',
                'mr' : '',
                'br' : '',
                'br1' : '',
                'br2' : '',
            },
            builtTier : {
                'tl2' : 't1',
                'tl1' : 't1',
                'tl' : 't1',
                'ml' : 't1',
                'bl' : 't1',
                'bl1' : 't1',
                'bl2' : 't1',
            
                'tm2' : 't1',
                'tm1' : 't1',
                'tm' : 't1',
                'mm' : 't1',
                'bm' : 't1',
                'bm1' : 't1',
                'bm2' : 't1',
            
                'tr2' : 't1',
                'tr1' : 't1',
                'tr' : 't1',
                'mr' : 't1',
                'br' : 't1',
                'br1' : 't1',
                'br2' : 't1',
            }
        }
    }

// makes sure that the img is correct
    asset(arg) {
        if (this.state.built[arg]) {
            arg = this.state.built[arg] + this.state.builtTier[arg];
           return arg = `./assets/${arg}.png`; 
            // console.log(arg);
        }
        else {
            return arg = './assets/default.png';
        }
    }

// CONSTRUCTS buildings with requirements filled
    construct(type, W, F, M, S, O) {
        let temp = this.state.buildConnect;
        let object = this.state.built;
        console.log(this.state.built[temp]);
        object[temp] = type;
        this.setState({built: object });
        console.log(temp);
        console.log(this.state.built);
        console.log(type);
        console.log(W);
        console.log(F);
        console.log(M);
        console.log(S);
        console.log(O);
        this.setState({build : false});
        object = this.state.building;
        object[temp] = true;
        this.setState({ building: object });

    }

    Build (model) {
        // connecting to Build Menu
        if (this.state.building[model] === true) {
            console.log('nope');
            this.setState({upgrade: true});
            this.setState({build: false});
            this.setState({upgradeConnect: model});
        }
        else if (this.state.building[model] === false) {
            console.log('it worked');
            this.setState({build: true});
            this.setState({upgrade: false});
            this.setState({buildConnect: model});
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
                        supply
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
                        {this.state.build ?
                        <a className="buildMenuTitle">
                            build menu
                        </a> : '' }
                        {this.state.build ?
                        <div>
                            <div onClick={() => this.construct('home', 5, 3, 0, 0, 0)}>
                                Home
                            </div>
                            <div onClick={() => this.construct('camp', 5, 3, 0, 0, 0)}>
                                Camp
                            </div>
                            <div onClick={() => this.construct('store', 5, 3, 0, 0, 0)}>
                                Store
                            </div>
                            <div onClick={() => this.construct('school', 5, 3, 0, 0, 0)}>
                                School
                            </div>
                            <div onClick={() => this.construct('factory', 5, 3, 0, 0, 0)}>
                                Factory
                            </div>
                        </div> : '' }
                        {/* UPGRADE */}
                        {this.state.upgrade ?
                        <a className="buildMenuTitle">
                            <i className="fas fa-arrow-circle-up"></i> menu
                        </a> : '' }
                        {this.state.upgrade ?
                        <div>
                            <div>
                                Upgrade
                            </div>
                            <div>
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

export default PlayerBase;