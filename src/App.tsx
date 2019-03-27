import React from 'react';
import Api from './Api';

import './App.css';
import { withObservableStream } from './container'
import { timer, combineLatest, BehaviorSubject } from 'rxjs';
import { flatMap, debounce } from 'rxjs/operators';

const limits = [ '5', '10', '15' ];

const App = ({
  // @ts-ignore
  query,
  // @ts-ignore
  handleChange,
  // @ts-ignore
  handleLimit,
  // @ts-ignore
  results
}) => {
  return (<div className="App">
    <header className="App-header">
      Wiki Search

      <div>
        <input
          value={ query }
          type="text"
          onChange={e => handleChange(e.target.value)}
        />
        
        <select
          onChange={e => handleLimit(e.target.value)}>
          { limits.map(limitVal => <option key={ limitVal } value={ limitVal }>{ limitVal }</option>) }
        </select>
      </div>
      {
        results &&
        <ul>
          {
            results.map((el: string) => <li>{ el }</li>)
          }
        </ul>
      }
    </header>
  </div>)
};

const query$ = new BehaviorSubject('test' );
const limit$ = new BehaviorSubject(limits[0]);

const queryForFetch$ = query$.pipe(
  debounce(() => timer(1000)),
);

const results$ = combineLatest(queryForFetch$, limit$).pipe(
    // @ts-ignore
    flatMap(([query, limit]) => Api.fetchData(query, limit)),
);

const togglers = {
  handleChange: (value: string) => query$.next(value ),
  handleLimit: (value: string) => limit$.next(value),
};

const initialState = {
  query: 'test',
  limit: limits[0],
  results: [],
}

export default withObservableStream(
  // @ts-ignore
  combineLatest(
    limit$,
    query$,
    results$, 
    (limit, query, results) => ({
      limit,
      query,
      results
    })
  ),
  togglers,
  initialState
)(App);
