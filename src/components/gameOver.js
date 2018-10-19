import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../js/actions';

class GameOver extends Component {

    render() {
        return (
            <div className='gameOver'>
                <a>
                    GameOver
                </a>
                <div id="gocenter">
                    <a id="goscore">
                        Score
                    </a>
                    <a>
                        {this.props.score}
                    </a>
                </div>
                <div id="gobottom">
                    <a>
                        Won
                    </a>
                    <a>
                        {this.props.battleWon}
                    </a>
                    <a>
                        Battles
                    </a>
                </div>
                <div>
                    <Link to="/" onClick={() => window.location.reload() }>
                        Play Again?
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

GameOver = connect(mapStateToProps, actions)(GameOver);

export default GameOver;