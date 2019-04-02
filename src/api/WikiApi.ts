import { Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError, startWith } from "rxjs/operators";
import {
  RemoteData,
  success,
  pending,
  failure
} from "@devexperts/remote-data-ts";

export type WikiResponse = [unknown, unknown, unknown, string[]];

export const fetchWikiArticles = (
  request: string,
  limit: number
): Observable<RemoteData<Error, WikiResponse>> => {
  const requestString = `http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${request}&limit=${limit}&namespace=0&format=json`;

  return ajax(requestString).pipe(
    map(response => response.response[3] as WikiResponse),
    map(data => success<Error, WikiResponse>(data)),
    catchError(response => {
      console.log("error", response);
      return of(failure<Error, WikiResponse>(response));
    }),
    startWith<RemoteData<Error, WikiResponse>>(pending)
  );
};
