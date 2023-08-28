import React from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full">
      {/* Profile Page */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3957DB]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
            <br />
            <br />
          </div>
          <div className="w-full px-5">
            <form>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileContent;
