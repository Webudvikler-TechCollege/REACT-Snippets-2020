import React from 'react'
import PropTypes from 'prop-types';

// Dette er en af de ting som hooks stadig ikke kan bruges til
// derfor bruger vi en klasse til at fange fejl og vise det nødvendige
// til brugeren

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { 
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary -> componentDidCatch -> error, errorInfo", error, errorInfo)
  }

  resetError() {
    this.setState({
      hasError: false,
      error: null
    })
  }

  render() {
    // this.props.testId
    // console.log("ErrorBoundary -> render -> this.props.testId", this.props.testId)
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // if (React.isValidElement(this.props.errorComponent)) {
      if (this.props.errorComponent) {
        const ErrorComponent = this.props.errorComponent;
        return <ErrorComponent {...{...this.props, error: this.state.e, resetError: this.resetError }} />
      }
      return (
        <div>
          <h1>Noget gik galt</h1>
          <button onClick={this.resetError}>Prøv igen</button>
          {/* {this.props.testId ?? "no-id"} */}
          {/* {this.props.errorComponent ? } */}
          <pre>
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children; 
  }
}

ErrorBoundary.propTypes = {
  errorComponent: PropTypes.elementType
}

export default ErrorBoundary;