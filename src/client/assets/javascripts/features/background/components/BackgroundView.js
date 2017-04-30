import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import { actionCreators as backgroundActions, selector } from '../';

import './BackgroundView.scss';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(backgroundActions, dispatch)
}))
export default class Background extends Component {
  constructor() {
    super();
    this.getBackground = this.getBackground.bind(this);
  }

  componentDidMount() {
    if (!Array.isArray(this.props.background) || this.props.background.length < 1) {
      return this.props.actions.requestBackgroundsMetadata();
    }
  }

  getBackground() {
    const background = this.props.background;
    if (background && Array.isArray(background.backgrounds) && background.backgrounds.length > 0) {
      return background.backgrounds[0];
    }

    return {};
  }

  render() {
    return (
      <div>
        <div className="background-overlay fadein"></div>
        <div className="background fadein" style={{ backgroundImage: `url(${this.getBackground().filename})` }}>
          <div className="title">{this.getBackground().title}</div>
        </div>
      </div>
    );
  }
}

