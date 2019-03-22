import React, { SFC } from 'react';
// import { BehaviorSubject } from 'rxjs';

export const createObservableContainer = ({}, {}) =>
  (Component: Function | SFC | JSX.Element | React.Component) => {
		return class extends React.Component {
			render() {
				return <Component { ...this.props } { ...this.state } />
			}
		}
	};