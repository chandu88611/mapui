import React from 'react'

function NotFound() {
  return (
    <div className="container-xxl">
    <div className="error-wrapper">
      <div className="error-thumb">
        <img src="/assets/images/error/error-img-1.png" alt="image" />
      </div>
      <div className="error-content">
        <h2>Sorry, something went wrong</h2>
        <p>
          Sorry, the page you are looking for cannot be found. It might have been
          removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="error-btn">
          <a href="index.html" className="btn btn-primary rounded-pill xxl">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default NotFound
