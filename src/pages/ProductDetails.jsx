import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, ListGroupItem, Row } from "react-bootstrap";
import { getProductsByCategory } from "../store/slices/products.slice";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products);
    // console.log(products);

    const [product, setProduct] = useState({});

    useEffect(() => {
        // console.log(products);
        axios
            .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
            .then((res) => {
                const itemSelected = res.data.data.products.find(
                    (itemS) => itemS.id === Number(id)
                );
                setProduct(itemSelected);
                dispatch(getProductsByCategory(itemSelected.category.id));
            });
    }, [id]);

    return (
        <div>
            <Row>
                <Col>
                    <h1>{product.title}</h1>
                    <img
                        src={product.productImgs?.[0]}
                        className="img-fluid"
                        alt=""
                    />
                </Col>
                <Col lg={3}>
                    {products.map((item) => (
                        <ListGroupItem
                            onClick={() => navigate(`/product/${item.id}`)}
                            key={item.id}
                            style={{ cursor: "pointer" }}
                        >
                            {item.title}
                        </ListGroupItem>
                    ))}
                </Col>
            </Row>
        </div>
    );
}

export default ProductDetails;
