import React, { Component, SFC } from 'react';

// import Api from './Api';

import './App.css';
import { createObservableContainer } from './container'
import { BehaviorSubject } from 'rxjs';

interface IAppProps extends React.Component {
  request?: string,
  handleChange?: () => void,
}

const App = (props: IAppProps): JSX.Element => {
  // const {
  //   request,
  //   handleChange,
  // } = props;

  return (
    <div className="App">
      <header className="App-header">
        Wiki Search

        <div>
          <input
            type="text"
            // value={ request }
            // onChange={ handleChange }
          />

          {/* <button onClick={handleSubmit}>Search</button> */}
        </div>
        {/* { data && renderResults() } */}
      </header>
    </div>
  )
};

const request$ = new BehaviorSubject({ request: '' });

export default createObservableContainer(
  request$,
  {
    handleChange: (value: string) => request$.next({ request: value }),
  }
)(App);
