import React, { useState } from "react";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="w-full">
      <div className="flex w-full items-center">
        <div className="flex items-center">
          <h5
            className={`font-[600] text-[20px] text-red-500 cursor-pointer pr-[20px]`}
          >
            Shop Products
          </h5>
        </div>

        <div className="flex items-center">
          <h5 className="font-[600] text-[20px]  cursor-pointer pr-[20px]">
            Running Events
          </h5>
        </div>

        <div className="flex items-center">
          <h5 className="font-[600] text-[20px]  cursor-pointer pr-[20px]">
            Shop Reviews
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ShopProfileData;
