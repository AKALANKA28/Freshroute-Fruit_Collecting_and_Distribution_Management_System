import React from "react";
import { Fragment } from "react";
import { BounceLoader } from "react-spinners";

const LoadingSpinner = ({ color }) => {
  return (
    <Fragment>
      <div className="flex justify-center items-center h-screen">
        {/* BounceLoader with custom color */}
        <BounceLoader color={"#7aeb34"} />
      </div>
    </Fragment>
  );
};

export default LoadingSpinner;
