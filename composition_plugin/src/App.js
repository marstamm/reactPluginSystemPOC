import React from 'react';
import Dashboard from './routes/ProcessDashboard';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import plugins from './plugins/index';

import ProcessDefinition from './routes/ProcessDefinition';
import {PluginContext} from './contexts/PluginContext';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {plugins: plugins.getPlugins()};
  }

  render() {
    return (
      <Router>
        <PluginContext.Provider value={this.state.plugins}>
          <Route path="/processes" component={Dashboard} />
          <Route path="/process-definition/:id" component={ProcessDefinition} />
        </PluginContext.Provider>
      </Router>
    );
  }
}
