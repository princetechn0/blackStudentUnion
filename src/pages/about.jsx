import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../stylesheets/about.css";
import Carousel from "react-bootstrap/Carousel";

class About extends Component {
  componentDidMount() {
    // document.body.classList.add("gradient-custom");
  }

  state = {
    quotes: [""],
  };

  render() {
    return (
      <div className="container pt-5 w-50 text-center text-white">
        <h4>
          {" "}
          For the Culture is an online “Black book” that encapsulates all things
          Black Culture as it relates to cuisine, music, church, hair,
          organizations, social spaces, etc., which are seen as fundamental
          iconography in the lexicon of Blackness.
        </h4>
      </div>
    );
  }
}

export default About;
