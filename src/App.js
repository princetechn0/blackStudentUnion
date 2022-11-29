import React, { Component } from "react";
import "./App.css";
import Sections from "./components/sections";

class App extends Component {
  state = {
    sections: [
      {
        id: 0,
        header: "Cuisine",
        imageURL: "/african-food-recipes.png",
        lastUpdated: "2 minutes ago",
        route: "/restaurants",
      },
      {
        id: 1,
        header: "Beauty",
        imageURL: "/barber-shop.jpg",
        lastUpdated: "2 minutes ago",
        route: "/beauty",
      },
      {
        id: 2,
        header: "Arts & Entertainment",
        imageURL: "/arts.jpg",
        lastUpdated: "2 minutes ago",
        route: "/groups",
      },
      {
        id: 3,
        header: "Black Organizations",
        imageURL: "/organizations.jpg",
        lastUpdated: "2 minutes ago",
        route: "/groups",
      },
      {
        id: 4,
        header: "Parents Corner",
        imageURL: "/hangout.jpg",
        lastUpdated: "2 minutes ago",
        route: "/groups",
      },
      {
        id: 5,
        header: "Health and Wellness",
        imageURL: "/health.jpg",
        lastUpdated: "2 minutes ago",
        route: "/groups",
      },
    ],
  };
  render() {
    return (
      <main className="container">
        <div className="main-body pt-4 text-center mx-auto">
          <h3 className="subtitle-text"> WELCOME TO THE HOME OF ALL THINGS</h3>
          <h1 className="title-text"> BLACK CULTURE</h1>
          <span className="desc-text">
            {" "}
            For the Culture is an online “Black book” that encapsulates all
            things Black Culture.
            <br /> Learn{" "}
            <a style={{ color: "rgb(242, 168, 105)" }} href="/about">
              more
            </a>
            .
          </span>
        </div>

        <Sections sectionData={this.state.sections}> </Sections>
      </main>
    );
  }
}

export default App;
