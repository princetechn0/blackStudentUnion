import React, { Component } from "react";
import BasicCard from "./card";

class Cards extends Component {
  render() {
    const { cards, type, onDelete } = this.props;
    return (
      <div>
        <div className="row text-center justify-content-center">
          {cards &&
            cards.map((card) => (
              <BasicCard
                key={card.id}
                childCardInfo={card}
                cardType={type}
                onDelete={onDelete}
              ></BasicCard>
            ))}
        </div>
      </div>
    );
  }
}

export default Cards;
