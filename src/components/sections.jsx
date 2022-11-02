import React, { Component } from "react";
import SectionHeader from "./section";
import "../stylesheets/sections.css";

class Sections extends Component {
  render() {
    const { sectionData } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          {sectionData.map((section) => (
            <div key={section.id} className="col-lg-6">
              <SectionHeader childSection={section}></SectionHeader>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Sections;
