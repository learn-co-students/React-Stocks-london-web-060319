import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'


class MainContainer extends Component {
  state = {
    portfolio: [],
    search: "",
    filterType: ""
  }

  addStockToPortfolio = (stock) => {
    if (!this.state.portfolio.includes(stock)){
      this.setState({
        portfolio: [...this.state.portfolio, stock]
      })
    }
  }

  handleChange = event =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleType = event => {
    this.setState({
      filterType: event.target.value
    })
  }

  filterSearch = () => {
    if (this.state.search){
      return this.props.stocks.filter(stock => stock.name.toLowerCase().includes(this.state.search.toLowerCase()))
    }
    return this.props.stocks
  }
  
  filterCategory = () => {
    if (this.state.filterType){
      return this.props.stocks.filter(stock => stock.type === this.state.filterType)
    }
    return this.props.stocks
  }

  removeStockFromPortfolio = stock => {
    this.setState({
      portfolio: this.state.portfolio.filter(sellStock => sellStock.id !== stock.id)
    })
    
  }

  render() {
    return (
      <div>
        <SearchBar handleType={this.handleType} handleChange={this.handleChange} />

          <div className="row">
            <div className="col-8">

              <StockContainer addStockToPortfolio={this.addStockToPortfolio} stocks={this.filterSearch()}/>

            </div>
            <div className="col-4">

              <PortfolioContainer removeStockFromPortfolio={this.removeStockFromPortfolio} stocks={this.state.portfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
