import { Component } from 'react';
import { ErrorPage } from '../../pages/ErrorPage';
import { Props, TState } from './typings';

export class ErrorBoundary extends Component<Props, TState> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = { error: null };
  }

  public static getDerivedStateFromError(error: Error): TState {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
    });
    // You can also log error messages to an error reporting service here
  }

  public render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <ErrorPage />;
    }

    return children;
  }
}
