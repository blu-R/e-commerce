import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Card,
    Col,
    Container,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import { getProductsByCategory } from "../store/slices/products.slice";
import { addToCart } from "../store/slices/cart.slice";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products);
    // console.log(products);

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // console.log(products);
        axios
            .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
            .then((res) => {
                const itemSelected = res.data.data.products.find(
                    (itemS) => itemS.id === Number(id)
                );
                setProduct(itemSelected);
                setQuantity(1);
                dispatch(getProductsByCategory(itemSelected.category.id));
            })
            .catch((error) => {
                console.log(error.response);
                alert("An error has ocurred.");
                navigate("/");
            });
    }, [id]);

    const addProduct = () => {
        const product = {
            id,
            quantity,
        };

        dispatch(addToCart(product));
        console.log(product);
    };

    return (
        <div>
            <Container className="d-flex align-items-baseline py-5">
                <p>
                    Home
                    <i
                        className="fa-solid fa-circle px-3 "
                        style={{ fontSize: "7px", color: "#f85555" }}
                    ></i>
                    <strong>{product.title}</strong>
                </p>
            </Container>
            <Row style={{ padding: "0 70px" }}>
                <Col>
                    <div className="">
                        <img
                            src={product.productImgs?.[0]}
                            alt=""
                            style={{
                                // display: "block",
                                objectFit: "scale-down",
                                height: "400px",
                                maxWidth: "550px",
                            }}
                        />
                    </div>
                </Col>
                <Col lg={6}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <div className="d-flex flex-wrap">
                        <div className="d-flex flex-column w-50">
                            <span style={{ color: "#c7c7c7" }}>Price</span>
                            <p
                                className="fs-4 ps-3"
                                style={{ fontWeight: "900" }}
                            >
                                $ {product.price}
                            </p>
                        </div>
                        <div className="d-flex flex-column">
                            <span style={{ color: "#c7c7c7" }}>Quantity</span>
                            <input
                                value={quantity}
                                type="number"
                                onChange={(e) => setQuantity(e.target.value)}
                                style={{ width: "60px" }}
                            />
                        </div>
                    </div>
                    <Button
                        className="w-100 py-3 fs-5 mt-4"
                        style={{ background: "#f85555", border: "none" }}
                        onClick={addProduct}
                    >
                        Add to cart
                    </Button>
                </Col>
            </Row>
            <div className="py-5 fs-5 " style={{ color: "#f85555" }}>
                <strong>Discover similar items</strong>
            </div>
            <Col>
                <Row xs={1} md={2} lg={4} className="g-5">
                    {products.map((item) => (
                        <Col>
                            <Card
                                onClick={() => navigate(`/product/${item.id}`)}
                                key={item.id}
                                style={{
                                    cursor: "pointer",
                                    height: "250px",
                                    // width: "auto",
                                    // maxHeight: "300px",
                                }}
                                // className="flex-wrap"
                            >
                                <Card.Img
                                    variant="top"
                                    src={item.productImgs?.[0]}
                                    className="p-3"
                                    style={{
                                        // display: "block",
                                        objectFit: "contain",
                                        height: "150px",
                                        width: "auto",
                                        transition: "onMouseOver 0.8s",
                                    }}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.src = `${item.productImgs?.[1]}`)
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.src = `${item.productImgs?.[0]}`)
                                    }
                                />
                                <Card.Body className=" border-top text-center">
                                    <Card.Title className="ps-2">
                                        {item.title}
                                    </Card.Title>
                                    <p className="ps-2">$ {item.price}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </div>
    );
}

export default ProductDetails;
