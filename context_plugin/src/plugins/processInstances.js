import React from 'react';
import camAPI from '../services/restClient';
// import Table from '../components/Table';
import SortableTable from '../components/SortableTable';
import {ProcessDefinitionContext} from '../contexts/ProcessDefinitionContext';

class ProcessInstances extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      processList: null,
      sortObj: {sortBy: 'instanceId', sortOrder: 'desc'}
    };
  }

  componentDidMount() {
    this.updateList({sortBy: 'instanceId', sortOrder: 'desc'});
  }

  updateList = sorting => {
    this._asyncRequest = camAPI.processInstance
      .list({
        processDefinitionId: this.props.processDefinition.id,
        ...sorting
      })
      .then(data => {
        console.log(data);
        this.setState({processList: data, sortObj: sorting});
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
      this.updateList({sortBy: 'instanceId', sortOrder: 'desc'});
    }
  }

  // prettier-ignore
  headerConfig = [
    { class: 'state',        request: 'state',       sortable: false, content: 'State'},
    { class: 'instance-id',  request: 'instanceId',  sortable: true, content: 'ID'},
    { class: 'business-key', request: 'businessKey', sortable: true, content: 'Business Key'}
  ];

  render() {
    if (this.state.processList === null) {
      return <div>Loading...</div>;
    } else {
      const tableContent = this.state.processList.map(instance => {
        return [instance.suspended, instance.id, instance.businessKey];
      });

      return (
        <div>
          <SortableTable
            onSortChange={this.handleSortChange}
            sorting={this.state.sortObj}
            headers={this.headerConfig}
            content={tableContent}
          />
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
  id: 'processInstances',
  label: 'Process Instances',
  entry: 'cockpit.process.definition.tab',
  component: Wrapper
};
