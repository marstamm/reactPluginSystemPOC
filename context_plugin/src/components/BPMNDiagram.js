import React from 'react';

import BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';

export default class BPMNDiagram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const {xml} = this.props;

    const container = this.containerRef.current;

    this.bpmnViewer = new BpmnJS({container});

    this.bpmnViewer.on('import.done', event => {
      const {error, warnings} = event;

      if (error) {
        return this.handleError(error);
      }

      this.bpmnViewer.get('canvas').zoom('fit-viewport');

      this.setState({diagramXML: xml});

      return this.handleShown(warnings);
    });
  }

  componentWillUnmount() {
    this.bpmnViewer.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const {props, state} = this;

    if (props.xml !== prevProps.xml) {
      this.setState({diagramXML: props.xml});
    }

    if (state.diagramXML !== prevState.diagramXML) {
      return this.bpmnViewer.importXML(state.diagramXML);
    }
  }

  handleLoading() {
    const {onLoading} = this.props;

    if (onLoading) {
      onLoading();
    }
  }

  handleError(err) {
    const {onError} = this.props;

    if (onError) {
      onError(err);
    }
  }

  handleShown(warnings) {
    const {onShown} = this.props;

    if (onShown) {
      onShown(warnings);
    }
  }

  render() {
    return (
      <div
        className="react-bpmn-diagram-container h-100 w-100"
        style={{backgroundColor: 'beige'}}
        ref={this.containerRef}
      ></div>
    );
  }
}
