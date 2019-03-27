import { Observable, Observer } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export default {
	host: 'http://localhost:3000/',
	fetchData(request: string, limit: string) {
		const requestString =
			`http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${request}&limit=${limit}&namespace=0&format=json`;

		return Observable.create((observer: Observer<JSON>) => {
			ajax(requestString).
				subscribe(res => {
					observer.next(res.response[3]);
					observer.complete();
				});
		})
	},
};