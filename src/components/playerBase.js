import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayerBase extends Component {
    render() {
        return (
            <div className='playerBase'>
                <div id="center">
                    <div id="resourcesLeft">
                        resources
                    </div>
                    <div id="base">
                        <div id="leftRow">
                            <div id="topL">
                                tl
                            </div>
                            <div id="middleL">
                                ml
                            </div>
                            <div id="bottomL">
                                bl
                            </div>
                        </div>
                        <div id="middleRow">
                            <div id="topM">
                                tm
                            </div>
                            <div id="middleM">
                                mm
                            </div>
                            <div id="bottomM">
                                bm
                            </div>
                        </div>
                        <div id="rightRow">
                            <div id="topR">
                                tr
                            </div>
                            <div id="middleR">
                                mr
                            </div>
                            <div id="bottomR">
                                br
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