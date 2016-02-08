import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Toggle from 'material-ui/lib/toggle';
import RaisedButton from 'material-ui/lib/raised-button';


import './Settings.scss';

export default class Writer extends Component {
  render() {

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};
      
    return (
      <div className="settings">
        <div className="settings__header">Settings</div>
        <div className="settings__form">
            <div className="settings__section">
            <label>Name:</label>
                 <TextField
                hintText="Hint Text"
                />
            </div>
            <div className="settings__section">
                <label>Name:</label>
                <TextField
                hintText="Hint Text"
                />
            </div>

            <div className="settings__section">
                <Toggle
                label="Simple"
                style={styles.toggle}
                />
                <Toggle
                label="Toggled by default"
                defaultToggled={true}
                style={styles.toggle}
                />
                <Toggle
                label="Disabled"
                disabled={true}
                style={styles.toggle}
                />
                <Toggle
                label="Label on the right"
                labelPosition="right"
                style={styles.toggle}
                />
            </div>

            <div className="settings__section">
                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
      <RadioButton
        value="light"
        label="Simple"
        style={styles.radioButton}
      />
      <RadioButton
        value="not_light"
        label="Selected by default"
        style={styles.radioButton}
      />
      <RadioButton
        value="ludicrous"
        label="Disabled"
        disabled={true}
        style={styles.radioButton}
      />
    </RadioButtonGroup>

    <RadioButtonGroup name="notRight" labelPosition="left" style={styles.block}>
      <RadioButton
        value="reverse"
        label="Label on the left"
        style={styles.radioButton}
      />
    </RadioButtonGroup>
            </div>

    <RaisedButton label="Primary" primary={true} />
            
        </div>
      </div>
    );
  }
} 

