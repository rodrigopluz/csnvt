import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="preloader" id="preloader">
      <div className="loader">
        <div className="line-scale">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
