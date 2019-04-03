// custom implementation of withRx library. Adds stream to element

import { Subscription, Observable } from 'rxjs';
import { ComponentType, Component, createElement } from 'react';

export const withObservableStream = <Props, P extends keyof Props>(
  defaultProps: Props,
  observable: Observable<Props[P]>,
  propName: P
) => (Element: ComponentType<Props>) => {
  class Wrapper extends Component<Partial<Props>> {
    state = {
      value: null
    };

    constructor(props: Props, private subscription: Subscription | null) {
      super(props);
    }

    componentDidMount() {
      this.setState({ value: defaultProps[propName] });
      this.subscription = observable.subscribe(value =>
        this.setState({ value })
      );
    }

    componentWillUnmount() {
      this.subscription && this.subscription.unsubscribe();
    }

    render() {
      const props = {
        ...defaultProps,
        ...this.props,
        [propName]: this.state.value
      };

      return createElement(Element, props);
    }
  }

  return Wrapper;
};
