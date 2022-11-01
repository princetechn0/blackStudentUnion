import React, { Component } from "react";
import "./App.css";
import Sections from "./components/sections";

class App extends Component {
  state = {
    sections: [
      {
        id: 0,
        header: "Local food",
        imageURL: "/african-food-recipes.png",
        lastUpdated: "2 minutes ago",
        route: "/restaurants",
      },
      {
        id: 1,
        header: "Beauty",
        imageURL: "/barber-shop.jpg",
        lastUpdated: "2 minutes ago",
        route: "/haircuts",
      },
      {
        id: 2,
        header: "Events",
        imageURL: "/hangout.jpg",
        lastUpdated: "2 minutes ago",
        route: "/groups",
      },
      {
        id: 3,
        header: "On Campus Resources",
        imageURL: "/hangout.jpg",
        lastUpdated: "2 minutes ago",
        route: "/groups",
      },
    ],
  };
  render() {
    return (
      <main className="container">
        <Sections sectionData={this.state.sections}> </Sections>
      </main>
    );
  }
}

export default App;
