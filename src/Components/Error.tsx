import React from "react";

const Error = ({message}: {message: string}) => {
  return (
    <div>
      <div className="h-40vh">{message}</div>
    </div>
  );
};

export default Error;
