import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    let {stocks, buyStock} = this.props

    return (
      <div>
        <h2>Stocks</h2>
        {stocks.map(stock => <Stock key={stock.id} stock={stock} handleClick={buyStock}/>)}
      </div>
    );
  }

}

export default StockContainer;
