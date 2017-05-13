import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { actionCreators as settingsActions, selector } from '../';

import SettingsModal from './SettingsModal';
import SettingsAlert from './SettingsAlert';

import './SettingsView.scss';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(settingsActions, dispatch)
}))
export default class Settings extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="settings">
        <SettingsAlert settings={this.props.settings.persisted} />
        <Button
          onClick={this.props.actions.click}
          bsStyle="link">Settings</Button>
        <SettingsModal {...this.props.settings} actions={this.props.actions} />
      </div>
    )
  }
}
