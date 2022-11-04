import React, { Component } from "react";
import BasicCard from "./card";
import Masonry from "react-masonry-css";
import "../stylesheets/cards.css";

class Cards extends Component {
  render() {
    const { cards, type, onDelete } = this.props;
    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1,
      500: 1,
    };

    return (
      <div className="container">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {cards &&
            cards.map((card) => (
              <BasicCard
                key={card.id}
                childCardInfo={card}
                cardType={type}
                onDelete={onDelete}
              ></BasicCard>
            ))}
        </Masonry>

        {/* <div className="row text-center justify-content-center">
          {cards &&
            cards.map((card) => (
              <BasicCard
                key={card.id}
                childCardInfo={card}
                cardType={type}
                onDelete={onDelete}
              ></BasicCard>
            ))}
        </div> */}
      </div>
    );
  }
}

export default Cards;
