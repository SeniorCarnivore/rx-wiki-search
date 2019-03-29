import { fetchWikiArticles } from "../api/WikiApi";
import { withObservableStream } from "../utils/withObservableStream";
import { timer, combineLatest, BehaviorSubject } from "rxjs";
import { filter, debounce, switchMap } from "rxjs/operators";
import { App as AppComponent, AppProps } from "./app.component";
import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
const limits = [5, 10, 15];

const query$ = new BehaviorSubject("");
const limit$ = new BehaviorSubject(limits[0]);

const queryForFetch$ = query$.pipe(
  filter(value => value !== ""),
  debounce(() => timer(1000))
);

const results$ = combineLatest(queryForFetch$, limit$).pipe(
  switchMap(([query, limit]) => fetchWikiArticles(query, limit))
);

const defaultProps: AppProps = {
  limits,
  results: [],
  onQueryChange: (value: string) => query$.next(value),
  onLimitChange: (value: number) => limit$.next(value)
};

export const App = withRX(AppComponent)(() => ({
  defaultProps,
  props: {
    results: results$
  }
}));
