import React from 'react';
import camAPI from '../services/restClient';
// import ProcessList from './plugins/processList';
import {PluginContext} from '../contexts/PluginContext';
import {ProcessDefinitionsContext} from '../contexts/ProcessDefinitionsContext';

class ProcessDashboard extends React.Component {
  state = {
    processList: null
  };

  componentDidMount() {
    this._asyncRequest = camAPI.processDefinition
      .list()
      .then(data => {
        this.setState({processList: data});
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    console.log(this.state);
    if (this.state.processList === null) {
      return <div>Loading....</div>;
    } else {
      return (
        <ProcessDefinitionsContext.Provider value={this.state.processList}>
          <main class="d-flex flex-column container">
            <PluginContext.Consumer>
              {plugins => {
                return plugins['cockpit.processes'].map(plugin => {
                  const PluginComponent = plugin.component;
                  return (
                    <PluginComponent
                      processList={this.state.processList}
                    ></PluginComponent>
                  );
                });
              }}
            </PluginContext.Consumer>
          </main>
        </ProcessDefinitionsContext.Provider>
      );
    }
  }
}

export default ProcessDashboard;
