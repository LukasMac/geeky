import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

import './SettingsModal.scss';

export default class SettingsModal extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    open: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    this.state = { ...this.props.persisted };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value.trim() });
  }

  handleSubmit(e) {
    this.props.actions.save(this.state);
    this.props.actions.close();
  }

  render() {
    if (!this.props.open) {
      return false;
    }

    return (
      <Modal show onHide={this.props.actions.close}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="formHorizontalGithubAPIURL">
              <Col componentClass={ControlLabel} sm={4}>
                Github PRs API URL
              </Col>
              <Col sm={8}>
                <FormControl
                  type="text"
                  placeholder="Github API URL"
                  name="githubApiURL"
                  defaultValue={this.state.githubApiURL}
                  onChange={this.handleChange}
                />
                <small className="grayed-out">E.g. https://api.github.com/repos/rails/rails/pulls</small>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalGithubAccessToken">
              <Col componentClass={ControlLabel} sm={4}>
                Github Access Token
              </Col>
              <Col sm={8}>
                <FormControl
                  type="password"
                  placeholder="Github Access Token"
                  name="githubAccessToken"
                  defaultValue={this.state.githubAccessToken}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <hr />
            <FormGroup controlId="formHorizontalTwitterSearchKeywords">
              <Col componentClass={ControlLabel} sm={4}>
                Twitter search keywords
              </Col>
              <Col sm={8}>
                <FormControl
                  type="text"
                  placeholder="Type search keywords"
                  name="twitterSearchKeywords"
                  defaultValue={this.state.twitterSearchKeywords}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalTwitterConsumerKey">
              <Col componentClass={ControlLabel} sm={4}>
                Twitter Application Consumer Key
              </Col>
              <Col sm={8}>
                <FormControl
                  type="password"
                  placeholder="Enter twitter application consumer key"
                  name="twitterConsumerKey"
                  defaultValue={this.state.twitterConsumerKey}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalTwitterConsumerSecret">
              <Col componentClass={ControlLabel} sm={4}>
                Twitter Application Consumer Secret
              </Col>
              <Col sm={8}>
                <FormControl
                  type="password"
                  placeholder="Enter twitter application consumer secret"
                  name="twitterConsumerSecret"
                  defaultValue={this.state.twitterConsumerSecret}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.actions.close}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>

    );
  }
}
