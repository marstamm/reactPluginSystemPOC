const restClient = {

  path: 'http://localhost:8080/engine-rest/',

  processDefinition: {
    path: 'http://localhost:8080/engine-rest/process-definition',
    list: function(params) {
      console.log(this.path, this);
      return new Promise((resolve, reject) => {
      fetch(this.path,
        {method: 'GET',
        body: JSON.stringify(params)})
        .then(res => {
          res.json().then(res => resolve(res));
        })
        .catch( err =>
          reject(err));
        }
      )
    }
  },

}

export default restClient;