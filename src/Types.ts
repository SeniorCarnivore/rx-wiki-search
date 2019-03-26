import { BehaviorSubject } from 'rxjs';

export type requestObs = BehaviorSubject<{ request: string; }>;

export type HandlerFunction = (value: string) => void;