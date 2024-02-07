import { useSelector, useDispatch } from "react-redux";
import { setTheme, setUser } from "../slices/userSlice";
import { useCallback } from "react";

const useFetcher = () => {
  const selectedUser = useSelector((state) => state.user.user);
  const selectedTheme = useSelector((state) => state.user.theme);

  const dispatch = useDispatch();

  const setSelectedUser = useCallback(
    (data) => {
      dispatch(setUser(data));
    },
    [dispatch]
  );

  const setSelectedTheme = useCallback(
    (data) => {
      dispatch(setTheme(data));
    },
    [dispatch]
  );

  return { selectedUser, setSelectedUser, setSelectedTheme, selectedTheme };
};

export default useFetcher;
