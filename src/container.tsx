/* tslint:disable */
import React, { SFC } from 'react';
import { BehaviorSubject } from 'rxjs';
import { requestObs } from './Types';
import { observable, Subscription } from 'rxjs';

export const withObservableStream = (request$: requestObs, triggers: {}, initialState: {}) =>
	(Element: Function | SFC | JSX.Element | React.Component) => {
		class Wrapper extends React.Component {
			constructor(props: Object) {
				super(props);

				this.setState({ initialState })
			}

			componentDidMout() {
				// @ts-ignore
				this.subscription = request$.subscribe(newState => this.setState({ ...newState }))
			 }
			 
			 componentWillUnmount() {
				// @ts-ignore
				this.subscription.unsubscribe();
			  }

			render() {
				// @ts-ignore
				return <Element { ...this.props } { ...this.state } { ...triggers } />
			}
		}

		return Wrapper;
	};