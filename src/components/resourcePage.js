import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './building';
import funct, { x } from './building';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

const gather = {
    wood : [1,1,2,0,0],
    food : [0,0,1,2,0],
    metal : [1,0,1,0,2],
    stone : [0,1,2,0,0],
    oil : [1,1,2,2,0],
}

let i = null;

class ResourcePage extends Component {

completeUpgrade() {
    if () {

    }
    else {

    }
}

upgrade(resource) {
    let tier = this.props.resource;
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

    render() {
        return (
            <div className='resourcePage'>
                <div id="resTop">
                    <div id="stoneTab" onClick={() => this.upgrade('stone')}>
                        Stone + {this.props.stoneAdd}
                    </div>
                    <div id="woodTab" onClick={() => this.upgrade('wood')}>
                        Wood + {this.props.woodAdd}
                    </div>
                </div>
                <div id="resMid">
                    <div id="upgradeTab">
                        {this.props.upgradeSupplies ?
                        <div id="upgradeTabHover">
                            <a>Upgrade Tab</a>
                            <div className="tb">ima {this.props.supTier}/5 upgrade</div>
                            <div id="cost">
                                <a>
                                    cost
                                </a>
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
                    <div id="resRight">
                        <div id="oilTab" onClick={() => this.upgrade('oil')}>
                            Oil + {this.props.oilAdd}
                        </div> 
                        <div id="foodTab" onClick={() => this.upgrade('food')}>
                            Food + {this.props.foodAdd}
                        </div>
                    </div>
                    <div id="resourceRight">
                        <a>supplies</a>
                        <div>
                            <img src="./assets/wood.svg"></img>
                            {this.props.wood}
                        </div>
                        <div>
                            <img src="./assets/food.svg"></img>
                            {this.props.food}
                        </div>
                        <div>
                            <img src="./assets/metal.svg"></img>
                            {this.props.metal}
                        </div>
                        <div>
                            <img src="./assets/stone.svg"></img>
                            {this.props.stone}
                        </div>
                        <div>
                            <img src="./assets/oil.svg"></img>
                            {this.props.oil}
                        </div>
                        <div>
                            <img src="./assets/pop.svg"></img>
                            {this.props.pop}
                        </div>
                        <div>
                            <img src="./assets/res.svg"></img>
                            {this.props.res}
                        </div>
                        <div>
                            <img src="./assets/troop.svg"></img>
                            {this.props.troop}
                        </div>
                    </div>
                </div>
                <div id="resBott">
                    <Link to="/PlayerBase" id="resourceBack">
                        Base
                    </Link>
                    <div id="metalTab" onClick={() => this.upgrade('metal')}>
                        Metal + {this.props.metalAdd}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return state
}

ResourcePage = connect(mapStateToProps, actions)(ResourcePage);

export default ResourcePage;