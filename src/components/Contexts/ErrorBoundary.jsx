import React from "react";
import PropTypes from "prop-types";

// Dette er en af de ting som hooks stadig ikke kan bruges til
// derfor bruger vi en klasse til at fange fejl og vise det nødvendige
// til brugeren

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo,
      error,
    });
    console.error(
      "ErrorBoundary -> componentDidCatch -> error, errorInfo",
      error,
      errorInfo
    );
  }

  resetError() {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  }

  render() {

    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.errorComponent) {
        const ErrorComponent = this.props.errorComponent;
        return (
          <ErrorComponent
            {...{
              ...this.props,
              ...this.state,
              // error: this.state.error,
              // errorInfo: this.state.errorInfo,
              resetError: this.resetError,
            }}
          />
        );
      }
      return (
        <div>
          <h1>Noget gik galt</h1>
          <button onClick={this.resetError}>Prøv igen</button>
          <pre>{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  errorComponent: PropTypes.elementType,
};

export default ErrorBoundary;
