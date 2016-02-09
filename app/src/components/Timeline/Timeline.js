import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import './Timeline.scss';


export default class Timeline extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="timeline">
            <div className="te__item te__item__active">
                <div className="te__title">Without Avatar</div>
                <div className="te__subtitle">Subtitle</div>
            </div>
            <div className="te__item">
                <div className="te__title">Without Avatar</div>
                <div className="te__subtitle">Subtitle</div>
            </div>
            <div className="te__item">
                <div className="te__title">Without Avatar</div>
                <div className="te__subtitle">Subtitle</div>
            </div>

            <div className="te__item">
                <div className="te__title">Without Avatar</div>
                <div className="te__subtitle">Subtitle</div>
            </div>
            <div className="te__item">
                <div className="te__title">Without Avatar</div>
                <div className="te__subtitle">Subtitle</div>
            </div>

            <div className="te__item">
                <div className="te__title">Without Avatar</div>
                <div className="te__subtitle">Subtitle</div>
            </div>
            <div className="te__item">
                <div className="te__title">Without Avatar</div>
                <div className="te__subtitle">Subtitle</div>
            </div>
        </div>
        );
    }
} 

