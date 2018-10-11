// resource: https://codepen.io/gaearon/pen/wqvxGa?editors=0010
import React from 'react';


class ErrorBoundary extends React.Component {
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      //updateSuperState is used to set the state of App.js, no matter where ErrorBoundary is used
      this.props.updateSuperState({
        error: error,
        errorInfo: errorInfo
      })
    }
    
    render() {
      if (this.props.errorInfo) {
        // Error path
        return (
          <div className='error'>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.props.error && this.props.error.toString()}
              <br />
              {this.props.errorInfo.stack}
            </details>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

export default ErrorBoundary