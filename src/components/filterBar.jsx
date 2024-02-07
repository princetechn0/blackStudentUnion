import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import "../stylesheets/filterBar.css";
import Filter from "./filter";
import { v4 } from "uuid";

function FilterBar({
  categories = [],
  types,
  filterCardsFunc,
  clearFilterFunc,
}) {
  let baseTopics = ["Newest", "Name", "Most Popular", ...categories, ...types];
  baseTopics = baseTopics.map((doc) => ({
    topic: doc,
    isActive: false,
  }));
  baseTopics.find((e) => e.topic === "Newest").isActive = true;

  const [activeFilters, setActiveFilters] = useState([]);
  const [filterTopics, setfilterTopics] = useState([...baseTopics]);
  const [currentTopic, setCurrentTopic] = useState("");

  useEffect(() => {}, [currentTopic]);

  useEffect(() => {
    setActiveFilters(
      filterTopics.filter((e) => e.isActive === true).map((e) => e.topic)
    );
  }, [filterTopics]);

  useEffect(() => {
    filterCardsFunc(currentTopic, activeFilters);
  }, [activeFilters]);

  function onClick(topic) {
    setCurrentTopic(topic);
    setfilterTopics(
      filterTopics.map((obj) =>
        obj.topic === topic ? { ...obj, isActive: !obj.isActive } : obj
      )
    );
  }

  function onClearClick() {
    setfilterTopics(filterTopics.map((obj) => ({ ...obj, isActive: false })));
    setActiveFilters([]);
    setCurrentTopic();
    clearFilterFunc();
  }

  return (
    <div className="container pt-2 pb-5">
      <h4 className="d-inline-flex py-2 mx-2 text-white">Sort by:</h4>
      <div>
        {filterTopics &&
          filterTopics.map((filter) => (
            <Filter
              key={filter.topic + v4()}
              topic={filter.topic}
              isActive={filter.isActive}
              filterCards={(topic) => onClick(topic)}
            ></Filter>
          ))}
        <div>
          {activeFilters.length !== 0 && (
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
  );
}

// class FilterBar extends Component {
//   constructor(props) {
//     super(props);
//     const { categories, types } = props;
//     let activeFilters = [];

//     let baseTopics = ["Newest", "Name", "Most Popular"];
//     let filterTopics = baseTopics.concat(types.concat(categories));
//     filterTopics = filterTopics.map((doc) => ({
//       topic: doc,
//       isActive: false,
//     }));
//     filterTopics.find((e) => e.topic === "Newest").isActive = true;

//     this.state = { filterTopics, activeFilters };
//   }

//   onClick(topic) {
//     this.setState(
//       (state) => ({
//         filterTopics: state.filterTopics.map((obj) =>
//           obj.topic === topic
//             ? Object.assign(obj, { isActive: !obj.isActive })
//             : obj
//         ),
//         activeFilters: state.filterTopics
//           .filter((e) => e.isActive === true)
//           .map((e) => e.topic),
//       }),
//       () => {
//         this.props.filterCardsFunc(topic, this.state.activeFilters);
//       }
//     );
//   }

//   onClearClick() {
//     this.setState((prevState) => ({
//       filterTopics: prevState.filterTopics.map((obj) =>
//         Object.assign(obj, { isActive: false })
//       ),
//       activeFilters: [],
//     }));
//     this.props.clearFilterFunc();
//   }

//   render() {
//     return (
//       <>
//         <div className="container pt-2 pb-5">
//           <h4 className="d-inline-flex py-2 mx-2 text-white">Sort by:</h4>
//           <div>
//             {this.state.filterTopics &&
//               this.state.filterTopics.map((filter) => (
//                 <Filter
//                   key={filter.topic + v4()}
//                   topic={filter.topic}
//                   isActive={filter.isActive}
//                   filterCards={(topic) => this.onClick(topic)}
//                 ></Filter>
//               ))}
//             <div>
//               {this.state.activeFilters.length !== 0 && (
//                 <Badge
//                   onClick={() => this.onClearClick()}
//                   pill
//                   bg="danger"
//                   className="badge-custom hover-shadow my-2 mx-2"
//                 >
//                   Clear Filter
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

export default FilterBar;
