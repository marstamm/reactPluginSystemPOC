import React from 'react';
import camAPI from '../services/restClient';
import {PluginContext} from '../contexts/PluginContext';
import SideBar from '../components/SideBar';
import Page from '../components/Page';
import Tabs from '../components/Tabs';
import queryString from 'query-string';
import ProcessDetails from '../components/ProcessDetails';
import BPMNDiagram from '../components/BPMNDiagram';
import {ProcessDefinitionContext} from '../contexts/ProcessDefinitionContext';
import processList from '../plugins/processList';
import ProcessDashboard from './ProcessDashboard';

class ProcessDefinition extends React.Component {
  state = {
    processDetails: null,
    BPMNXml: '',
    processId: null
  };

  componentDidMount() {
    this.fetchProcessDetails();
  }

  fetchProcessDetails = () => {
    this._asyncRequest = camAPI.processDefinition
      .get(this.props.match.params.id)
      .then(data => {
        this.setState({processDetails: data});
      })
      .catch(e => {
        console.log(e);
      });
    camAPI.processDefinition.xml(this.props.match.params.id).then(data => {
      this.setState({BPMNXml: data.bpmn20Xml});
      console.log(data);
    });
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchProcessDetails();
    }
  }

  render() {
    console.log(this.state);
    if (this.state.processDetails === null) {
      return <div>Loading....</div>;
    } else {
      return (
        <Page>
          <ProcessDefinitionContext.Provider value={this.state.processDetails}>
            <SideBar key="sidebar">
              <ProcessDashboard processDetails={this.state.processDetails} />
            </SideBar>
            <div key="main" className="w-100">
              <div
                style={{
                  height: '500px',
                  width: '100%'
                }}
              >
                <BPMNDiagram xml={this.state.BPMNXml} />
              </div>
              <PluginContext.Consumer>
                {plugins => {
                  let TabContent;
                  const query = queryString.parse(this.props.location.search);
                  const tabs = plugins['cockpit.process.definition.tab'].map(
                    plugin => {
                      if (plugin.id === query.activeTab) {
                        TabContent = plugin.component;
                      }
                      return {text: plugin.label, id: plugin.id};
                    }
                  );

                  if (!TabContent) {
                    TabContent =
                      plugins['cockpit.process.definition.tab'][0].component;
                  }

                  return [
                    <Tabs labels={tabs} key="tabs" className="w-100" />,
                    <TabContent key="tabContenet" />
                  ];
                }}
              </PluginContext.Consumer>
            </div>
          </ProcessDefinitionContext.Provider>
        </Page>
      );
    }
  }
}

export default ProcessDefinition;
