import React, { Component } from "react";
import BasicCard from "./card";

class Cards extends Component {
  render() {
    const { cards } = this.props;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row text-center">
            {cards.map((card) => (
              <React.Fragment>
                <BasicCard key={card.id} childCardInfo={card}></BasicCard>
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cards;
