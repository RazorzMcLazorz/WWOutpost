import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './building';
import { connect } from 'react-redux';
import * as actions from '../js/actions';
import { runInThisContext } from 'vm';

// Global Variable for what is selected
let BUModel = '';
let tempvar = 0;
let select = [];
let BUType = '';

// Resource Refund : wood refund [0], food refund [1], metal refund [2], stone refund [3], oil refund [4], 
// Bonus Refund    : population [5], research [6], popMultply [7], SurvivalRate [8], chanceToWin [9]
// Deals with Tier 1 Refunds
const board = {
    //                       \/ Split means Resource vs Bonus
    'home' : [3, 2, 0, 0, 0,   10, 0, 0, 0, 0],
    'camp' : [4, 1, 1, 2, 0,   0, 0, 0, 0.5, 0],
    'store' : [5, 3, 0, 0, 0,   0, 0, 0.2, 0, 0],
    'school' : [1, 0, 0, 4, 0,   0, 2, 0, 0, 0],
    'factory' : [1, 0, 2, 3, 2,   0, 0, 0, 0, 2],
};
// Deals with Tier 2 Refunds
const board2 = {
    'home' : [3, 2, 0, 0, 0,   25, 0, 0, 0, 0],
    'camp' : [4, 1, 1, 2, 0,   0, 0, 0, 1.5, 0],
    'store' : [5, 3, 0, 0, 0,   0, 0, 0.5, 0, 0],
    'school' : [1, 0, 0, 4, 0,   0, 5, 0, 0, 0],
    'factory' : [1, 0, 2, 3, 2,   0, 0, 0, 0, 5],
};
// Deals with Tier 3 Refunds
const board3 = {
    'home' : [3, 2, 0, 0, 0,   60, 0, 0, 0, 0],
    'camp' : [4, 1, 1, 2, 0,   0, 0, 0, 3, 0],
    'store' : [5, 3, 0, 0, 0,   0, 0, 1, 0, 0],
    'school' : [1, 0, 0, 4, 0,   0, 10, 0, 0, 0],
    'factory' : [1, 0, 2, 3, 2,   0, 0, 0, 0, 10],
};

// Tier 2 Upgrade price
const TierTwo = {
    'home' : [10, 6, 2, 0, 0],
    'store' : [10, 12, 8, 4, 5],
    'camp' : [9, 4, 6, 6, 3],
    'school' : [6, 10, 5, 3, 2],
    'factory' : [6, 0, 10, 8, 8]
};
// Tier 3 Upgrade price
const TierThree = {
    'home' : [2, 9, 4, 15, 1],
    'store' : [11, 18, 10, 8, 8],
    'camp' : [11, 6, 12, 10, 6],
    'school' : [12, 12, 12, 8, 6],
    'factory' : [15, 0, 21, 10, 15]
}
// type of upgrade
const TypeUpgrade = {
    'home' : ['cabin', 'brick'],
    'store' : ['dinner', 'market'],
    'camp' : ['military', 'air'],
    'school' : ['public', 'university'],
    'factory' : ['advanced', 'vehicle']
}

// Capital Resource
let CWood = 0;
let CFood = 0;
let CMetal = 0;
let CStone = 0;
let COil = 0;
let CRes = 0;

