import { Observable } from 'rxjs';

export type requestObs = Observable<{ limit: string; query: string; results: {}; }>;

export type HandlerFunction = (value: string) => void;

export interface IAppProps {
  query: string,
  handleChange: Function,
  handleLimit: Function,
  results: Array<string>
}