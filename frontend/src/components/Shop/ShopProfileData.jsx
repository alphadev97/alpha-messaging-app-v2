import React from "react";

const ShopProfileData = ({ isOwner }) => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <h5 className="font-[600] text-[20px] text-red-500 cursor-pointer">
            Shop Products
          </h5>
        </div>

        <div className="flex items-center">
          <h5 className="font-[600] text-[20px] text-red-500 cursor-pointer">
            Running Events
          </h5>
        </div>

        <div className="flex items-center">
          <h5 className="font-[600] text-[20px] text-red-500 cursor-pointer">
            Shop Reviews
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ShopProfileData;
