import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  render() {
    return (
      <div>
    <SearchBar 
      checkedValue={this.props.checkedValue}
      sortStocks={this.props.sortStocks} 
      handleFilterChange={this.props.handleFilterChange} 
      filterStocks={this.props.filterStocks}
    />

          <div className="row">
            <div className="col-8">
              <StockContainer 
                stocks={this.props.stocks} 
                handleClick={this.props.addStock}
              />
            </div>
            <div className="col-4">
              <PortfolioContainer 
                stocks={this.props.portfolioStocks} 
                removeStock={this.props.removeStock}
              />
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