class PlayerBase extends Component {

// makes sure that the img is correct
    asset(arg) {
        if (this.props.built[arg]) {
            arg = this.props.built[arg] + this.props.builtTier[arg];
           return arg = `./assets/${arg}.png`;
            // console.log(arg);
        }
        else if (arg === 'HQ') {
            if (this.props.capitalTier === 1) {
                arg = 'HQTent';
            }
            else if (this.props.capitalTier >= 2) {
                arg = `HQTentT${this.props.capitalTier}`;
            }
            return arg = `./assets/${arg}.png`;
        }
        else {
            return arg = './assets/default.png';
        }
    }

// CONSTRUCTS buildings with requirements filled
    construct(typer, W, F, M, S, O) {

        if(typer === 'home') {
            this.props.changeState({ text1 : 'The Home adds new population', text2 : 'to your supplies to make soldiers' });
        }
        else if (typer === 'camp') {
            this.props.changeState({ text1 : 'The Camp allows better troop', text2 : 'training increasing troop survival' });
        }
        else if (typer === 'store') {
            this.props.changeState({ text1 : 'The Store adds to population', text2 : 'multiplier increases on tier' });
        }
        else if (typer === 'school') {
            this.props.changeState({ text1 : 'The School increases Research', text2 : 'production in supplies' });
        }
        else if (typer === 'factory') {
            this.props.changeState({ text1 : 'The Factory increases soldier', text2 : 'survival on the battle field' });
        }
        this.props.changeState({ buildResource : false });
        let temp = this.props.buildConnect;
        let tier = this.props.builtTier[temp];
        let unlocked = typer + tier;
        console.log(temp);
        console.log(tier);
        console.log(typer);
        console.log('unlocked: ' + unlocked);
        if (W <= this.props.wood && F <= this.props.food && M <= this.props.metal && S <= this.props.stone && O <= this.props.oil && this.props.research[typer + tier] === true) {
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

            // population increase
            console.log('boardval pop: ' + board[typer][5]);
            let popt = this.props.pop + board[typer][5];
            this.props.changeState({ pop : popt});
            
            // population increase
            console.log('boardval res: ' + board[typer][6]);
            let rest = this.props.res + board[typer][6];
            this.props.changeState({ res : rest});
            
            this.props.changeState({build : false});
            object = this.props.building;
            object[temp] = true;
            this.props.changeState({ building: object, buildResource : false });

            console.log(board[typer][5]);

            this.props.changeState({ pop : this.props.pop + board[typer][5], resAdd : this.props.resAdd + board[typer][6], popMult : this.props.popMult + board[typer][7], survRate : this.props.survRate + board[typer][8], winChance : this.props.winChance + board[typer][9] });
        }
        else {
            console.log('broke');
            this.props.changeState({ buildResource : true });
            if (this.props.research[unlocked] != true) {
                this.props.changeState({ text1 : 'Not', text2 : 'Researched' });
                console.log(this.props.research);
            }
            else {
                this.props.changeState({ text1 : 'Not enough', text2 : 'supplies' });
            }
        }
    }

