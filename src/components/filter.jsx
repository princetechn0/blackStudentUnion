import React from "react";
import { Badge } from "react-bootstrap";
import "../stylesheets/filterBar.css";

function Filter({ topic, isActive, filterCards }) {
  return (
    <Badge
      onClick={() => filterCards(topic)}
      pill
      bg={!isActive ? "light" : "primary"}
      text={!isActive ? "dark" : ""}
      className="badge-custom hover-shadow my-1 mx-2"
    >
      {topic}
    </Badge>
  );
}

export default Filter;
