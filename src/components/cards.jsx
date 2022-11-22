import React, { Component } from "react";
import BasicCard from "./card";
import Masonry from "react-masonry-css";
import "../stylesheets/cards.css";

class Cards extends Component {
  render() {
    const { cards, type, onDelete, onVote } = this.props;
    const breakpointColumnsObjMasonry = {
      default: 3,
      1100: 2,
      700: 1,
      500: 1,
    };

    return (
      <div className="container">
        <Masonry
          breakpointCols={breakpointColumnsObjMasonry}
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
                onVote={onVote}
              ></BasicCard>
            ))}
        </Masonry>
      </div>
    );
  }
}

export default Cards;