    Deconstruct() {
        let temp = this.props.upgradeConnect;
        let object = this.props.built;
        let num = 0;
        let item = object[temp];

        // Tier Selection of Refund
        if (this.props.builtTier[temp] === 't1') {
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

            num = this.props.popMult - board[item][7];
            this.props.changeState({ popMult: num });
            console.log('PopMulti% Removal : ' + item + ' : ' + board[item][7])
            // Population multiplyer removal

            num = this.props.survRate - board[item][8];
            this.props.changeState({ survRate: num });
            console.log('SurvivalRate% Removal : ' + item + ' : ' + board[item][8])
            // Survival Rate Removal

            num = this.props.winChance - board[item][9];
            this.props.changeState({ winChance: num });
            console.log('WinChance% Removal : ' + item + ' : ' + board[item][9])
            // chance to win removal
        }
        else if (this.props.builtTier[temp] === 't2') {
            num = this.props.wood + board2[item][0];
            this.props.changeState({ wood: num });
            console.log('Wood Refund : ' + item + ' : ' + board2[item][0])
            // Wood Refund

            num = this.props.food + board2[item][1];
            this.props.changeState({ food: num });
            console.log('Food Refund : ' + item + ' : ' + board2[item][1])
            // Food Refund

            num = this.props.metal + board2[item][2];
            this.props.changeState({ metal: num });
            console.log('Metal Refund : ' + item + ' : ' + board2[item][2])
            // Metal Refund

            num = this.props.stone + board2[item][3];
            this.props.changeState({ stone: num });
            console.log('Stone Refund : ' + item + ' : ' + board2[item][3])
            // Stone Refund

            num = this.props.oil + board2[item][4];
            this.props.changeState({ oil: num });
            console.log('Oil Refund : ' + item + ' : ' + board2[item][4])
            // Oil Refund

            num = this.props.pop - board2[item][5];
            this.props.changeState({ pop: num });
            console.log('Population Removal : ' + item + ' : ' + board2[item][5])
            // Population Removal
            
            num = this.props.res - board2[item][6];
            this.props.changeState({ res: num });
            console.log('Research Removal : ' + item + ' : ' + board2[item][6])
            // Research Removal

            num = this.props.popMult - board2[item][7];
            this.props.changeState({ popMult: num });
            console.log('PopMulti% Removal : ' + item + ' : ' + board2[item][7])
            // Population multiplyer removal

            num = this.props.survRate - board2[item][8];
            this.props.changeState({ survRate: num });
            console.log('SurvivalRate% Removal : ' + item + ' : ' + board2[item][8])
            // Survival Rate Removal

            num = this.props.winChance - board2[item][9];
            this.props.changeState({ winChance: num });
            console.log('WinChance% Removal : ' + item + ' : ' + board2[item][9])
            // chance to win removal
        }
        else if (this.props.builtTier[temp] === 't3') {
            num = this.props.wood + board3[item][0];
            this.props.changeState({ wood: num });
            console.log('Wood Refund : ' + item + ' : ' + board3[item][0])
            // Wood Refund

            num = this.props.food + board3[item][1];
            this.props.changeState({ food: num });
            console.log('Food Refund : ' + item + ' : ' + board3[item][1])
            // Food Refund

            num = this.props.metal + board3[item][2];
            this.props.changeState({ metal: num });
            console.log('Metal Refund : ' + item + ' : ' + board3[item][2])
            // Metal Refund

            num = this.props.stone + board3[item][3];
            this.props.changeState({ stone: num });
            console.log('Stone Refund : ' + item + ' : ' + board3[item][3])
            // Stone Refund

            num = this.props.oil + board3[item][4];
            this.props.changeState({ oil: num });
            console.log('Oil Refund : ' + item + ' : ' + board3[item][4])
            // Oil Refund

            num = this.props.pop - board3[item][5];
            this.props.changeState({ pop: num });
            console.log('Population Removal : ' + item + ' : ' + board3[item][5])
            // Population Removal
            
            num = this.props.res - board3[item][6];
            this.props.changeState({ res: num });
            console.log('Research Removal : ' + item + ' : ' + board3[item][6])
            // Research Removal

            num = this.props.popMult - board3[item][7];
            this.props.changeState({ popMult: num });
            console.log('PopMulti% Removal : ' + item + ' : ' + board3[item][7])
            // Population multiplyer removal

            num = this.props.survRate - board3[item][8];
            this.props.changeState({ survRate: num });
            console.log('SurvivalRate% Removal : ' + item + ' : ' + board3[item][8])
            // Survival Rate Removal

            num = this.props.winChance - board3[item][9];
            this.props.changeState({ winChance: num });
            console.log('WinChance% Removal : ' + item + ' : ' + board3[item][9])
            // chance to win removal
        }
        // Line normal reset
        object[temp] = '';
        this.props.changeState({built: object });
        object = this.props.building;
        object[temp] = false;
        this.props.changeState({ building: object, upgrade: false});
    }

    // Activates when a yellow square is clicked
    Build (model) {
        this.props.changeState({ text1 : 'The Build Menu allows you to', text2 : 'build buildings for population' });
        // connects whats selected to global variable
        BUModel = model;
        BUType = this.props.built[BUModel];

        this.props.changeState({ buildResource : false });
        // reset price variables
        this.props.changeState({ BUFood : 0,
        BUWood : 0, BUMetal : 0, BUStone : 0, BUOil : 0,
        // reset bonus variables
        BUPop : 0, BUPopM : 0, BUBattleSurvive : 0, BUResearch : 0, BUBattleWining : 0 });
        let cost = '';
        // connecting to Build Menu
        if (this.props.building[model] === true) {
            console.log('Upgrade Menu');
            this.props.changeState({ upgrade: true, build: false, upgradeConnect: model, capital: false});
            let type = this.props.built[BUModel];
            console.log(type + ' Build tab upgrade time');
            
            if (this.props.builtTier[BUModel] === 't1') {
                cost = TierTwo[type];
            }
            else {
                cost = TierThree[type];
            }
            this.props.changeState({ BUFood : cost[0], BUWood : cost[1], BUMetal : cost[2], BUStone : cost[3], BUOil : cost[4] });
        }
        else if (this.props.building[model] === false) {
            console.log('Building Menu');
            this.props.changeState({ build: true, upgrade: false, buildConnect: model, capital: false});
        }  
        else {
            console.log('not working');
        }
    }
    // Research text change
    TechText() {
        this.props.changeState({ text1 : 'Tech Tab allows for upgrades to your', text2 : 'current buildings and to add more.' });
    }
    // Supply text change
    PointOut(type) {
        this.props.changeState({ text1 : 'This is your ' + type + ' resource', text2 : 'the + is what you gain per round' });
    }
    // Resource tab text change
    ResourceSwap() {
        this.props.changeState({ text1 : 'Welcome to the Resource Tab', text2 : 'Click a Resource to begin' });
    }

