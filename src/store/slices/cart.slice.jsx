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
            const subtotals = [];
            res.data.data?.cart?.products?.map((product) => {
                subtotals.push(
                    Number(product.price) * product.productsInCart.quantity
                );
                // console.log(subtotals);
            });

            const total = subtotals.reduce(
                (partialSum, a) => partialSum + a,
                0
            );
            // console.log(total);
            dispatch(setCart({ ...res.data.data.cart, total }));
        })
        .catch((error) => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
};

export const addToCart = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post(
            "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
            product,
            getConfig()
        )
        .then(() => {
            dispatch(getCart());
            alert("Product added to cart :)");
        })
        .catch((error) => {
            console.log(error.response);
            alert("An error has ocurred");
        })
        .finally(() => dispatch(setIsLoading(false)));
};

export default cartSlice.reducer;
