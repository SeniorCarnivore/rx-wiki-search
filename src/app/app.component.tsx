import React from "react";
import "./app.css";

export type AppProps = {
  onQueryChange: (value: string) => void;
  onLimitChange: (value: number) => void;
  limits: number[];

  results: Array<string>;
};

export const App = (props: AppProps) => {
  const { onQueryChange, onLimitChange, results, limits } = props;

  return (
    <div className="App">
      <header className="App-header">
        Wiki Search
        <div>
          <input type="text" onChange={e => onQueryChange(e.target.value)} />

          <select onChange={e => onLimitChange(Number(e.target.value))}>
            {limits.map(limitVal => (
              <option key={limitVal} value={limitVal}>
                {limitVal}
              </option>
            ))}
          </select>
        </div>
        {results && (
          <ul>
            {results.map((el: string, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};
