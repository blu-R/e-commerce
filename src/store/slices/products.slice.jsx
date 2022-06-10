import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setProducts: (state, action) => action.payload,
    },
});

export const { setProducts } = productsSlice.actions;

export const getProducts = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
        .then((res) => {
            // console.log(res.data.data.products);
            dispatch(setProducts(res.data.data.products));
        })
        .finally(() => dispatch(setIsLoading(false)));
};

export const getProductsByKeyword = (keyword) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .get(
            `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${keyword}`
        )
        .then((res) => {
            // console.log(res.data.data.products);
            dispatch(setProducts(res.data.data.products));
        })
        .finally(() => dispatch(setIsLoading(false)));
};

export const getProductsByCategory = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .get(
            `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`
        )
        .then((res) => {
            // console.log(res.data.data.products);
            dispatch(setProducts(res.data.data.products));
        })
        .finally(() => dispatch(setIsLoading(false)));
};

export default productsSlice.reducer;
