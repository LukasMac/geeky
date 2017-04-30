import React, { PropTypes } from 'react';

import GithubPullRequestsView from 'features/githubPullRequests/components/GithubPullRequestsView';
import BackgroundView from 'features/background/components/BackgroundView';
import Settings from 'features/settings/components/SettingsView';

const App = (props) => (
  <div>
    {/*{React.cloneElement({...props}.children, {...props})}*/}
    <BackgroundView />
    <GithubPullRequestsView />
    <Settings />
  </div>
);

// App.propTypes = {
//   children: PropTypes.element.isRequired
// };

export default App;
