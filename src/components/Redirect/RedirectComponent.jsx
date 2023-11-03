// RedirectComponent.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const RedirectComponent = ({ targetUrl, delay = 0 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = targetUrl;
    }, delay);
    return () => clearTimeout(timer);
  }, [targetUrl, delay]);

  return (
    <div>
      Redirecting...
    </div>
  );
}

RedirectComponent.propTypes = {
  targetUrl: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

export default RedirectComponent;
