import React from "react";
import { Button } from "react-bootstrap";
import { get, getOr } from "lodash/fp";
import FormLogin from "./form";
import { auth } from "../../services";
import { setToken } from "../../utils/tokenManager";
import Swal from "sweetalert2";

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {}, modalShow: false };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { form } = this.state;
    const { history } = this.props;

    try {
      const authRes = await auth.authenticate(form);
      const { jwtToken } = get("data.data", authRes);
      setToken(jwtToken);
      Swal.fire({
        title: "Voce foi logado corretamente",
        icon: "success",
      }).then(() => {
        history.push("/dashboard");
      });
    } catch (error) {
      Swal.fire({
        title: "Erro ao logar",
        icon: "error",
        text: getOr("Erro desconhecido", "response.data.cod", error),
      });
    }
  }

  setModalShow(value) {
    this.setState({ modalShow: value });
  }

  render() {
    const { modalShow } = this.state;
    return (
      <>
        <Button variant="primary" onClick={() => this.setModalShow(true)}>
          Login
        </Button>

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

export default LoginPopup;
