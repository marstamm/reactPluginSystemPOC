import React from 'react'
import angular from 'angular'
import 'bootstrap';

angular
  .module('ngApp', ['ui.bootstrap.datetimepicker'])

class AngularWrapper extends React.Component {
  componentDidMount () {
    angular.bootstrap(this.container, ['ngApp']);
  }

  html = `<datetimepicker data-ng-model="data.date"></datetimepicker>`;

  render = () => (
    <div
      ref={c => this.container = c}
      dangerouslySetInnerHTML={{__html: this.html}}
      />
  );
}

export default AngularWrapper;