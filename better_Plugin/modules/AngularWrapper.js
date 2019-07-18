// import React from 'react'
import angular from 'angular'
// import 'bootstrap'
// import 'angular-bootstrap'
import '../libs/ui-bootstrap-tpls-2.5.0'
import template from '../angular/template'
import controller from '../angular/controller'

angular
  .module('ngApp', ['ui.bootstrap'])


class AngularWrapper extends React.Component {
  constructor (props) {
    super(props);

    const that = this;
    angular.module('ngApp').factory('processInstance', function() {
      console.log(props.processInstance);
      return {id: props.processInstance,
        getId: () => {return that.props.processInstance}
      };
    });

    angular.module('ngApp').controller('DatepickerDemoCtrl', controller);

  }


  componentDidMount () {
    this.$rootScope = angular.injector(['ng', 'ngApp']).get('$rootScope');

    angular.bootstrap(this.container, ['ngApp']);
  }
  componentWillUnmount() {
    this.$rootScope.$destroy();
  }

  // componentWillReceiveProps = newProps => {
  // }

  html = template;

  render = () => {
    console.log('rerender', this.props.processInstance);
    return (
    <div>
      <h1>This is rendered in Angular:</h1>
      <div
        ref={c => this.container = c}
        dangerouslySetInnerHTML={{__html: this.html}}
      />
    </div>
    );
  }
}

export default AngularWrapper;