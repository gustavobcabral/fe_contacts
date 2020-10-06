import React from "react";
import { withTranslation } from "react-i18next";
import { Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalDetailsContact from "./ModalDetailsContact";

class ModalEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false };
  }

  setModalShow = (action) => this.setState({ modalShow: action });

  render() {
    const { t, data } = this.props;
    const { modalShow } = this.state;

    return (
      <>
        <Button variant="success" onClick={() => this.setModalShow(true)}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        {/* Eu nao recomendo chamar esse component abaixo dessa maneira ja que teria que ficar fora da classe. 
        É melhor voce importar. o ideal seria ate criar um component chamado modal la na pasta de common ja que usamos bastante e passariamos para esse
        component somente o que vai mostrar no modal.body. mas isso pode ser feito depois.
        E o nome do component tem que ser algo mais claro o que ele é.
        MyVerticallyCenteredModalToEdit -> ModalDetailsContact
        
        */}
        <ModalDetailsContact
          data={data}
          show={modalShow}
          onHide={this.setModalShow.bind(this, false)}
          t={t}
        />
      </>
    );
  }
}

export default withTranslation(["contacts", "common"])(ModalEdit);
