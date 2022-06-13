import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchases } from "../store/slices/purchases.slice";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

function Purchases() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector((state) => state.purchases);

    useEffect(() => {
        dispatch(getPurchases());
    }, []);

    const formatDate = (data) => {
        const date = new Date(data);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <div
        // className=""
        // style={{
        //     height: "calc(100vh - 21rem )",
        // }}
        >
            <Container
                className="d-flex flex-column mt-5"
                style={{ padding: "0 150px" }}
            >
                <p>
                    Home
                    <i
                        className="fa-solid fa-circle px-3 "
                        style={{ fontSize: "7px", color: "#f85555" }}
                    ></i>
                    <strong>purchases</strong>
                </p>
                <h1 className="my-3 fs-3" style={{ fontWeight: "700" }}>
                    My purchases
                </h1>

                {purchases.map((purchase) => (
                    <Card key={purchase.id} className="my-2">
                        <Card.Header className="fw-bolder">
                            {formatDate(purchase.createdAt)}
                        </Card.Header>
                        <Card.Body>
                            {purchase.cart?.products?.map((product) => (
                                <div
                                    key={product.id}
                                    className="d-flex mt-3"
                                    onClick={() =>
                                        navigate(`/product/${product.id}`)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    <p className="col-2"></p>
                                    <p className="col-6 py-2">
                                        {product.title}
                                    </p>
                                    <div className="col-2 text-center d-flex ">
                                        <p className="border d-inline px-4 py-2 ">
                                            {product.productsInCart.quantity}
                                        </p>
                                    </div>
                                    <span className="col-2 py-2 fw-bolder">
                                        $ {product.price}
                                    </span>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    );
}

export default Purchases;
