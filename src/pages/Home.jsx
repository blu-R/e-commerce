import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    FormControl,
    InputGroup,
    ListGroup,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getProducts,
    getProductsByCategory,
    getProductsByKeyword,
} from "../store/slices/products.slice";

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

    return (
        <div>
            <Row className="g-4">
                <Col lg={3} className="mb-4">
                    <h4>Categories</h4>
                    <ListGroup>
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
                    <InputGroup className="mb-3 ">
                        <FormControl
                            placeholder="What are you looking for?"
                            aria-label="Recipient's username with two button addons"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <Button
                            onClick={filterByKeyword}
                            variant="outline-secondary"
                            id="button-addon2"
                        >
                            Search
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {products.map((product) => (
                            <Col key={product.id}>
                                <Card
                                    onClick={() =>
                                        navigate(`/product/${product.id}`)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={product.productImgs?.[0]}
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            This is a longer card with
                                            supporting text below as a natural
                                            lead-in to additional content. This
                                            content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Products;
