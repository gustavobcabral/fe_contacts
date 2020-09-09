import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function LoginPage() {
  return (
    <>
      <div className="page-header">
        <h1>Publicadores</h1>
      </div>

      <div className="page-body">
        <div className="side-menu">
          <Link to="/">Contatos</Link>
          <Link href="#">Publicadores</Link>
        </div>

        <div className="content">
          <div className="table-publishers">
            <table>
              <tr>
                <th>Nome</th>
                <th>Privilégio</th>
                <button className="new">Adicionar</button>
              </tr>
              <tr>
                <td>Gustavo</td>
                <td>Pioneiro</td>

                <button className="edit">Editar</button>
                <button className="delet">Excluir</button>
              </tr>
              <tr>
                <td>Luciano</td>
                <td>Servo Ministerial</td>
                <button className="edit">Editar</button>
                <button className="delet">Excluir</button>
              </tr>
              <tr>
                <td>Rafael</td>
                <td>Servo Ministerial</td>
                <button className="edit">Editar</button>
                <button className="delet">Excluir</button>
              </tr>
              <tr>
                <td>Rodrigo</td>
                <td>Ancião</td>
                <button className="edit">Editar</button>
                <button className="delet">Excluir</button>
              </tr>
              <tr>
                <td>Edmar</td>
                <td>Ancião</td>
                <button className="edit">Editar</button>
                <button className="delet">Excluir</button>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
