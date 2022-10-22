import React, { Component } from "react";
import "./App.css";
import Sections from "./components/sections";

class App extends Component {
  state = {
    cards: [
      {
        id: 0,
        name: "Soul Food",
        age: 55,
        description: "not doing wll",
        imageURL: "https://picsum.photos/1080",
      },
      {
        id: 1,
        name: "Soul Food",
        age: 55,
        description: "not doing wll",
        imageURL: "https://picsum.photos/1081",
      },
      {
        id: 2,
        name: "Soul Food",
        age: 55,
        description: "not doing wll",
        imageURL: "https://picsum.photos/1090",
      },
      {
        id: 3,
        name: "Soul Food",
        age: 55,
        description: "not doing wll",
        imageURL: "https://picsum.photos/1100",
      },
      {
        id: 4,
        name: "Soul Food",
        age: 55,
        description: "not doing wll",
        imageURL: "https://picsum.photos/1101",
      },
    ],
    undoStack: [],
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
        header: "Barber Shops",
        imageURL: "/barber-shop.jpg",
        lastUpdated: "2 minutes ago",
        route: "/haircuts",
      },
      {
        id: 2,
        header: "Groups",
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
