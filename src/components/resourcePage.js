import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './building';
import funct, { x } from './building';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

const gather = {
    wood : [0,1,2,0,0],
    food : [0,0,1,2,0],
    metal : [1,0,0,3,2],
    stone : [1,1,2,0,0],
    oil : [1,1,2,2,0],
}

let i = null;
let tier = '';

class ResourcePage extends Component {

    // When "upgrade" is CLicked will call this function to build
completeUpgrade() {
    i = this.props.resourceSelected;
    tier = this.props.supTier;
    let rq1 = this.props.supCost1;
    let rq2 = this.props.supCost2;
    let rq3 = this.props.supCost3;
    let rq4 = this.props.supCost4;
    let rq5 = this.props.supCost5;
    let r1 = this.props.wood;
    let r2 = this.props.food;
    let r3 = this.props.metal;
    let r4 = this.props.stone;
    let r5 = this.props.oil;
    console.log(rq1, rq2, rq3, rq4, rq5);
    console.log(r1, r2, r3, r4, r5);
    console.log(i);
    if (tier != 5 && rq1 <= r1 &&  rq2 <= r2 &&  rq3 <= r3 && rq4 <= r4 && rq5 <= r5) {
        console.log('leveled up!');
        let object = this.props.Tier;
        console.log(object);
        object[i + 'Tier'] = object[i + 'Tier'] + 1;
        console.log(object[i]);
        this.props.changeState({ Tier : object });
        this.props.changeState({ supTier : this.props.supTier + 1 });
        this.props.changeState({ upgradeSupplies : false });
        this.props.changeState({ wood : this.props.wood - rq1 });
        this.props.changeState({ food : this.props.food - rq2 });
        this.props.changeState({ metal : this.props.metal - rq3 });
        this.props.changeState({ stone : this.props.stone - rq4 });
        this.props.changeState({ oil : this.props.oil - rq5 });
    // updates the round supplier
        console.log(object);
        this.props.changeState({ woodAdd: 10 * object['woodTier'] });
        this.props.changeState({ foodAdd: 10 * object['foodTier'] });
        this.props.changeState({ metalAdd: 10 * object['metalTier'] });
        this.props.changeState({ stoneAdd: 10 * object['stoneTier'] });
        this.props.changeState({ oilAdd: 10 * object['oilTier'] });
        // text modifier
        this.props.changeState({ text1 : 'Successfully' });
        this.props.changeState({ text2 : 'Upgraded!' });
    }
    else if (tier === 5) {
        this.props.changeState({ text1 : 'This Building is' });
        this.props.changeState({ text2 : 'Max Level already' });
        console.log('cant upgrade anymore its maxed out');
    }
    else {
        this.props.changeState({ text1 : 'Not Enough Supplies' });
        this.props.changeState({ text2 : 'to upgrade.' });
        console.log('not enough resources');
    }
}

// supplies
supplies(resource) {
    let temp2 = 'displayed'
    this.props.changeState({ text1 : resource });
    this.props.changeState({ text2 : temp2 });
}

// Production Supply
shownText(resource) {
    let temp = resource + ' production plots allow';
    let temp2 = 'for increased resource each round.'
    this.props.changeState({ text1 : temp });
    this.props.changeState({ text2 : temp2 });
}

// Upgrade Tab
UT() {
    this.props.changeState({ text1 : 'Upgrade Tab displays' });
    this.props.changeState({ text2 : 'upgrade info like cost.' });
}

// what tier is the upgrade
tierUpgrade() {
    let temp = this.props.supTier + ' of 5 tier building';
    this.props.changeState({ text1 : 'this Resource Building is a' });
    this.props.changeState({ text2 : temp });
}

// When any resource that can be upgraded is CLicked it will call this function
upgrade(resource) {
    this.props.changeState({resourceSelected : resource });
    tier = this.props.resource;
    console.log(resource);
    this.props.changeState({upgradeSupplies : true});
    i = gather[resource][0];
    this.props.changeState({supCost1 : i });
    i = gather[resource][1];
    this.props.changeState({supCost2 : i });
    i = gather[resource][2];
    this.props.changeState({supCost3 : i });
    i = gather[resource][3];
    this.props.changeState({supCost4 : i });
    i = gather[resource][4];
    this.props.changeState({supCost5 : i });
    i = this.props.Tier[resource + 'Tier'];
    this.props.changeState({ supTier : i });
}

// return to Base
returnToBase() {
    this.props.changeState({ text1 : 'Welcome Back to' });
    this.props.changeState({ text2 : 'your OutPost' });
}

