import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import "../stylesheets/filterBar.css";
import Filter from "./filter";

function FilterBar(props) {
  const [clearAll, setClearAll] = useState(false);
  const { categories, types, isFiltered } = props;
  let additionalTopics = ["Newest", "Name"];

  let filterTopics = additionalTopics.concat(types.concat(categories));

  const onClick = (topic) => {
    setClearAll(false);
    props.filterCardsFunc(topic);
  };

  const onClearClick = () => {
    setClearAll(true);
    props.clearFilterFunc();
  };

  return (
    <>
      <div className="container pt-2 pb-5">
        <h4 className="d-inline-flex mx-2 py-2 ">Sort by:</h4>

        <div>
          {filterTopics &&
            filterTopics.map((topic) => (
              <Filter
                key={topic}
                topic={topic}
                filterCards={onClick}
                parentValue={clearAll}
              ></Filter>
            ))}

          <div>
            {isFiltered && (
              <Badge
                onClick={onClearClick}
                pill
                bg="danger"
                className="badge-custom hover-shadow my-2 mx-2"
              >
                Clear Filter
              </Badge>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterBar;
