import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import GithubPullRequestsView from 'features/githubPullRequests/components/GithubPullRequestsView';
import BackgroundView from 'features/background/components/BackgroundView';
import TwitterFeedView from 'features/twitterFeed/components/TwitterFeedView';
import Settings from 'features/settings/components/SettingsView';

const App = (props) => (
  <div>
    {/*{React.cloneElement({...props}.children, {...props})}*/}
    <BackgroundView />
    <Row>
      <Col xs={6} md={4}>
      </Col>
      <Col xs={6} md={4}>
        <GithubPullRequestsView />
      </Col>
      <Col xs={6} md={4}>
        <TwitterFeedView />
      </Col>
    </Row>
    <Settings />
  </div>
);

export default App;
