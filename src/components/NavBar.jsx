import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/slices/cart.slice";

function NavBar() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, []);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/#/">e-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/#/login">Login</Nav.Link>
                            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
                            <Nav.Link role="button">Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;
