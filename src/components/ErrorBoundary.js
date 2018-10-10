import React, { Component } from 'react';


class ErrorBoundary extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = { error: null, errorInfo: null };
    // }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.props.updateSuperState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
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
              {this.props.errorInfo.message}
            </details>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

export default ErrorBoundary