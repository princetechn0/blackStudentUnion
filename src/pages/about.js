import React from "react";
import "../stylesheets/about.css";
import { Button } from "react-bootstrap";

export default function About() {
  return (
    <div className="container">
      <div className="about-text">
        <h2> Made by UCI students, </h2>
        <h3> for UCI students. </h3>
        <footer>
          <Button
            variant="light"
            href="http://bsu-uci.weebly.com/"
            target="_blank"
          >
            Learn More
          </Button>
        </footer>
      </div>
    </div>
  );
}
