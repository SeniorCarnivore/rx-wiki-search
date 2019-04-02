import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/Observable/dom/AjaxObservable.js";
import { ajax } from "rxjs/ajax";
import { map, catchError, startWith, tap } from "rxjs/operators";
import { RemoteData, RemoteInitial } from '@devexperts/remote-data-ts';

export const fetchWikiArticles = <Response = never>(request: string, limit: number): Observable<RemoteData<Error, Response>> => {
  const requestString = `http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${request}&limit=${limit}&namespace=0&format=json`;

  return ajax(requestString).pipe(
    map((response) => response.response[3]),
    catchError(response => {
      console.log('error', response);
      return response;
    }),
    // startWith<RemoteData<'Error', Response>>(pending)
  )
};

// const request = <Response = never>(request: AjaxRequest): Observable<RemoteData<Response>> => {
//   const url = ${baseHref}${request.url};

  // return ajax(xhr)
  //   .map(response => success(response.response))
  //   .catch(response => {
  //     errorSubj$.next(response);

  //     return of(failure<Response>(response));
  //   })
  //   .startWith<RemoteData<Response>>(pending);
// };