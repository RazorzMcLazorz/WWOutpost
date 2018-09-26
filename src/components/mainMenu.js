import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MainMenu extends Component {
    render() {
        return (
            <div className='mainMenu'>
                <div id="title">
                    WWOutpost
                </div>
                <Link to="/PlayerBase" id="start">
                    Start
                </Link>
            </div>
        );
    }
}
