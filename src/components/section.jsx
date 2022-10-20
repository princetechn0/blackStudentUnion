import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "../stylesheets/sectionHeader.css";

class SectionHeader extends Component {
  render() {
    const { childSection } = this.props;
    return (
      <React.Fragment>
        <Card className="text-white col-7 m-4 p-0">
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
      </React.Fragment>
    );
  }
}

export default SectionHeader;
