import React, { useEffect, useState } from "react";
import "../../stylesheets/restaurants.css";
import Cards from "../../components/cards";
import {
  fetchRestaurants,
  postRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from "./controller";
import RestaurantForm from "../../components/restaurantForm";
import ModalPopup from "../../components/modal";
import FilterBar from "../../components/filterBar";

function Restaurants() {
  const [nodes, setNodes] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const [sorryText, setSorryText] = useState(false);
  const [filters, setFilters] = useState();

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    let data = await fetchRestaurants();
    setNodes([...data, ...nodes]);
    setFilteredData(data);
    setFilters([
      ...new Set(data.map((doc) => doc.type).filter((x) => x !== "")),
    ]);
  };

  const createRestaurant = async (inp) => {
    await postRestaurant(inp);
    getRestaurants();
  };

  const removeRestaurant = (childCardInfo) => {
    deleteRestaurant(childCardInfo);
    getRestaurants();
  };

  const voteRestaurant = async (childCardInfo) => {
    updateRestaurant(childCardInfo);
    getRestaurants();
  };

  const filterRunner = (nodesToFilter, filterTerm) => {
    let results = [];
    if (
      !(
        filterTerm === "Newest" ||
        filterTerm === "Name" ||
        filterTerm === "Most Popular"
      )
    ) {
      for (let i = 0; i < nodesToFilter.length; i++) {
        const element = nodesToFilter[i];
        let x;

        if (element.type) {
          x = element.type.includes(filterTerm);
        }

        if (x && !results.includes(element)) {
          results.push(element);
        }
      }
    } else {
      results = [...nodesToFilter].sort((a, b) => {
        let ascending = true;
        let toFilter = filterTerm;
        switch (filterTerm) {
          case "Newest":
            toFilter = "dateCreated";
            ascending = true;
            break;
          case "Name":
            toFilter = "name";
            ascending = true;
            break;
          case "Most Popular":
            toFilter = "votes";
            ascending = false;
            break;
          default:
            break;
        }

        var keyA = a[toFilter.toLowerCase()];
        var keyB = b[toFilter.toLowerCase()];
        if (keyA < keyB && ascending) {
          return -1;
        }
        if (keyA < keyB && !ascending) {
          return 1;
        }
        if (keyA > keyB && ascending) {
          return 1;
        }
        if (keyA > keyB && !ascending) {
          return -1;
        }
        return 0;
      });
    }
    return results;
  };

  const filterCards = (filterTerm, activeFilters) => {
    let results = [];
    let undoFlag = false;
    let nodesToFilter =
      Object.keys(filteredData).length > 0 ? filteredData : nodes;

    if (sorryText) {
      nodesToFilter = filteredData;
    }

    if (!activeFilters.includes(filterTerm)) {
      undoFlag = true;
      nodesToFilter = nodes;
    } else {
      undoFlag = false;
    }

    if (activeFilters.length !== 0 && !undoFlag) {
      results = filterRunner(nodesToFilter, filterTerm);
    }

    if (undoFlag) {
      activeFilters.forEach((y) => {
        results = filterRunner(nodesToFilter, y);
      });
    }

    setFilteredData(results);
    results.length > 0 ? setSorryText(false) : setSorryText(true);

    if (activeFilters.length === 0) {
      clearFilter();
    }
  };

  const clearFilter = () => {
    setFilteredData(nodes);
    setSorryText(false);
  };

  return (
    <main>
      <div className="pb-4">
        <h1 className="header">Cuisine</h1>
        <ModalPopup onSubmit={createRestaurant}>
          <RestaurantForm />
        </ModalPopup>
      </div>

      {nodes.length && (
        <div>
          {Object.keys(nodes).length > 0 && (
            <FilterBar
              filterCardsFunc={filterCards}
              clearFilterFunc={clearFilter}
              types={filters}
            ></FilterBar>
          )}

          {Object.keys(filteredData).length > 0 && !sorryText ? (
            <Cards
              cards={filteredData}
              onVote={voteRestaurant}
              onDelete={removeRestaurant}
              type={"restaurant"}
            ></Cards>
          ) : (
            <h4 className="text-center pt-5 text-white">Sorry, no results! </h4>
          )}
        </div>
      )}
    </main>
  );
}

export default Restaurants;
