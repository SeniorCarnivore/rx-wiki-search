import React, { Component, SFC } from 'react';

// import Api from './Api';

import './App.css';
import { createObservableContainer } from './container'
import { BehaviorSubject } from 'rxjs';

import IAppProps from './Types';

class App extends React.Component {
  constructor(props: IAppProps) {
    super(props);

    const {
      request$,
      handleChange,
    } = props;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Wiki Search
  
          <div>
            <input
              type="text"
              // value={ this.request }
              // onChange={ this.handleChange }
            />
  
            {/* <button onClick={handleSubmit}>Search</button> */}
          </div>
          {/* { data && renderResults() } */}
        </header>
      </div>
    )
  }
};

const request$ = new BehaviorSubject({ request: '' });

export default createObservableContainer({
  request$,
  handleChange: (value: string) => request$.next({ request: value })
})(App);
