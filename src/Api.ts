import axios from 'axios';
import { Observable, Observer } from 'rxjs';

export default {
	host: 'http://localhost:3000/',
	fetchData$(request: string) {
		return Observable.create((observer: Observer<JSON>) => {
			const requestString = `http://en.wikipedia.org/w/api.php?
									origin=*&
									action=opensearch&
									search=${request}&
									limit=10&
									namespace=0&
									format=json`;

			fetch(requestString)
				.then(response => response.json())
				.then(data => {
					observer.next(data[3]);
					observer.complete();
				})
				.catch(err => observer.error(err));
		});
	},
};