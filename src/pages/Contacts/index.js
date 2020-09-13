import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { Button, Table, Container } from "react-bootstrap";

function ContactsPage() {
  return (
    <Container fluid>
      <div className="page-header">
        <h1>Contatos</h1>
      </div>

      <div className="page-body">
        <div className="side-menu">
          <Link to="/">Home</Link>
          <Link to="#">Contatos</Link>
          <Link to="/publishers">Publicadores</Link>
        </div>

        <div className="content">
          <div className="table-contacts">
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Idioma</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Detalhes</th>
                  <th>
                    <Button style={{ marginTop: 5 }} variant="primary">
                      Adicionar
                    </Button>
                  </th>
                </tr>
                <tr>
                  <td>Zé</td>
                  <td>30232713</td>
                  <td>espanhol</td>
                  <td>09/09/2020</td>
                  <td>Revisita</td>
                  <td>
                    <Button style={{ marginTop: 12 }} variant="outline-info">
                      Mostrar
                    </Button>{" "}
                  </td>

                  <td>
                    <Button variant="success">Editar</Button>{" "}
                    <Button variant="danger">Exlcuir</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ContactsPage;
