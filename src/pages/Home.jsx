import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    FormControl,
    InputGroup,
    ListGroup,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/slices/cart.slice";
import {
    getProducts,
    getProductsByCategory,
    getProductsByKeyword,
} from "../store/slices/products.slice";

import "../styles/home.css";

function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products);

    const [keyword, setKeyword] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch(getProducts());
        axios
            .get(
                "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
            )
            .then((res) => setCategories(res.data.data.categories));
    }, []);

    const filterByKeyword = () => {
        dispatch(getProductsByKeyword(keyword));
    };
    const filterByCategory = (id) => {
        dispatch(getProductsByCategory(id));
    };

    const allProducts = () => {
        dispatch(getProducts());
    };

    const addProduct = (id) => {
        const product = {
            id,
            quantity: "1",
        };

        dispatch(addToCart(product));
        console.log(product);
    };

    return (
        <div>
            <Row className="g-4">
                <Col lg={3} className="py-5">
                    <h4>Categories</h4>
                    <ListGroup>
                        <ListGroup.Item
                            onClick={allProducts}
                            style={{ cursor: "pointer" }}
                        >
                            All
                        </ListGroup.Item>
                        {categories.map((category) => (
                            <ListGroup.Item
                                key={category.id}
                                onClick={() => filterByCategory(category.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    <Container className="d-flex justify-content-center">
                        <InputGroup className="w-75 my-5 ">
                            <FormControl
                                placeholder="What are you looking for?"
                                aria-label="Recipient's username with two button addons"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="fs-5 py-2"
                            />
                            <Button
                                onClick={filterByKeyword}
                                variant="outline-secondary"
                                id="button-addon2"
                            >
                                <i className="fa-solid fa-magnifying-glass fs-5 py-2 px-4"></i>
                            </Button>
                        </InputGroup>
                    </Container>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {products.map((product) => (
                            <Col key={product.id}>
                                <div
                                    className="container-card"
                                    style={{ position: "relative" }}
                                >
                                    <Card
                                        onClick={() =>
                                            navigate(`/product/${product.id}`)
                                        }
                                        style={{
                                            cursor: "pointer",
                                            height: "350px",
                                        }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={product.productImgs?.[0]}
                                            className="p-3"
                                            style={{
                                                objectFit: "contain",
                                                height: "200px",
                                                width: "auto",
                                                transition: "onMouseOver 0.8s",
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.src = `${product.productImgs?.[1]}`)
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.src = `${product.productImgs?.[0]}`)
                                            }
                                        />
                                        <Card.Body className="card-info border-top">
                                            <Card.Title className="ps-2">
                                                {product.title}
                                            </Card.Title>
                                            <div>
                                                <span>Price</span>
                                                <p className="ps-2">
                                                    $ {product.price}
                                                </p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <Button
                                        onClick={() => addProduct(product.id)}
                                    >
                                        <i className="fa-solid fa-cart-plus"></i>
                                    </Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Products;
