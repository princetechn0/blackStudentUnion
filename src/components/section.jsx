import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../stylesheets/sectionHeader.css";

function SectionHeader({ childSection }) {
  return (
    <div>
      <Link to={childSection.route}>
        <Card className="hover-shadow text-white my-3">
          <Card.Img
            className="sectionImage"
            src={childSection.imageURL}
            alt="Card image"
          />
          <Card.ImgOverlay>
            <Card.Title className="imageText display-4 fw-bolder">
              {childSection.header}
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
      </Link>
    </div>
  );
}

export default SectionHeader;
