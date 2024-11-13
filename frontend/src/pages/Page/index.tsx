import React from "react";
import { useParams } from "react-router-dom";

const Page = () => {
  const params = useParams();
  console.log(params);
  return <div>Page</div>;
};

export default Page;
