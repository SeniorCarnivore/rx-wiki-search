import { Observable, Observer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, tap } from "rxjs/operators";

export type WikiResponse = [unknown, unknown, unknown, string[]];

export const fetchWikiArticles = (
  request: string,
  limit: number
): Observable<string[]> => {
  const requestString = `http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${request}&limit=${limit}&namespace=0&format=json`;
  return ajax(requestString).pipe(
    tap(val => console.log(val.response)),
    map(response => response.response as WikiResponse),
    map(wikiResp => wikiResp[3])
  );
};
