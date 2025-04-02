import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <section className="intro">
        <h1>Bienvenido a Barbería XYZ</h1>
        <p>Tu corte de cabello, estilo y confianza están a un solo clic.</p>
        <Link to="/booking" className="button">
          Agendar Cita
        </Link>
      </section>
    </main>
  );
};

export default Home;
