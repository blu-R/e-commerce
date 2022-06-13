import axios from "axios";
import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem, Offcanvas } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getConfig from "../utils/getConfig";

import { setCart } from "../store/slices/cart.slice";

function CartSidebar({ show, handleClose }) {
    const cart = useSelector((state) => state.cart);
    const total = useSelector((state) => state.cart.total);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log(total);

    // const [total, setTotal] = useState(0);

    const selectProduct = (id) => {
        handleClose();
        navigate(`/product/${id}`);
    };

    const checkOut = () => {
        axios
            .post(
                "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
                {},
                getConfig()
            )
            .then(() => {
                handleClose();
                dispatch(setCart({}));
                navigate("/purchases");
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <div>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                style={{ top: "70px" }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        {cart.products?.map((product) => (
                            <ListGroupItem
                                onClick={() => selectProduct(product.id)}
                                className="border-end-0 border-start-0 border-top-0"
                                key={product.id}
                                style={{ borderRadius: "0" }}
                            >
                                <div className="d-flex justify-content-between mt-2">
                                    <span style={{ color: "#c7c7c7" }}>
                                        {product.brand}
                                    </span>
                                    <i
                                        className="fa-regular fa-trash-can"
                                        style={{ color: "#f85555" }}
                                    ></i>
                                </div>
                                <p>{product.title}</p>
                                <p className="border d-inline px-4 py-1">
                                    {product.productsInCart?.quantity}
                                </p>
                                <div className="d-flex justify-content-end mt-2">
                                    <span
                                        style={{ color: "#c7c7c7" }}
                                        className="me-4"
                                    >
                                        Total
                                    </span>

                                    <p className="fw-bolder">
                                        ${" "}
                                        {product.productsInCart?.quantity *
                                            Number(product.price)}
                                    </p>
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <ListGroupItem className="mt-4">
                        <div className="d-flex justify-content-between">
                            <p style={{ color: "#c7c7c7" }}>Total</p>
                            <p className="fw-bolder fs-5">$ {total}</p>
                        </div>
                        <div className="d-grid">
                            {cart.products?.length ? (
                                <Button
                                    style={{ background: "#f85555" }}
                                    onClick={checkOut}
                                    size="lg"
                                >
                                    Checkout
                                </Button>
                            ) : (
                                <Button onClick={checkOut} size="lg" disabled>
                                    Checkout
                                </Button>
                            )}
                        </div>
                    </ListGroupItem>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default CartSidebar;
