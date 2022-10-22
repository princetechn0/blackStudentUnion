import React, { Component, useEffect, useState } from "react";
import "../stylesheets/restaurants.css";
import axios from "axios";
import Cards from "../components/cards";

const Restaurants = () => {
  const [nodes, setNodes] = useState({});
  const [isLoading, setLoading] = useState(true);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const { data, status } = await axios.get(
      "https://krat.es/38a4b18d199565cb6785/restaurants"
    );
    if (status === 200) {
      setNodes(data);
      setLoading(false);
    }
  };

  if (isLoading === false) {
    return (
      <main className="container">
        <React.Fragment>
          <Cards cards={nodes} type={"restaurant"}></Cards>
        </React.Fragment>
      </main>
    );
  }
};

export default Restaurants;
