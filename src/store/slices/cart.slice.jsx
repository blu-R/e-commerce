import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {},
    reducers: {
        setCart: (state, action) => {
            return action.payload;
        },
    },
});

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get(
            "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
            getConfig()
        )
        .then((res) => {
            // console.log(res.data);
            dispatch(setCart(res.data.data.cart));
        })
        .finally(() => dispatch(setIsLoading(false)));
};

export default cartSlice.reducer;
