import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

const unl = 'unlock';

class TechnologyMenu extends Component {

    // changing the entire Technology tab location
    Unlock (type, tier, cost, name) {
        
        if (this.props.unlocklocks[unl + type + tier] === 'unlock') {
            // if tech is ready to be unlocked than this will set it to being unlocked
            this.props.changeState({
                prevUnlock : name,
                prevUnlockCost : cost,
                pUtype : type + tier,
                pUName : type,
                pUTier : tier,
            });
            // console doesnt update automatically must be clicked twice
        }
        else {
            console.log('unlocked already or cant be unlocked');
            console.log(this.props.unlocklocks);
        }
        
    console.log(this.props.prevUnlock + this.props.prevUnlockCost + this.props.pUtype);
    }

    BackToBase() {
        this.props.changeState({ text1 : 'After Every Round Progress on', text2 : 'Research will be added.' });
    }

    render() {
        return (
            <div className='technologyMenu'>
                <div id="techTab">
                    Tech Tab
                </div>
                {/* Whats being unlocked */}
                <div>
                    unlocking {this.props.prevUnlock}
                </div>
                {/* TEXT */}
                <div>
                    {this.props.text1}
                </div>
                <div>
                    {this.props.text2}
                </div>
                {/* Technology Tab */}
                <div id="tech">
                    <div className="techSub">
                        <div className="techType">
                            Home Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('home', 't1', 0, 'Tents')}>
                            {this.props.unlocklocks[unl + 'home' + 't1']} Tents
                            <img src="./assets/res.svg"></img>
                            0
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('home', 't2', 6, 'Cabins')}>
                            {this.props.unlocklocks[unl + 'home' + 't2']} Cabins
                            <img src="./assets/res.svg"></img>
                            6
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('home', 't3', 15, 'Brick Home')}>
                            {this.props.unlocklocks[unl + 'home' + 't3']} Brick Homes
                            <img src="./assets/res.svg"></img>
                            15
                        </div>
                    </div>

                    <div className="techSub">
                        <div className="techType">
                            Store Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('store', 't1', 0, 'Market')}>
                            {this.props.unlocklocks[unl + 'store' + 't1']} Market
                            <img src="./assets/res.svg"></img>
                            0
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('store', 't2', 5, 'Dinner')}>
                            {this.props.unlocklocks[unl + 'store' + 't2']} Dinner
                            <img src="./assets/res.svg"></img>
                            5
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('store', 't3', 17, 'Super Market')}>
                            {this.props.unlocklocks[unl + 'store' + 't3']} Super Market
                            <img src="./assets/res.svg"></img>
                            17
                        </div>
                    </div>

                    <div className="techSub">
                        <div className="techType">
                            Camp Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('camp', 't1', 0, 'BootCamp')}>
                            {this.props.unlocklocks[unl + 'camp' + 't1']} Bootcamp
                            <img src="./assets/res.svg"></img>
                            0
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('camp', 't2', 8, 'Military Base')}>
                            {this.props.unlocklocks[unl + 'camp' + 't2']} Military Base
                            <img src="./assets/res.svg"></img>
                            8
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('camp', 't3', 20, 'Air Field')}>
                            {this.props.unlocklocks[unl + 'camp' + 't3']} Air Field
                            <img src="./assets/res.svg"></img>
                            20
                        </div>
                    </div>

                    <div className="techSub">
                        <div className="techType">
                            School Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('school', 't1', 5, 'Class Room')}>
                            {this.props.unlocklocks[unl + 'school' + 't1']} Class Room
                            <img src="./assets/res.svg"></img>
                            5
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('school', 't2', 13, 'Public School')}>
                            {this.props.unlocklocks[unl + 'school' + 't2']} Public School
                            <img src="./assets/res.svg"></img>
                            13
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('school', 't3', 22, 'University')}>
                            {this.props.unlocklocks[unl + 'school' + 't3']} University
                            <img src="./assets/res.svg"></img>
                            22
                        </div>
                    </div>

                    <div className="techSub">
                        <div className="techType">
                            Factory Tech
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('factory', 't1', 6, 'Basic Weapons')}>
                            {this.props.unlocklocks[unl + 'factory' + 't1']} Basic Weapons
                            <img src="./assets/res.svg"></img>
                            6
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('factory', 't2', 14, 'Advanced Weapons')}>
                            {this.props.unlocklocks[unl + 'factory' + 't2']} Advanced Weapons
                            <img src="./assets/res.svg"></img>
                            14
                        </div>
                        <div className="technologys" onClick={() => this.Unlock('factory', 't3', 21, 'Vehicle Factory')}>
                            {this.props.unlocklocks[unl + 'factory' + 't3']} Vehicle Factory
                            <img src="./assets/res.svg"></img>
                            21
                        </div>
                    </div>
                </div>

                <Link to="/PlayerBase" id="backTech" onClick={() => this.BackToBase()}>
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