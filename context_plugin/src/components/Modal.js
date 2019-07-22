import React from 'react';
import './modal.css';

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    console.log(this.props);
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="myModal" id="modal">
        <h2></h2>
        <div class="myModalContent">{this.props.children}</div>
        <div class="actions">
          <button onClick={this.onClose}>❌</button>
        </div>
      </div>
    );
  }
}
