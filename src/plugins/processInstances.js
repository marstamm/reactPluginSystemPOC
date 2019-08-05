import React, {useState, useEffect, useContext} from 'react';
import camAPI from '../services/restClient';
// import Table from '../components/Table';
import SortableTable from '../components/SortableTable';
import {ProcessDefinitionContext} from '../contexts/ProcessDefinitionContext';

function ProcessInstances() {
  const processDefinition = useContext(ProcessDefinitionContext);

  const handleSortChange = (newSortObj, oldSortObj, setSortObj) => {
    let sorting = {sortBy: newSortObj.request, sortOrder: 'asc'};

    if (newSortObj.request === oldSortObj.sortBy) {
      sorting.sortOrder = oldSortObj.sortOrder === 'desc' ? 'asc' : 'desc';
    }
    setSortObj(sorting);
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
    const updateList = sorting => {
      setProcessList(null);
      camAPI.processInstance
        .list({
          processDefinitionId: processDefinition.id,
          ...sorting
        })
        .then(data => {
          setProcessList(data);
        })
        .catch(e => {
          console.error(e);
        });
    };

    updateList(sortObj);
  }, [processDefinition.id, sortObj]);

  if (processList === null) {
    return <div>Loading...</div>;
  } else {
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

export default {
  id: 'processInstances',
  label: 'Process Instances',
  entry: 'cockpit.process.definition.tab',
  component: ProcessInstances
};
