import React from "react";
import { Rings } from "react-loader-spinner";

export const Loader: React.FC = () => {
  return <Rings visible={true} height="200" width="200" color="#46a2da" ariaLabel="rings-loading" />;
};
