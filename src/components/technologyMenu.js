import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

const unl = 'unlock';

class TechnologyMenu extends Component {



    // changing the entire Technology tab location
    Unlock (type, tier) {
        if (this.props.unlocklocks[unl + type + tier] === 'unlock') {
            let object = this.props.research;
            object[type] = true;
            this.props.changeState({ research: object });
            object = this.props.unlocklocks;
            object[unl + type + tier] = 'unlocking';
            this.props.changeState({ unlocks: object });
            console.log(type, tier);
            console.log(object);
        }
        else {
            console.log('unlocked already or cant be unlocked');
            console.log(this.props.unlocklocks);
        }
        
    }

    
    render() {
        return (
            <div className='technologyMenu'>
                <div id="techTab">
                    Tech Tab
                </div>
                
                {/* Technology Tab */}
                <div id="tech">
                    <div className="techSub">
                        <div className="techType">
                            Home Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('home', 't1')}>
                            {this.props.unlocklocks[unl + 'home' + 't1']} Tents
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('home', 't2')}>
                            {this.props.unlocklocks[unl + 'home' + 't2']} Cabins
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('home', 't3')}>
                            {this.props.unlocklocks[unl + 'home' + 't3']} Brick Homes
                        </div>
                    </div>

                    <div className="techSub">
                        <div className="techType">
                            Store Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('store', 't1')}>
                            {this.props.unlocklocks[unl + 'store' + 't1']} Market
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('store', 't2')}>
                            {this.props.unlocklocks[unl + 'store' + 't2']} Dinner
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('store', 't3')}>
                            {this.props.unlocklocks[unl + 'store' + 't3']} Super Market
                        </div>
                    </div>

                    <div className="techSub">
                        <div className="techType">
                            Camp Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('camp', 't1')}>
                            {this.props.unlocklocks[unl + 'camp' + 't1']} Bootcamp
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('camp', 't2')}>
                            {this.props.unlocklocks[unl + 'camp' + 't2']} Military Base
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('camp', 't3')}>
                            {this.props.unlocklocks[unl + 'camp' + 't3']} Air Field
                        </div>
                    </div>

                    <div className="techSub">
                        <div className="techType">
                            School Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('school', 't1')}>
                            {this.props.unlocklocks[unl + 'school' + 't1']} Class Room
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('school', 't2')}>
                            {this.props.unlocklocks[unl + 'school' + 't2']} Public School
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('school', 't3')}>
                            {this.props.unlocklocks[unl + 'school' + 't3']} University
                        </div>
                    </div>

                    <div className="techSub">
                        <div className="techType">
                            Factory Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('factory', 't1')}>
                            {this.props.unlocklocks[unl + 'factory' + 't1']} Basic Weapons
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('factory', 't2')}>
                            {this.props.unlocklocks[unl + 'factory' + 't2']} Advanced Weapons
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('factory', 't3')}>
                            {this.props.unlocklocks[unl + 'factory' + 't3']} Vehicle Facotory
                        </div>
                    </div>
                </div>

                <Link to="/PlayerBase" id="backTech">
                    back
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

TechnologyMenu = connect(mapStateToProps, actions)(TechnologyMenu);

export default TechnologyMenu;