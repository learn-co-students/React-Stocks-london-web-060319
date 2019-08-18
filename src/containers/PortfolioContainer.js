import React, { Component } from "react";
import Stock from "../components/Stock";

class PortfolioContainer extends Component {
  render() {
    let {stocks, sellStock} = this.props;
    
    if (stocks !== undefined) {
      return (
        <div>
          <h2>My Portfolio</h2>
          {stocks.map(stock => (
            <Stock key={stock.id} stock={stock} handleClick={sellStock}/>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h2>My Portfolio</h2>
        </div>
      );
    }
  }
}

export default PortfolioContainer;
