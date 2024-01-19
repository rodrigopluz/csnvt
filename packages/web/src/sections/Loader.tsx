import React from 'react';

const Loader: React.FC = () => {
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

        <div className="text-center mt-5">
          <span className="spinner spinner-lg spinner-primary spinner-right"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
