import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {ProcessDefinitionsContext} from '../contexts/ProcessDefinitionsContext';

function processList() {
  return (
    <ProcessDefinitionsContext.Consumer>
      {processList => {
        console.log(processList);
        return (
          <section>
            <h3>{processList.length} process definitions deployed</h3>
            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Name</th>
                    <th>History View</th>
                    <th>Tennant</th>
                  </tr>
                </thead>
                <tbody>
                  {processList.map(definition => {
                    return (
                      <tr key={definition.id}>
                        <td>{definition.version}</td>
                        <td>
                          <Link to={'/process-definition/' + definition.id}>
                            {definition.name || definition.key}
                          </Link>
                        </td>
                        <td>History</td>
                        <td>{definition.tennantId}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
      }}
    </ProcessDefinitionsContext.Consumer>
  );
}

export default {
  id: 'process-list',
  entry: 'cockpit.processes',
  component: processList
};
