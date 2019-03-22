import React, { Component } from 'react';

import Api from './Api';

import './App.css';

class App extends Component {
  state = {
    request: '',
    data: []
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) =>
    this.setState({
      request: e.currentTarget.value
    });

  handleSubmit = () =>
    Api.
      fetchData$(this.state.request).
      subscribe((data: JSON) => this.setState({ data }));

  renderResults = () =>
    <ul className="list">
      { this.state.data.map(el => <li>{ el }</li>) }
    </ul>

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Wiki Search

          <div>
            <input
              type="text"
              value={ this.state.request }
              onChange={ this.handleChange }
            />

            <button onClick={this.handleSubmit}>Search</button>
          </div>
          { this.state.data && this.renderResults() }
        </header>
      </div>
    );
  }
};

export default App;
