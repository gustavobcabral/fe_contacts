import React from "react";
import { Nav } from "react-bootstrap";
import { get, getOr } from "lodash/fp";
import FormLogin from "./Form";
import { auth } from "../../services";
import { setLoginData } from "../../utils/loginDataManager";
import Swal from "sweetalert2";
import { withTranslation } from "react-i18next";
import SimpleReactValidator from "simple-react-validator";

const fields = {
  email: "",
  password: "",
};


class LoginPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: fields,
      modalShow: false,
      submitting: false,
      validated: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale:
        this.props.i18n.language === "en-US" ? "en" : this.props.i18n.language,
      element: (message) => <div className="invalid-feedback">{message}</div>,
    });

  }

  handleInputChange(event) {
    const {
      target: { name, value },
    } = event;
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        [name]: value,
      },
    });
  }

  async handleSubmit(event, t) {
    event.stopPropagation();
    event.preventDefault();
    //const formCheck = event.currentTarget;
    if (!this.validator.allValid()) {
      this.setState({ validated: true });
      this.validator.showMessages();
      return true;
      //
    }

    this.setState({ submitting: true });

    const { form } = this.state;
    const { history } = this.props;

    try {
      const authRes = await auth.authenticate(form);
      setLoginData(get("data.data", authRes));
      this.setState({ submitting: false });

      Swal.fire({
        title: t(get("data.cod", authRes)),
        icon: "success",
      }).then(() => {
        history.push("/dashboard");
      });
    } catch (error) {
      this.setState({ submitting: false });
      Swal.fire({
        icon: "error",
        title: t(getOr("errorTextUndefined", "response.data.cod", error)),
      });
    }
  }

  setModalShow(value) {
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale:
        this.props.i18n.language === "en-US" ? "en" : this.props.i18n.language,
      element: (message) => <div className="invalid-feedback">{message}</div>,
    });

    this.setState({ modalShow: value });
  }

  render() {
    const { modalShow } = this.state;
    const { t } = this.props;
    return (
      <>
        <Nav.Link onClick={() => this.setModalShow(true)}>
          {t("btnOpenModal")}
        </Nav.Link>
        <FormLogin
          show={modalShow}
          onSubmit={(e) => this.handleSubmit(e, t)}
          onHide={() => this.setModalShow(false)}
          {...this}
        />
      </>
    );
  }
}

export default withTranslation(["login", "common"])(LoginPopup);
