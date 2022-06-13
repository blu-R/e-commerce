import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartSidebar } from "../components";

import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/slices/cart.slice";

import "../styles/navbar.css";

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fullName = localStorage.getItem("fullName");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setShow(true);
        } else {
            navigate("/login");
        }
    };

    useEffect(() => {
        dispatch(getCart());
    }, []);

    return (
        <div>
            <Navbar
                bg="white"
                expand="lg"
                className="border ps-4"
                style={{ height: "70px" }}
            >
                {/* <Container className="w-100"> */}
                <Navbar.Brand
                    style={{ cursor: "pointer" }}
                    className="navbar-brand fs-1"
                    onClick={() => navigate("/")}
                >
                    e-commerce
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    style={{
                        background: "#fff",
                        position: "relative",
                        zIndex: "77",
                    }}
                >
                    <Nav className="ms-auto ">
                        <Nav.Link href="/#/login" className="border-start">
                            {/* {fullName ? (
                                <div className="">
                                    <i
                                        className="fa-solid fa-circle-user fs-5 px-5"
                                        style={{ color: "#dcd9d9" }}
                                    ></i>
                                    <p className="fs-8">{fullName}</p>
                                </div>
                            ) : (
                                <i
                                    className="fa-solid fa-circle-user fs-3 px-5"
                                    style={{ color: "#dcd9d9" }}
                                ></i>
                            )} */}
                            <i
                                className="fa-solid fa-circle-user fs-3 px-5"
                                style={{ color: "#dcd9d9" }}
                            ></i>
                        </Nav.Link>
                        <Nav.Link href="/#/purchases" className="border-start ">
                            <i
                                className="fa-solid fa-bag-shopping fs-3 px-5"
                                style={{ color: "#dcd9d9" }}
                            ></i>
                        </Nav.Link>
                        <Nav.Link
                            role="button"
                            onClick={handleShow}
                            className="border-start "
                        >
                            <i
                                className="fa-solid fa-cart-shopping fs-3 px-5"
                                style={{ color: "#dcd9d9" }}
                            ></i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {/* </Container> */}
            </Navbar>
            <CartSidebar show={show} handleClose={handleClose} />
        </div>
    );
}

export default NavBar;
