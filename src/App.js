import React, { Component } from "react";
import "./App.css";
import Navbar2 from "./components/navbar";
import Sections from "./components/sections";

class App extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = "#f2e1bf";
  }
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
      },
      {
        id: 1,
        header: "Barber Shops",
        imageURL: "/barber-shop.jpg",
        lastUpdated: "2 minutes ago",
      },
    ],
  };
  render() {
    return (
      <main>
        <Navbar2></Navbar2>
        <main className="container">
          <Sections sectionData={this.state.sections}> </Sections>
        </main>{" "}
      </main>
    );
  }
}

export default App;
