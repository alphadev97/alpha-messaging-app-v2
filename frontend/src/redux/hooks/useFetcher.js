import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useCallback } from "react";

const useFetcher = () => {
  const selectedUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const setSelectedUser = useCallback(
    (data) => {
      dispatch(setUser(data));
    },
    [dispatch]
  );

  return { selectedUser, setSelectedUser };
};

export default useFetcher;
