import React from "react";
import { Nav } from "react-bootstrap";
import { get, getOr } from "lodash/fp";
import FormLogin from "./FormLogin";
import { auth } from "../../services";
import { setLoginData } from "../../utils/loginDataManager";
import Swal from "sweetalert2";
import { withTranslation } from "react-i18next";
import SimpleReactValidator from "simple-react-validator";
import { getLocale } from "../../utils/forms";

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
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
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

  async handleSubmit() {
    if (!this.validator.allValid()) {
      this.validator.showMessages();

      return true;
    }

    this.setState({ submitting: true });

    const { form } = this.state;
    const { history, t } = this.props;

    try {
      const authRes = await auth.authenticate(form);
      setLoginData(get("data.data", authRes));
      this.setState({ submitting: false });
      history.push("/dashboard");
      Swal.fire({
        title: t(get("data.cod", authRes)),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
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
          onSubmit={this.handleSubmit}
          onHide={() => this.setModalShow(false)}
          {...this}
        />
      </>
    );
  }
}

export default withTranslation(["login", "common"])(LoginPopup);
