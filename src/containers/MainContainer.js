import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const fetchStocks = () => fetch('http://localhost:3000/stocks').then(resp => resp.json())

class MainContainer extends Component {
  
  state = {
    stocks: [],
    myPortfolio: [],
    filterChoice: null,
    SortType: null
  }

  componentDidMount() {
    fetchStocks()
      .then(stocks => this.setState({ stocks })) 
  }

  addStockToPortfolio = stock => {
    if (this.state.myPortfolio.map(s => s).includes(stock)) return;
    this.setState({myPortfolio: [...this.state.myPortfolio, stock]})
  }

  removeStockFromPortfolio = stock => {
    const myPortfolio = this.state.myPortfolio.filter(s => s !== stock)
    this.setState({myPortfolio})
  }

  filterStocks = () => {
    if (this.state.filterChoice) {
      return this.state.stocks.filter(stock => stock.type === this.state.filterChoice)
    } else if (this.state.sortType === 'Price') {
      return this.state.stocks.sort((a, b) => a.price - b.price)
    } else if (this.state.sortType === 'Alphabetically') {
      return this.state.stocks.sort((a, b) => (a.name).localeCompare(b.name))
    }
    else {
      return this.state.stocks
    }
  }

  setfilterChoice = (event) => {
    this.setState({filterChoice: event.target.value});
  }

  setSortChoice = (event) => {
    this.setState({sortType: event.target.value})
  }


  render() {
    
    return (
      <div>
        <SearchBar handleChange={this.setfilterChoice} handleSortChange={this.setSortChoice} sort={this.state.sortType}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.filterStocks()} handleClick={this.addStockToPortfolio} />

            </div>
            <div className="col-4">

              <PortfolioContainer myPortfolio={this.state.myPortfolio} handleClick={this.removeStockFromPortfolio} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