    // Access to Capital change
    Capital() {
        // Text change
        this.props.changeState({ text1 : 'Your Capital Building that', text2 : `gains ${this.props.resAdd} research per round.` });

        // makes sure that its just Capital menu
        this.props.changeState({upgrade: false, build: false, capital: true});

        // changes what resource amount players see
        if (this.props.capitalTier === 1) {
            CWood = 8;
            CFood = 5;
            CMetal = 7;
            CStone = 4;
            COil = 3;
            CRes = 6;
        }
        else if (this.props.capitalTier === 2) {
            CWood = 8;
            CFood = 5;
            CMetal = 7;
            CStone = 4;
            COil = 3;
            CRes = 6;
        }
        else if (this.props.capitalTier === 3) {
            CWood = 8;
            CFood = 5;
            CMetal = 7;
            CStone = 4;
            COil = 3;
            CRes = 6;
        }
        else if (this.props.capitalTier === 4) {
            CWood = 8;
            CFood = 5;
            CMetal = 7;
            CStone = 4;
            COil = 3;
            CRes = 6;
        }
        else if (this.props.capitalTier === 4) {
            CWood = 8;
            CFood = 5;
            CMetal = 7;
            CStone = 4;
            COil = 3;
            CRes = 6;
        }
    }
    // Upgrading Capital
    CapitalUpgrade() {
        if (this.props.wood >= 8 && this.props.food >= 5 && this.props.metal >= 7 && this.props.stone >= 4 && this.props.oil >= 3 && this.props.capitalTier === 1) {
            console.log('Capital Upgrade Complete 2');
            this.props.changeState({ capitalTier : 2,
            wood : this.props.wood - 8,
            food : this.props.food - 5,
            metal : this.props.metal - 7,
            stone : this.props.stone - 4,
            oil : this.props.oil - 3,
            resAdd : this.props.resAdd + 6 });
        }
        else if (this.props.wood >= 8 && this.props.food >= 5 && this.props.metal >= 7 && this.props.stone >= 4 && this.props.oil >= 3 && this.props.capitalTier === 2) {
            console.log('Capital Upgrade Complete 3');
            this.props.changeState({ capitalTier : 3,
            wood : this.props.wood - 8,
            food : this.props.food - 5,
            metal : this.props.metal - 7,
            stone : this.props.stone - 4,
            oil : this.props.oil - 3,
            resAdd : this.props.resAdd + 6 });
        }
        else if (this.props.wood >= 8 && this.props.food >= 5 && this.props.metal >= 7 && this.props.stone >= 4 && this.props.oil >= 3 && this.props.capitalTier === 3) {
            console.log('Capital Upgrade Complete 4');
            this.props.changeState({ capitalTier : 4,
            wood : this.props.wood - 8,
            food : this.props.food - 5,
            metal : this.props.metal - 7,
            stone : this.props.stone - 4,
            oil : this.props.oil - 3,
            resAdd : this.props.resAdd + 6 });
        }
        else if (this.props.wood >= 8 && this.props.food >= 5 && this.props.metal >= 7 && this.props.stone >= 4 && this.props.oil >= 3 && this.props.capitalTier === 4) {
            console.log('Capital Upgrade Complete 5');
            this.props.changeState({ capitalTier : 5,
            wood : this.props.wood - 8,
            food : this.props.food - 5,
            metal : this.props.metal - 7,
            stone : this.props.stone - 4,
            oil : this.props.oil - 3,
            resAdd : this.props.resAdd + 6 });
        }
        else {
            console.log('Capital Upgrade Failed');
            this.props.changeState({ text1 : 'Cant Upgrade' });
            if (this.props.capitalTier === 5) {
                this.props.changeState({ text2 : 'Max Upgrade' });
            }
            else {
                this.props.changeState({ text2 : 'Not Enough Resources' });
            }
        }
        this.props.changeState({capital: false});
    }

