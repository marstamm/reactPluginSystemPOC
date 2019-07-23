import React, {useState, useEffect} from 'react';
import camAPI from '../services/restClient';
// import Table from '../components/Table';
import SortableTable from '../components/SortableTable';
import {ProcessDefinitionContext} from '../contexts/ProcessDefinitionContext';

function ProcessInstances(props) {

  const handleSortChange = (newSortObj, oldSortObj, setSortObj) => {
    // do stuff
    console.log(newSortObj, oldSortObj);

    let sorting = {sortBy: newSortObj.request, sortOrder: 'asc'};

    if (newSortObj.request === oldSortObj.sortBy) {
      console.log('Foobar', newSortObj.sortOrder);
      sorting.sortOrder = oldSortObj.sortOrder === 'desc' ? 'asc' : 'desc';
    }


      console.log(sorting, oldSortObj);
    // setProcessList(null);
    setSortObj(sorting);
    // updateList(sorting, setProcessList);
  };

  // prettier-ignore
  const headerConfig = [
    { class: 'state',        request: 'state',       sortable: false, content: 'State'},
    { class: 'instance-id',  request: 'instanceId',  sortable: true, content: 'ID'},
    { class: 'business-key', request: 'businessKey', sortable: true, content: 'Business Key'}
  ];

  const [processList, setProcessList] = useState(null);
  const [sortObj, setSortObj] = useState({
    sortBy: 'instanceId',
    sortOrder: 'asc'
  });

  useEffect(() => {
    const updateList = (sorting, setState) => {
      setState(null);
      camAPI.processInstance
        .list({
          processDefinitionId: props.processDefinition.id,
          ...sorting
        })
        .then(data => {
          console.log(data);
          setState(data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    function setState(state) {
      setProcessList(state);
    }
    updateList(sortObj, setState);
  }, [props.processDefinition.id, sortObj]);

  console.log('processList', processList);
  if (processList === null) {
    return <div>Loading...</div>;
  } else {
    console.log('processList', processList);
    const tableContent = processList.map(instance => {
      return [instance.suspended, instance.id, instance.businessKey];
    });

    return (
      <div>
        <SortableTable
          onSortChange={newSortObj =>
            handleSortChange(newSortObj, sortObj, setSortObj)
          }
          sorting={sortObj}
          headers={headerConfig}
          content={tableContent}
        />
      </div>
    );
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
