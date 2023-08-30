import React from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-full py-5">
      <div className="w-full flex items-center justify-center">
        <img src={`${backend_url}${seller?.avatar}`} alt="" />
      </div>
    </div>
  );
};

export default ShopInfo;
