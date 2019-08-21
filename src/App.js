import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'

const baseUrl = "http://localhost:3000/stocks"
class App extends Component {
  
  state = {
    stocks: []
  }

  componentDidMount(){
    fetch(baseUrl)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        stocks: data
      })
    })
  }
  render() {
    return (
      <div>
        <Header/>
        <MainContainer stocks={this.state.stocks}/>
      </div>
    );
  }
}

export default App;
