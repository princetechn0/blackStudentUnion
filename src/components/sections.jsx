import React, { Component } from "react";
import SectionHeader from "./section";
import "../stylesheets/sections.css";

class Sections extends Component {
  render() {
    const { sectionData } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            {sectionData.map((section) => (
              <React.Fragment>
                <SectionHeader
                  key={section.id}
                  childSection={section}
                ></SectionHeader>
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Sections;
