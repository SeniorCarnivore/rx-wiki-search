import { fetchWikiArticles } from '../api/WikiApi';
import { timer, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, debounce, switchMap } from 'rxjs/operators';
import { withRX, Observify } from '@devexperts/react-kit/dist/utils/with-rx2';
import { pending } from '@devexperts/remote-data-ts';
import { mapRD } from '@devexperts/rx-utils/dist/rd/operators/mapRD';
// import { map, tap } from 'rxjs/operators';

import { App as AppComponent, AppProps } from './app.component';

const limits = [5, 10, 15];

const query$ = new BehaviorSubject('');
const limit$ = new BehaviorSubject(limits[0]);

const queryForFetch$ = query$.pipe(
  filter(value => value !== ''),
  debounce(() => timer(1000))
);

const results$ = combineLatest(queryForFetch$, limit$).pipe(
  switchMap(([query, limit]) => fetchWikiArticles(query, limit))
);

const defaultProps: Partial<AppProps> = {
  limits,
  results: pending,
  onQueryChange: (value: string) => query$.next(value),
  onLimitChange: (value: number) => limit$.next(value)
};

const props: Partial<Observify<AppProps>> = {
  results: results$.pipe(mapRD(wikiResp => wikiResp))
};



export const App = withRX(AppComponent)(() => ({
  defaultProps,
  props
}));
