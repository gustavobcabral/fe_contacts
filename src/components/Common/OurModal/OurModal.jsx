import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class OurModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false };
  }

  setModalShow = (visibility) => {
    this.setState({ modalShow: visibility });
  };

  onHide = () => this.setModalShow(false);
  onShow = () => this.setModalShow(true);

  render() {
    const { buttonText, title, size, onEnter, onExit, t, dialogClassName } = this.props;
    const { modalShow } = this.state;
    const Component = this.props.body;
    return (
      <>
        <Button variant="primary" onClick={this.onShow}>
          {buttonText || t("open")}
        </Button>

        <Modal
          show={modalShow}
          onHide={this.onHide}
          onEnter={onEnter}
          onExit={onExit}
          size={size || "lg"}
          centered
          dialogClassName={dialogClassName}
        >
          <Modal.Header closeButton>
            <Modal.Title>{title || "Title"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Component {...this.props} onHide={this.onHide}  />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onHide}>
              {t("close")}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default withTranslation(["common"])(OurModal);
