/* tslint:disable */
import React, { SFC } from 'react';
import { requestObs } from './Types';
import { Subscription } from 'rxjs';

export const withObservableStream = (observable: requestObs, triggers: {}, initialState: {}) =>
	(Element: Function) => {
		class Wrapper extends React.Component {
			constructor(props: {}, private subscription: Subscription | null) {
				super(props);
				this.subscription = null;
			}

			componentDidMount() {
				this.setState({ ...initialState });
				this.subscription = observable.subscribe(newState => 
					this.setState({ ...newState })
				);
			}
			 
			 componentWillUnmount() {
				this.subscription && this.subscription.unsubscribe();
			}

			render() {
				return <Element { ...this.props } { ...this.state } { ...triggers } />;
			}
		}

		return Wrapper;
	};