    render() {
        return (
            <div className='resourcePage'>
                {/* resources on top */}
                <div id="resTop">
                {/* Text */}
                <a>
                    {this.props.text1}
                </a>
                <a>
                    {this.props.text2}
                </a>
                </div>
                <div id="resMid">
                    <div id="upgradeTab">
                    {/* upgrade tab to left, only shows when a resource that can be upgraded is clicked */}
                        {this.props.upgradeSupplies ?
                        <div id="upgradeTabHover">
                            <a onMouseOver={() => this.UT()}>Upgrade Tab</a>
                            <div className="tb" onMouseOver={() => this.tierUpgrade()}>ima {this.props.supTier}/5 upgrade</div>
                            <div id="cost">
                                <a>cost</a>
                                <div>
                                    <img src="./assets/wood.svg"></img>
                                    {this.props.supCost1}
                                </div>
                                <div>
                                    <img src="./assets/food.svg"></img>
                                    {this.props.supCost2}
                                </div>
                                <div>
                                    <img src="./assets/metal.svg"></img>
                                    {this.props.supCost3}
                                </div>
                                <div>
                                    <img src="./assets/stone.svg"></img>
                                    {this.props.supCost4}
                                </div>
                                <div>
                                    <img src="./assets/oil.svg"></img>
                                    {this.props.supCost5}
                                </div>
                            </div>
                            <div className="tb" onClick={() => this.completeUpgrade()}>
                                Upgrade
                            </div>
                        </div> : ''}
                    </div>
                    {/* resources in the center */}
                    <div id="resRight">
                    {/* stone */}
                        <div id="stoneTab" onClick={() => this.upgrade('stone')} onMouseOver={() => this.shownText('Stone')}>
                            Stone + {this.props.stoneAdd}
                        </div>
                    {/* wood */}
                        <div id="woodTab" onClick={() => this.upgrade('wood')} onMouseOver={() => this.shownText('Wood')}>
                            Wood + {this.props.woodAdd}
                        </div>
                    {/* oil */}
                        <div id="oilTab" onClick={() => this.upgrade('oil')} onMouseOver={() => this.shownText('Oil')}>
                            Oil + {this.props.oilAdd}
                        </div>
                    {/* food */}
                        <div id="foodTab" onClick={() => this.upgrade('food')} onMouseOver={() => this.shownText('Food')}>
                            Food + {this.props.foodAdd}
                        </div>
                    </div>
                {/* displays the current resources of the player stockpile */}
                    <div id="resourceRight">
                        <a>supplies</a>
                        <div onMouseOver={() => this.supplies('Wood')}>
                            <img src="./assets/wood.svg"></img>
                            {this.props.wood}
                        </div>
                        <div onMouseOver={() => this.supplies('Food')}>
                            <img src="./assets/food.svg"></img>
                            {this.props.food}
                        </div>
                        <div onMouseOver={() => this.supplies('Metal')}>
                            <img src="./assets/metal.svg"></img>
                            {this.props.metal}
                        </div>
                        <div onMouseOver={() => this.supplies('Stone')}>
                            <img src="./assets/stone.svg"></img>
                            {this.props.stone}
                        </div>
                        <div onMouseOver={() => this.supplies('Oil')}>
                            <img src="./assets/oil.svg"></img>
                            {this.props.oil}
                        </div>
                        <div onMouseOver={() => this.supplies('Population')}>
                            <img src="./assets/pop.svg"></img>
                            {this.props.pop}
                        </div>
                        <div onMouseOver={() => this.supplies('Research')}>
                            <img src="./assets/res.svg"></img>
                            {this.props.res}
                        </div>
                        <div onMouseOver={() => this.supplies('Troops')}>
                            <img src="./assets/troop.svg"></img>
                            {this.props.troop}
                        </div>
                    </div>
                </div>
                {/* bottom tab */}
                <div id="resBott">
                {/* allows player to return to his/her base */}
                    <Link to="/PlayerBase" id="resourceBack" onClick={() => this.returnToBase()}>
                        Return to Base
                    </Link>
                {/* metal */}
                    <div id="metalTab" onClick={() => this.upgrade('metal')}  onMouseOver={() => this.shownText('metal')}>
                        Metal + {this.props.metalAdd}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

ResourcePage = connect(mapStateToProps, actions)(ResourcePage);

export default ResourcePage;