    // Upgrades Buildings
    Upgrader() {
        this.props.changeState({ text1 : 'This Upgrades what', text2 : 'Building is Selected' });
        let locate = BUType;
        console.log(locate + ' var');
        console.log(BUModel + ' redux');

        console.log('research type : ' + this.props.research[locate + this.props.builtTier[BUModel]]);

        if (this.props.builtTier[BUModel] === 't1') {
            console.log('t1 selected');
            console.log(BUType);
            select = TierTwo[locate];
            console.log(`${select} ${locate} ${BUModel}`);
            if (this.props.wood >= select[0] && this.props.food >= select[1] && this.props.metal >= select[2] && this.props.stone >= select[3] && this.props.oil >= select[4] && this.props.research[locate + this.props.builtTier[BUModel]] === true) {
                // Remove building picture to be replaced by new building
                tempvar = this.props.built;
                tempvar[BUModel] = '';
                this.props.changeState({ built : tempvar });
                this.forceUpdate();
                // Remove Cost
                tempvar = this.props.wood - select[0];
                console.log(tempvar);
                this.props.changeState({ wood : tempvar });
                tempvar = this.props.food - select[1];
                console.log(tempvar);
                this.props.changeState({ food : tempvar });
                tempvar = this.props.metal - select[2];
                console.log(tempvar);
                this.props.changeState({ metal : tempvar });
                tempvar = this.props.stone - select[3];
                console.log(tempvar);
                this.props.changeState({ stone : tempvar });
                tempvar = this.props.oil - select[4];
                console.log(tempvar);
                this.props.changeState({ oil : tempvar });
                // change to Tier 2
                tempvar = this.props.builtTier;
                console.log(tempvar);
                tempvar[BUModel] = 't2';
                this.props.changeState({ builtTier : tempvar });
                console.log(this.props.builtTier)
                // Replace building type
                tempvar = this.props.built;
                tempvar[BUModel] = BUType;
                this.props.changeState({ built : tempvar });
                this.forceUpdate();
            }
            else {
                console.log('not enough resources');
                console.log('cost = ' + TierTwo[locate]);
            }
        }
        else if (this.props.builtTier[BUModel] === 't2') {
            console.log('t2 selected');
            select = TierThree[locate];
            if (this.props.wood >= select[0] && this.props.food >= select[1] && this.props.metal >= select[2] && this.props.stone >= select[3] && this.props.oil >= select[4] && this.props.research[locate + this.props.builtTier[BUModel]] === true) {
                // Remove building picture to be replaced by new building
                tempvar = this.props.built;
                tempvar[BUModel] = '';
                this.props.changeState({ built : tempvar });
                this.forceUpdate();
                // Remove Cost
                tempvar = this.props.wood - select[0];
                console.log(tempvar);
                this.props.changeState({ wood : tempvar });
                tempvar = this.props.food - select[1];
                console.log(tempvar);
                this.props.changeState({ food : tempvar });
                tempvar = this.props.metal - select[2];
                console.log(tempvar);
                this.props.changeState({ metal : tempvar });
                tempvar = this.props.stone - select[3];
                console.log(tempvar);
                this.props.changeState({ stone : tempvar });
                tempvar = this.props.oil - select[4];
                console.log(tempvar);
                this.props.changeState({ oil : tempvar });
                // change to Tier 2
                tempvar = this.props.builtTier;
                console.log(tempvar);
                tempvar[BUModel] = 't3';
                this.props.changeState({ builtTier : tempvar });
                console.log(this.props.builtTier)
                // Replace building type
                tempvar = this.props.built;
                tempvar[BUModel] = BUType;
                this.props.changeState({ built : tempvar });
                this.forceUpdate();
            }
            else {
                console.log('not enough resources');
            }
        }
        else {

        }
        this.asset('');
        this.props.changeState({ build: false, upgrade: false });
        this.forceUpdate();
    }

