import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import "../stylesheets/filterBar.css";
import Filter from "./filter";
import { v4 } from "uuid";

class FilterBar extends Component {
  constructor(props) {
    super(props);
    const { categories, types } = props;
    let activeFilters = [];

    let baseTopics = ["Newest", "Name", "Most Popular"];
    let filterTopics = baseTopics.concat(types.concat(categories));
    filterTopics = filterTopics.map((doc) => ({
      topic: doc,
      isActive: false,
    }));
    filterTopics.find((e) => e.topic === "Newest").isActive = true;

    this.state = { filterTopics, activeFilters };
  }

  onClick(topic) {
    this.setState(
      (state) => ({
        filterTopics: state.filterTopics.map((obj) =>
          obj.topic === topic
            ? Object.assign(obj, { isActive: !obj.isActive })
            : obj
        ),
        activeFilters: state.filterTopics
          .filter((e) => e.isActive === true)
          .map((e) => e.topic),
      }),
      () => {
        this.props.filterCardsFunc(topic, this.state.activeFilters);
      }
    );
  }

  onClearClick() {
    this.setState((prevState) => ({
      filterTopics: prevState.filterTopics.map((obj) =>
        Object.assign(obj, { isActive: false })
      ),
      activeFilters: [],
    }));
    this.props.clearFilterFunc();
  }

  render() {
    return (
      <>
        <div className="container pt-2 pb-5">
          <h4 className="d-inline-flex py-2 mx-2 text-white">Sort by:</h4>
          <div>
            {this.state.filterTopics &&
              this.state.filterTopics.map((filter) => (
                <Filter
                  key={filter.topic + v4()}
                  topic={filter.topic}
                  isActive={filter.isActive}
                  filterCards={(topic) => this.onClick(topic)}
                ></Filter>
              ))}
            <div>
              {this.state.activeFilters.length !== 0 && (
                <Badge
                  onClick={() => this.onClearClick()}
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
}

export default FilterBar;
