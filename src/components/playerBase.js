import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayerBase extends Component {
    render() {
        return (
            <div className='playerBase'>
                <div id="center">
                    <div id="resourcesLeft">
                        supply
                    </div>
                    <div id="base">
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
                                bR1
                            </div>
                            <div id="bottomR2">
                                bR2
                            </div>
                        </div>
                    </div>
                    <div id="buildMenu">
                        build menu
                    </div>
                </div>
                <div id="bottomTabs">
                    tabs
                </div>
            </div>
        );
    }
}

export default PlayerBase;