    render() {
        return (
            <div className='playerBase'>
                <div id='text'>
                    <div id="lefttext">
                        <a className="round">
                            Round
                        </a>
                        <a className="round">
                            {this.props.round}
                        </a>
                    </div>
                    <div id="righttext">
                        <a>
                            {this.props.text1}
                        </a>
                        <a>
                            {this.props.text2}
                        </a>
                    </div>
                </div>
                <div id="center">
                    <div id="resourcesLeft">
                        <a>Supplies</a>
                        <div onClick={() => this.PointOut('Wood')}>
                            <img src="./assets/wood.svg"></img>
                            {this.props.wood}
                        </div>
                        <a onClick={() => this.PointOut('Wood')}>
                            + {this.props.woodAdd}
                        </a>
                        <div onClick={() => this.PointOut('Food')}>
                            <img src="./assets/food.svg"></img>
                            {this.props.food}
                        </div>
                        <a onClick={() => this.PointOut('Food')}>
                            + {this.props.foodAdd}
                        </a>
                        <div onClick={() => this.PointOut('Metal')}>
                            <img src="./assets/metal.svg"></img>
                            {this.props.metal}
                        </div>
                        <a onClick={() => this.PointOut('Metal')}>
                            + {this.props.metalAdd}
                        </a>
                        <div onClick={() => this.PointOut('Stone')}>
                            <img src="./assets/stone.svg"></img>
                            {this.props.stone}
                        </div>
                        <a onClick={() => this.PointOut('Stone')}>
                            + {this.props.stoneAdd}
                        </a>
                        <div onClick={() => this.PointOut('Oil')}>
                            <img src="./assets/oil.svg"></img>
                            {this.props.oil}
                        </div>
                        <a onClick={() => this.PointOut('Oil')}>
                            + {this.props.oilAdd}
                        </a>
                        <div onClick={() => this.PointOut('Population')}>
                            <img src="./assets/pop.svg"></img>
                            {this.props.pop}
                        </div>
                        <div onClick={() => this.PointOut('Research')}>
                            <img src="./assets/res.svg"></img>
                            {this.props.res}
                        </div>
                        <a onClick={() => this.PointOut('Research')}>
                            + {this.props.resAdd}
                        </a>
                        <div onClick={() => this.PointOut('Troop')}>
                            <img src="./assets/troop.svg"></img>
                            {this.props.troop}
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
                            {/* the Capital of your Outpost */}
                            <div id="middleM" onClick={() => this.Capital()}>
                                <img src={this.asset('HQ')}></img>
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
                        <div className="scroll">
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
                        <div className="scroll">
                            <div onClick={() => this.Upgrader()}>
                                Upgrade
                                <div>
                                    <a><img src="./assets/wood.svg"></img> - {this.props.BUFood}</a>
                                    <a><img src="./assets/food.svg"></img> - {this.props.BUWood}</a>
                                    <a><img src="./assets/metal.svg"></img> - {this.props.BUMetal}</a>
                                    <a><img src="./assets/stone.svg"></img> - {this.props.BUStone}</a>
                                    <a><img src="./assets/oil.svg"></img> - {this.props.BUOil}</a>
                                </div>
                                <div>
                                    <a><img src="./assets/pop.svg"></img> + {this.props.BUPop}</a>
                                    <a><img src="./assets/pop.svg"></img> + {this.props.BUPopM}%</a>
                                    <a><img src="./assets/troop.svg"></img> + {this.props.BUBattleSurvive}%</a>
                                    <a><img src="./assets/res.svg"></img> + {this.props.BUResearch}</a>
                                    <a><img src="./assets/flag.svg"></img> + {this.props.BUBattleWining}%</a>
                                </div>
                            </div>
                            <div onClick={() => this.Deconstruct()}>
                                Destroy
                            </div>
                        </div> : ''}

                        {/* Capital */}
                        {this.props.capital ?
                        <a className="buildMenuTitle">
                            Capital
                        </a> : ''}
                        {this.props.capital ?
                        <div className="scroll">
                            <div>
                                Tier {this.props.capitalTier}/5
                            </div>
                            <div onClick={() => this.CapitalUpgrade()}>
                                Upgrade
                                <div>
                                    <a><img src="./assets/wood.svg"></img> - {CWood}</a>
                                    <a><img src="./assets/food.svg"></img> - {CFood}</a>
                                    <a><img src="./assets/metal.svg"></img> - {CMetal}</a>
                                    <a><img src="./assets/stone.svg"></img> - {CStone}</a>
                                    <a><img src="./assets/oil.svg"></img> - {COil}</a>
                                    <a><img src="./assets/res.svg"></img> + {CRes}</a>
                                </div>
                            </div>
                        </div> : '' }
                    </div>
                </div>
                <div id="bottomTabs">
                    <Link to="/NextRound" id="nextRound" className="bTab">
                        Next Round
                    </Link>
                    <Link to="/TechnologyMenu" id="techTab" className="bTab" onClick={() => this.TechText()}>
                        Tech
                    </Link>
                    <Link to="/ResourcePage" id="resourceTab" className="bTab" onClick={() => this.ResourceSwap()}>
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