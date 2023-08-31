import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { sellerReducer } from "./reducers/sellerReducer";
import { productReducer } from "./reducers/productReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
  },
});

export default Store;
