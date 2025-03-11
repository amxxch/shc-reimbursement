'use client'
import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";


const SpinnerLoader = () => {
  const [loading] = useState(true);
  const [color] = useState("#000000");

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default SpinnerLoader;
