import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ModalButton from "./ModalButton";

class MultiModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      body: "",
      buttonText: "",
      subId: "",
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      ...props,
    });
  }

  render() {
    return (
      <Modal show={this.state.isOpen}>
        <Modal.Header
          closeButton
          onClick={() => this.props.handleAlertClose()}
        ></Modal.Header>
        <Modal.Body>{this.state.body}</Modal.Body>
        <Modal.Footer>
          <ModalButton
            buttonText={this.state.buttonText}
            handleAlertClose={() => this.props.handleAlertClose}
            actionIfTrue={() => this.props.actionIfTrue(this.state.subId)}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MultiModal;
