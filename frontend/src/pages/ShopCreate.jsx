import React, { useEffect } from "react";
import ShopCreateComponent from "../components/Shop/ShopCreateComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopCreate = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  return (
    <div>
      <ShopCreateComponent />
    </div>
  );
};

export default ShopCreate;
