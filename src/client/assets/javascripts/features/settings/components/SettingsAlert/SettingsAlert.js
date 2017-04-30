import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';

export default class SettingsAlert extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
  };

  render() {
    if (this.props.settings.githubApiURL && this.props.settings.githubAccessToken) {
      return false;
    }

    return (
      <Alert bsStyle="warning">Please complete all the settings to enable all features</Alert>
    );
  }
}