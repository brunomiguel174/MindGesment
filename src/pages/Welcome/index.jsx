import React from "react";

import { Link } from "react-router-dom";

import Footer from "../../components/Footer";

import "./styles.css";

//Esta página é util para redirecionar o utilizador quando ele não está logado e deseja
//efetuar tipos de ações no website que requerem guardar informação
export default function Welcome() {
  return (
    <>
      <div className="container-welcome">
        <section>
          <article>
            <h2>Why manage your money alone?</h2>
            <h4>We are here to help and improve your capacities</h4>
          </article>
          <div>
            <Link to="/login" className="button">
              {" "}
              Login{" "}
            </Link>
            <Link to="/register" className="button">
              {" "}
              Register{" "}
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
