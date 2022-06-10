import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchases } from "../store/slices/purchases.slice";

function Purchases() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.purchases);

    useEffect(() => {
        dispatch(getPurchases());
    }, []);

    return (
        <div>
            <h1>Purchases</h1>
            {products.map((product) => (
                <div key={product.id}>{product.cart?.products?.[0]?.title}</div>
            ))}
        </div>
    );
}

export default Purchases;
