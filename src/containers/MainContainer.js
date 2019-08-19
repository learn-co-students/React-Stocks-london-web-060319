import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const stocksAPI = 'http://localhost:3000/stocks'

  const getStocks = () =>
    fetch(stocksAPI)
    .then(resp => resp.json())


class MainContainer extends Component {

  state = {
    stocks: [],
    selectedStockIds: [],
    filterChoice: "None",
    sortChoice: ""
  }


  componentDidMount(){
     getStocks()
    .then(stocks =>this.setState({stocks}))
  }

  selectedStock = stock => {
    if (this.state.selectedStockIds.includes(stock.id)) return;
    this.setState({
      selectedStockIds: [...this.state.selectedStockIds, stock.id]
    })
  }


removeStock = stock => {
  this.setState({
  selectedStockIds: this.state.selectedStockIds.filter(selectedStockId => selectedStockId !==stock.id)
})
}


getSelectedStock = () =>
  this.state.selectedStockIds.map(
    selectedStockId =>
    this.state.stocks.find(stock => stock.id === selectedStockId))


filterStocks = () => {
  return this.state.stocks.filter(stock => {
    if(this.state.filterChoice === "None") return true;
    if (this.state.filterChoice === "Tech") return stock.type === "Tech";
    if (this.state.filterChoice === "Sportswear") return stock.type === "Sportswear";
    if (this.state.filterChoice === "Finance") return stock.type === "Finance";
  })
}

changeFilterChoice = event => {
  this.setState({filterChoice: event.target.value});
}


sortStocks = (filteredStocks) => {
  return filteredStocks.sort((stockA, stockB) => {
    if (this.state.sortChoice === "") return 0;
    if (this.state.sortChoice === "Alphabetically") {return (stockA.ticker.localeCompare(stockB.ticker))}
    if (this.state.sortChoice === "Price") {return (stockA.price - stockB.price)}
  })
}

changeSortChoice = event => {
  this.setState({ sortChoice: event.target.value})

}

  render() {
    const filteredStocks = this.filterStocks();
    const sortedStocks = this.sortStocks(filteredStocks)
    return (
      <div>
        <SearchBar
        changeFilterChoice={this.changeFilterChoice}
        filterChoice={this.state.filterChoice}
        changeSortChoice={this.changeSortChoice}
        sortChoice={this.state.sortChoice}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={sortedStocks} selectedStock={this.selectedStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.getSelectedStock()} removeStock={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
