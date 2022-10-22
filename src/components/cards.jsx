import React, { Component } from "react";
import BasicCard from "./card";

class Cards extends Component {
  render() {
    console.log("props", this.props);
    const { cards, type } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row text-center">
            {cards &&
              cards.map((card) => (
                <React.Fragment>
                  <BasicCard
                    key={card.id}
                    childCardInfo={card}
                    cardType={type}
                  ></BasicCard>
                </React.Fragment>
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cards;
