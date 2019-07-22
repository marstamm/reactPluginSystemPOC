import React from 'react';
import camAPI from '../services/restClient';
// import Table from '../components/Table';
import SortableTable from '../components/SortableTable';
import {ProcessDefinitionContext} from '../contexts/ProcessDefinitionContext';
import Modal from '../components/Modal';

class ProcessInstances extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incidentsList: null,
      sortObj: {sortBy: 'activityId', sortOrder: 'desc'},
      show: false
    };
  }

  componentDidMount() {
    this.updateList({sortBy: 'activityId', sortOrder: 'desc'});
  }

  updateList = sorting => {
    this._asyncRequest = camAPI.incidents
      .get({
        processDefinitionId: this.props.processDefinition.id,
        ...sorting
      })
      .then(data => {
        console.log(data);
        this.setState({incidentsList: data, sortObj: sorting});
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleSortChange = sortObj => {
    // do stuff
    let sorting = {sortBy: sortObj.request, sortOrder: 'desc'};

    if (sortObj.request === this.state.sortObj.sortBy)
      sorting.sortOrder =
        this.state.sortObj.sortOrder === 'desc' ? 'asc' : 'desc';

    this.setState({processList: null});
    this.updateList(sorting);
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (prevProps.processDefinition.id !== this.props.processDefinition.id) {
      this.updateList({sortBy: 'activityId', sortOrder: 'desc'});
    }
  }

  // prettier-ignore
  headerConfig = [
    {class: 'message', request: 'incidentMessage', sortable: true, content:'Message'},
    {class: 'process-instance', request: 'processInstanceId', sortable: false, content: 'Process Instance'},
    {class: 'timestamp', request: 'incidentTimestamp', sortable: true, content: 'Timestamp'},
    {class: 'activity', request: 'activityId', sortable: true, content: 'Activity'},
    {class: 'cause instance-id uuid', request: 'causeIncidentProcessInstanceId', sortable: false, content: 'Cause Process Instance ID'},
    {class: 'cause-root instance-id uuid', request: 'rootCauseIncidentProcessInstanceId', sortable: false, content: 'Root Cause Process Instance ID'},
    {class: 'type', request: 'incidentType', sortable: true, content: 'Type'},
    {class: 'action', request: '', sortable: false, content: 'Action'}
  ];

  showModal = (e, id) => {
    console.log('Show modal');
    this.setState({
      show: !this.state.show,
      openedIncident: id
    });
  };

  retryIncident = (e, id) => {
    camAPI.incidents
      .retry(id)
      .then(() => {
        this.setState({
          show: false,
          openedIncident: null
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    if (this.state.incidentsList === null) {
      return <div>Loading...</div>;
    } else {
      const tableContent = this.state.incidentsList.map(incident => {
        return [
          incident.incidentMessage,
          incident.processInstanceId,
          incident.incidentTimestamp,
          incident.activityId,
          incident.causeIncidentProcessInstanceId,
          incident.rootCauseIncidentProcessInstanceId,
          incident.incidentType,
          <button
            onClick={e => {
              this.showModal(e, incident);
            }}
          >
            🔁
          </button>
        ];
      });

      return (
        <div>
          <SortableTable
            onSortChange={this.handleSortChange}
            sorting={this.state.sortObj}
            headers={this.headerConfig}
            content={tableContent}
          />
          <Modal onClose={this.showModal} show={this.state.show}>
            The number of retries of the corresponding failed job of the
            selected incident will be incremented. <br />
            Are you sure to increment the number of retries?
            <br />
            <br />
            <button
              onClick={e =>
                this.retryIncident(e, this.state.openedIncident.configuration)
              }
            >
              🔁
            </button>
          </Modal>
        </div>
      );
    }
  }
}

function Wrapper() {
  return (
    <ProcessDefinitionContext.Consumer>
      {PD => {
        return <ProcessInstances processDefinition={PD} />;
      }}
    </ProcessDefinitionContext.Consumer>
  );
}

export default {
  id: 'processIncidents',
  label: 'Incidents',
  entry: 'cockpit.process.definition.tab',
  component: Wrapper
};
