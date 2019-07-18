import React from 'react'
import camAPI from './services/restClient'
import ProcessList from './plugins/processList'

class ProcessDashboard extends React.Component {
  state = {
    processList: null
  }

  componentDidMount() {
    this._asyncRequest = camAPI.processDefinition.list()
      .then(data => {
        this.setState({processList: data});
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    if(this.state.processList === null) {
      return <div>Loading....</div>
    } else {
      return <div>
        <ProcessList processList={this.state.processList}></ProcessList>
      </div>
    }
  }
}

export default ProcessDashboard