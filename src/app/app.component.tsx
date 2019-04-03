import React, { SFC } from 'react';
import { RemoteData } from '@devexperts/remote-data-ts';
import { Observable, of } from 'rxjs';
import { getRenderRemoteData } from '@devexperts/react-kit/dist/components/render-remote-data/get-render-remote-data';

import './app.css';

export type AppProps = {
  onQueryChange: (value: string) => void;
  onLimitChange: (value: number) => void;
  limits: number[];
  results: RemoteData<Error, string[]>;
};

export const App = (props: AppProps) => {
  const { onQueryChange, onLimitChange, results, limits } = props;

  const DataStatePending = () => <p>pending</p>;
  const DataStateFailure: SFC<{ error: Error }> = props => <p>error: {props.error.message}</p>;
  const DataStateNoData = () => <p>no data</p>;

  const RenderRemoteData = getRenderRemoteData({
    DataStatePending,
    DataStateNoData,
    DataStateFailure,
  });

  const renderSuccess = (results: string[]) =>
    results.length > 0 ?
      <ul>
        {
          results.map((el: string, i: number) =>
            <li key={i}>{el}</li>
          )
        }
      </ul> :
      <p>no results found</p>

  return (
    <div className='App'>
      <header className='App-header'>
        Wiki Search
        <div>
          <input type='text' onChange={e => onQueryChange(e.target.value)} />

          <select onChange={e => onLimitChange(Number(e.target.value))}>
            {limits.map(limitVal => (
              <option key={limitVal} value={limitVal}>
                {limitVal}
              </option>
            ))}
          </select>
        </div>

        <RenderRemoteData success={renderSuccess} data={results}/>
      </header>
    </div>
  );
};
