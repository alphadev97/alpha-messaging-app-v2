import React, { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopLoginPage = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
