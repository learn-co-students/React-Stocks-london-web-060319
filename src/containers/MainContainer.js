import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    myStocksIds: [], //  [{'id': '2', 'quantity': 3}, {}]
    filterChoice: "None",
    sortChoice: ""
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(resp => resp.json())
      .then(data => this.setState({ stocks: data }));
  }

  buyStock = stock => {
    if (this.state.myStocksIds.find(stockId => stockId === stock.id)) return;
    this.setState({ myStocksIds: [...this.state.myStocksIds, stock.id] });
  };

  findStocksBought = () => {
    return this.state.myStocksIds.map(stockId => {
      return this.state.stocks.find(stock => {
        return stock.id === stockId;
      });
    });
  };

  sellStock = stock => {
    this.setState({
      myStocksIds: this.state.myStocksIds.filter(
        stockId => stockId !== stock.id
      )
    });
  };

  // filterStocks = () => {
  //   if (this.state.filterChoice === "None") return this.state.stocks;
  //   if (this.state.filterChoice === "Tech") return this.state.stocks.filter(stock => stock.type === "Tech")
  //   if (this.state.filterChoice === "Sportswear") return this.state.stocks.filter(stock => stock.type === "Sportswear")
  //   if (this.state.filterChoice === "Finance") return this.state.stocks.filter(stock => stock.type === "Finance")
  // }

  filterStocks = () => {
    return this.state.stocks.filter(stock => {
      if (this.state.filterChoice === "None") return true;
      if (this.state.filterChoice === "Tech") return stock.type === "Tech";
      if (this.state.filterChoice === "Sportswear") return stock.type === "Sportswear";
      if (this.state.filterChoice === "Finance") return stock.type === "Finance";
    });
  };

  changeFilterChoice = event => {
    this.setState({ filterChoice: event.target.value });
  };

  sortStocks = (filteredStocks) => {
    return filteredStocks.sort((stockA, stockB) => {
      if (this.state.sortChoice === "") return 0;
      if (this.state.sortChoice === "Alphabetically") {return (stockA.ticker.localeCompare(stockB.ticker))};
      if (this.state.sortChoice === "Price") {return (stockA.price - stockB.price)};
    }
    )}

  changeSortChoice = event => {
    this.setState({ sortChoice: event.target.value });
  };

  render() {
    const filteredStocks = this.filterStocks();
    const sortedStocks = this.sortStocks(filteredStocks)

    return (
      <div>
        <SearchBar 
        changeFilterChoice={this.changeFilterChoice} 
        filterChoice={this.state.filterChoice}
        changeSortChoice={this.changeSortChoice} 
        sortChoice={this.state.sortChoice}/>

        <div className="row">
          <div className="col-8">
            <StockContainer stocks={sortedStocks} buyStock={this.buyStock} />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={this.findStocksBought()}
              sellStock={this.sellStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
