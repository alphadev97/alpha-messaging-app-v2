import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  return <div></div>;
};

export default ProductDetails;
