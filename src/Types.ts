import { BehaviorSubject } from 'rxjs';

export default interface IAppProps {
  request$?: BehaviorSubject<{ request: string; }>,
  handleChange?: (value: string) => void,
}