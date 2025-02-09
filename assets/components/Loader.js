import React from 'react';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loader = () => {
  return (
    <div className='loader'>
      <ClimbingBoxLoader
      color="#3091FB"
      loading="true"
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
      cssOverride={{
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      }}
    />
    <div className='text'>Chargement...</div>
    </div>
  );
};

export default Loader;
