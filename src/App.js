import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'


const fetchStocks = () => fetch("http://localhost:3000/stocks").then(resp => resp.json())

class App extends Component {

  state = {
    stocks: [],
    portfolioStocks: [],
    filterType: null,
    checkedValue: ""
  }

  componentDidMount() {
    fetchStocks()
    .then(stocks => this.setState({stocks}))
  }

  addStock = (stock) => {
    if (this.state.portfolioStocks.includes(stock)) return
    this.setState({portfolioStocks: [...this.state.portfolioStocks, stock]})
  }
// set state of portfolioStocks to all portfolioStocks (...) plus new stock (using object means you sont have a single source of truth for the stock - using id means the stock reminas singular = id iterates over objects to locate selected one)

  removeStock = (stock) => {
    const newStocks = this.state.portfolioStocks.filter(ps => stock !== ps )
    this.setState({portfolioStocks: newStocks})
  }

  handleFilterChange = (event) => {
    this.setState({filterType: event.target.value})
  }

  filteredStocks = () => {
    if (this.state.filterType) { 
      return this.state.stocks.filter(stock => stock.type == this.state.filterType)
    } else if (this.state.checkedValue === "Alphabetically" ) {
        return this.state.stocks.sort((a, b) => a.name.localeCompare(b.name))
    }  else if (this.state.checkedValue === "Price" ) {
        return this.state.stocks.sort((a, b) => a.price - b.price)
    } else {
      return this.state.stocks 
    } 


  //   return this.state.filterType
  //   ? this.state.stocks.filter(stock => stock.type == this.state.filterType) 
  //   : this.state.stocks 
  // 
  }

  sortStocks = (event) => {
    this.setState({checkedValue: event.target.value})
  }

  render() {
    return (
      <div>
        <Header/>
        <MainContainer 
          checkedValue={this.state.checkedValue}
          sortStocks={this.sortStocks} 
          handleFilterChange={this.handleFilterChange} 
          portfolioStocks={this.state.portfolioStocks} 
          stocks={this.filteredStocks()} 
          addStock={this.addStock} 
          removeStock={this.removeStock}
        />
      </div>
    );
  }
}

export default App;
