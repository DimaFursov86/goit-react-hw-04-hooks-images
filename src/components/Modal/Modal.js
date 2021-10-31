import React, { Component } from "react";

import s from "./Modal.module.scss";
import PropTypes from "prop-types";

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={s.ModalBackdrop} onClick={this.handleBackdropClick}>
        <div className={s.ModalContent}>
          <img className={s.imgpoz} src={this.props.src} alt="" />
        </div>
      </div>
    );
  }
}
