import React from "react";
import SectionHeader from "./section";
import "../stylesheets/sections.css";

function Sections({ sectionData }) {
  return (
    <>
      <div className="row">
        {sectionData.map((section) => (
          <div key={section.id} className="col-lg-6">
            <SectionHeader childSection={section} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Sections;
