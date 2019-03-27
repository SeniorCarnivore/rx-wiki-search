import { Observable } from 'rxjs';

export type requestObs = Observable<{ request: { request: string; }; response: { results: never[]; }; }>;

export type HandlerFunction = (value: string) => void;