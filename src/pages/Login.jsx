import axios from "axios";
import React from "react";
import { Button, Card, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import "../styles/login.css";

function Login() {
    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const fullName = localStorage.getItem("fullName");

    const submit = (data) => {
        axios
            .post(
                "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
                data
            )
            .then((res) => {
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem(
                    "fullName",
                    `${res.data.data.user.firstName} ${res.data.data.user.lastName}`
                );
                localStorage.setItem("email", res.data.data.user.email);
                localStorage.setItem("phone", res.data.data.user.phone);
                localStorage.setItem("status", res.data.data.user.status);
                navigate("/");
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response.status === 404) {
                    alert("Unknown user");
                }
            });
    };

    const logOut = () => {
        localStorage.setItem("token", "");
        // navigate("/");
    };

    return (
        <div className="">
            {token ? (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        height: "calc(100vh - 21rem )",
                    }}
                >
                    <div
                        className="d-flex flex-column justify-content-center align-items-center border"
                        style={{
                            width: "450px",
                            height: "250px",
                            borderRadius: "10px",
                        }}
                    >
                        <p
                            onClick={() => navigate("/user")}
                            style={{ cursor: "pointer" }}
                        >
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id="user-tooltip">
                                        View profile
                                    </Tooltip>
                                }
                            >
                                <i
                                    className="fa-solid fa-user-large"
                                    style={{
                                        fontSize: "70px",
                                        color: "#c7c7c7",
                                    }}
                                ></i>
                            </OverlayTrigger>
                        </p>
                        <p className="fw-bolder">{fullName}</p>
                        <Link
                            to={"/"}
                            onClick={logOut}
                            className="text-decoration-none"
                            style={{ color: "#2fa8f8" }}
                        >
                            Log out
                        </Link>
                    </div>
                </div>
            ) : (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        height: "calc(100vh - 15rem )",
                        // background: "#F8F8F8",
                    }}
                >
                    <Card
                        style={{ maxWidth: "500px" }}
                        className="mx-auto px-4 pt-4 mt-5"
                    >
                        <Card.Body>
                            <h3>
                                Welcome! Enter your email and password to
                                continue
                            </h3>
                            <div
                                className="text-center my-3 pt-3 rounded"
                                style={{ background: "#D8F5FD" }}
                            >
                                <h5>Test data</h5>
                                <div className="d-flex flex-column align-items-start">
                                    <p>
                                        <i className="fa-regular fa-envelope px-3"></i>
                                        corco.bain@acme.com
                                    </p>
                                    <p>
                                        <i className="fa-solid fa-lock px-3"></i>
                                        pass43210
                                    </p>
                                </div>
                            </div>
                            <Form onSubmit={handleSubmit(submit)}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        {...register("email")}
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone
                                        else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicPassword"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        {...register("password")}
                                    />
                                </Form.Group>

                                <Button
                                    style={{
                                        background: "#f85555",
                                        border: "none",
                                        width: "100%",
                                    }}
                                    variant="primary"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Form>
                            <div className="d-flex mt-4">
                                <p>Don't have an account? </p>
                                <Link
                                    className=" ms-2 text-decoration-none"
                                    to={"/signin"}
                                    style={{ color: "#2fa8f8" }}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default Login;
