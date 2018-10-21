import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { changeState } from '../js/actions';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class MainMenu extends Component {

    startGame() {
        this.props.changeState({ text1 : 'Welcome to WWOutpost' });
        this.props.changeState({ text2 : 'Click a Yellow square to start' });
    }

    render() {
        return (
            <div className='mainMenu'>
                <div id="title">
                    WWOutpost
                </div>
                <Link to="/PlayerBase" id="start" onClick={() => this.startGame()}>
                    Start
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

MainMenu = connect(mapStateToProps, actions)(MainMenu);

export default MainMenu;