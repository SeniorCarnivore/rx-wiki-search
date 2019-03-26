import React, { Component, SFC } from 'react';
import { requestObs, HandlerFunction } from './Types';
import Api from './Api';

import './App.css';
import { withObservableStream } from './container'
import { BehaviorSubject } from 'rxjs';

// @ts-ignore
const App = (props) => (
  <div className="App">
    <header className="App-header">
      Wiki Search

      <div>
        <input
          type="text"
          value={ props.request }
          onChange={ props.handleChange }
        />

        <button onClick={ () => props.handleSubmit(props.request) }>Search</button>
      </div>
      {
        props.results &&
        <ul>
          {
            props.results.map((el: string) => <li>{ el }</li>)
          }
        </ul>
      }
    </header>
  </div>
);


const request$ = new BehaviorSubject({ request: '' });
const results$ = new BehaviorSubject({ results: [] });

const togglers = {
  handleChange: (value: string) => request$.next({ request: value }),
  handleSubmit: (request: string) => Api.
    // @ts-ignore
    fetchData(request).
    subscribe((data: JSON) => console.log(data))
};

const initialState = {
  request: '',
  results: []
}

export default withObservableStream(
  request$,
  togglers,
  initialState
)(App);
