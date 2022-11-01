import React, { Component } from "react";
import HairForm from "../components/hairForm";
import "../stylesheets/haircuts.css";

class Haircuts extends Component {
  render() {
    return (
      <main className="container">
        <h1>hair</h1>
        <HairForm></HairForm>
      </main>
    );
  }
}

export default Haircuts;
