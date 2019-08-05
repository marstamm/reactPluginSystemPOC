import queryString from 'query-string';

const restClient = {
  path: 'http://localhost:8081/engine-rest/',

  processDefinition: {
    path: 'http://localhost:8081/engine-rest/process-definition',
    list: function(params) {
      console.log(this.path, this);
      return new Promise((resolve, reject) => {
        fetch(this.path, {method: 'GET', body: JSON.stringify(params)})
          .then(res => {
            res.json().then(res => resolve(res));
          })
          .catch(err => reject(err));
      });
    },

    get: function(id) {
      console.log(this.path, this);
      return new Promise((resolve, reject) => {
        fetch(this.path + '/' + id, {method: 'GET'})
          .then(res => {
            res.json().then(res => resolve(res));
          })
          .catch(err => reject(err));
      });
    },

    xml: function(id) {
      // console.log(this.path, this);
      return new Promise((resolve, reject) => {
        fetch(this.path + '/' + id + '/xml', {method: 'GET'})
          .then(res => {
            res.json().then(res => resolve(res));
          })
          .catch(err => reject(err));
      });
    }
  },

  processInstance: {
    path: 'http://localhost:8081/engine-rest/process-instance',
    list: function(params) {
      console.log(this.path, this);
      return new Promise((resolve, reject) => {
        fetch(this.path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
          .then(res => {
            res.json().then(res => resolve(res));
          })
          .catch(err => reject(err));
      });
    }
  },

  incidents: {
    path: 'http://localhost:8081/engine-rest/incident/',
    get: function(params) {
      return new Promise((resolve, reject) => {
        fetch(this.path + '?' + queryString.stringify(params), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            res.json().then(res => resolve(res));
          })
          .catch(err => reject(err));
      });
    },
    retry: function(id) {
      return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/engine-rest/job/${id}/retries`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            retries: 1
          })
        })
          .then(res => {
            resolve(res);
          })
          .catch(err => reject(err));
      });
    }
  }
};

export default restClient;
