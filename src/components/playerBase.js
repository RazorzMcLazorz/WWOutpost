import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayerBase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // can upgrade?
            // left
            tl2: false,
            tl1: false,
            tl: false,
            ml: false,
            bl: false,
            bl1: false,
            bl2: false,
            // middle
            tm2: false,
            tm1: false,
            tm: false,
            mm: true,
            bm: false,
            bm1: false,
            bm2: false,
            // right
            tr2: false,
            tr1: false,
            tr: false,
            mr: false,
            br: false,
            br1: false,
            br2: false,
        }
        // bind
        // this.startGame = this.startGame.bind(this);
    }
    // building placements
    // LeftRow
    tl2() {

    }
    tl1() {

    }  
    tl() {

    }
    ml() {

    }
    bl() {

    }
    bl1() {

    }
    bl2() {

    }
    // Middle
    tm2() {

    }
    tm1() {

    }  
    tm() {

    }
    mm() {

    }
    bm() {

    }
    bm1() {

    }
    bm2() {

    }
    // Right
    tr2() {

    }
    tr1() {

    }  
    tr() {

    }
    mr() {

    }
    br() {

    }
    br1() {

    }
    br2() {

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
                            <div id="topL2">
                                tl2
                            </div>
                            <div id="topL1">
                                tl1
                            </div>
                            <div id="topL">
                                tl
                            </div>
                            <div id="middleL">
                                ml
                            </div>
                            <div id="bottomL">
                                bl
                            </div>
                            <div id="bottomL1">
                                bl1
                            </div>
                            <div id="bottomL2">
                                bl2
                            </div>
                        </div>
                        {/* MID */}
                        <div id="middleRow">
                            <div id="topM2">
                                tm2
                            </div>
                            <div id="topM1">
                                tm1
                            </div>
                            <div id="topM">
                                tm
                            </div>
                            <div id="middleM">
                                mm
                            </div>
                            <div id="bottomM">
                                bm
                            </div>
                            <div id="bottomM1">
                                bm1
                            </div>
                            <div id="bottomM1">
                                bm2
                            </div>
                        </div>
                        {/* RIGHT */}
                        <div id="rightRow">
                            <div id="topR2">
                                tr2
                            </div>
                            <div id="topR1">
                                tr1
                            </div>
                            <div id="topR">
                                tr
                            </div>
                            <div id="middleR">
                                mr
                            </div>
                            <div id="bottomR">
                                br
                            </div>
                            <div id="bottomR1">
                                br1
                            </div>
                            <div id="bottomR2">
                                br2
                            </div>
                        </div>
                    </div>
                    <div id="buildMenu">
                        build menu
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