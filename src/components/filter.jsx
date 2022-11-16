import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import "../stylesheets/filterBar.css";

function Filter(props) {
  const { topic, isActive } = props;

  const onClick = (topic) => {
    props.filterCards(topic);
  };

  return (
    <>
      <Badge
        onClick={() => onClick(topic)}
        pill
        bg={!isActive ? "light" : "primary"}
        text={!isActive ? "dark" : ""}
        className="badge-custom hover-shadow my-1 mx-2"
      >
        {topic}
      </Badge>
    </>
  );
}

export default Filter;
