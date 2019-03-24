/* tslint:disable */
import React, { SFC } from 'react';
// import { BehaviorSubject } from 'rxjs';
import IAppProps from './Types';

export const createObservableContainer = (props: IAppProps) =>
	(Element: Function | SFC | JSX.Element | React.Component) => {
		class Wrapper extends React.Component {
			constructor() {
				super(props);
				console.log(Element)
			}

			render() {
				return <Element { ...this.props } { ...this.state } />
			}
		}

		return Wrapper;
	};