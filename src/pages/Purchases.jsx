import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchases } from "../store/slices/purchases.slice";
import { useNavigate } from "react-router-dom";

function Purchases() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector((state) => state.purchases);

    useEffect(() => {
        dispatch(getPurchases());
    }, []);

    return (
        <div>
            <h1>My purchases</h1>
            {purchases.map((purchase) => (
                <div key={purchase.id}>
                    <span>{purchase.createdAt}</span>
                    {purchase.cart?.products?.map((product) => (
                        <div className="">
                            <p
                                onClick={() =>
                                    navigate(`/product/${product.id}`)
                                }
                                style={{ cursor: "pointer" }}
                            >
                                {product.title}
                            </p>
                            <p>{product.productsInCart.quantity}</p>
                            <span>{product.price}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Purchases;
