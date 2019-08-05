import React, {useState, useEffect} from 'react';
import camAPI from '../services/restClient';
import {PluginContext} from '../contexts/PluginContext';
import SideBar from '../components/SideBar';
import Page from '../components/Page';
import Tabs from '../components/Tabs';
import queryString from 'query-string';
import ProcessDetails from '../components/ProcessDetails';
import BPMNDiagram from '../components/BPMNDiagram';
import {ProcessDefinitionContext} from '../contexts/ProcessDefinitionContext';
import ProcessDashboard from './ProcessDashboard';

const ProcessDefinition = props => {
  const [processDetails, setProcessDetails] = useState(null);
  const [BPMNXml, setBPMNXml] = useState('');

  useEffect(() => {
    camAPI.processDefinition.xml(props.match.params.id).then(data => {
      setBPMNXml(data.bpmn20Xml);
    });

    camAPI.processDefinition
      .get(props.match.params.id)
      .then(data => {
        setProcessDetails(data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [props.match.params.id]);

  if (processDetails === null) {
    return <div>Loading....</div>;
  } else {
    return (
      <Page>
        <ProcessDefinitionContext.Provider value={processDetails}>
          <SideBar key="sidebar">
            <ProcessDetails processDetails={processDetails} />
            <br />
            <hr />
            <ProcessDashboard processDetails={processDetails} />
          </SideBar>
          <div key="main" className="w-100">
            <div
              style={{
                height: '500px',
                width: '100%'
              }}
            >
              <BPMNDiagram xml={BPMNXml} />
            </div>
            <PluginContext.Consumer>
              {plugins => {
                let TabContent;
                const query = queryString.parse(props.location.search);
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
};

export default ProcessDefinition;
