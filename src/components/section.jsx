import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../stylesheets/sectionHeader.css";

class SectionHeader extends Component {
  render() {
    const { childSection } = this.props;
    return (
      <div>
        <Link to={childSection.route}>
          <Card className="hover-shadow text-white my-3">
            <Card.Img
              className="imageBlur"
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
}

export default SectionHeader;
