/* tslint:disable */
import React, { SFC } from 'react';
import { requestObs } from './Types';

export const withObservableStream = (observable: requestObs, triggers: {}, initialState: {}) =>
	(Element: Function) => {
		class Wrapper extends React.Component {
			componentDidMount() {
				this.setState({ ...initialState })
				// @ts-ignore
				this.subscription = observable.subscribe(newState => 
					this.setState({ ...newState })
				);
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