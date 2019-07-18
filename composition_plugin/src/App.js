import React from 'react'
import Dashboard from './ProcessDashboard'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ProcessDefinition from './ProcessDashboard'

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Route path="/processes" component={Dashboard} />
        <Route path="/process-definition" component={ProcessDefinition} />
      </Router>
    )
  }
}