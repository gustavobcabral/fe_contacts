import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import { Button, Table, Container } from "react-bootstrap";

function PublishersPage() {
  return (
    <Container fluid>
      <div className="page-header">
        <h1>Publicadores</h1>
      </div>

      <div className="page-body">
        <div className="side-menu">
          <Link to="/">Home</Link>
          <Link to="/contacts">Contatos</Link>
          <Link to="#">Publicadores</Link>
        </div>

        <div className="content">
          <div className="table-publishers">
            <Table striped bordered hover>
              <tr>
                <th>Nome</th>
                <th>Privilégio</th>
                <Button style={{ marginTop: 5 }} variant="primary">
                  Adicionar
                </Button>
              </tr>
              <tr>
                <td>Gustavo</td>
                <td>Pioneiro</td>
                <td>
                  <Button variant="success">Editar</Button>{" "}
                  <Button variant="danger">Exlcuir</Button>
                </td>
              </tr>
              <tr>
                <td>Luciano</td>
                <td>Pioneiro</td>
                <td>
                  <Button variant="success">Editar</Button>{" "}
                  <Button variant="danger">Exlcuir</Button>
                </td>
              </tr>
              <tr>
                <td>Rafael</td>
                <td>Pioneiro</td>
                <td>
                  <Button variant="success">Editar</Button>{" "}
                  <Button variant="danger">Exlcuir</Button>
                </td>
              </tr>
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default PublishersPage;
