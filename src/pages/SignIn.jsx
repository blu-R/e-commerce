import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { useSelector, useDispatch } from "react-redux";

function SignIn() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = (data) => {
        dispatch(setIsLoading(true));
        const newUser = { ...data, role: "admin" };
        // console.log(newUser);
        axios
            .post(
                `https://ecommerce-api-react.herokuapp.com/api/v1/users`,
                newUser
            )
            .then((res) => {
                // console.log(res.data);
                alert("User created succesfully. Please, Log in");
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response.status === 400) {
                    alert("Incomplete data. Please fill all fields");
                } else {
                    alert("An error has ocurred");
                    navigate("/");
                }
            })
            .finally(() => dispatch(setIsLoading(false)));
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "calc(100vh - 15rem )",
                // background: "#F8F8F8",
            }}
        >
            <Card
                style={{ minWidth: "450px" }}
                className="mx-auto px-4 pt-4 mt-5"
            >
                <Card.Body>
                    <h3>Sign Up</h3>

                    <Form onSubmit={handleSubmit(submit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register("email")}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                {...register("firstName")}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                {...register("lastName")}
                            />
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
                        <Form.Group className="mb-3">
                            <Form.Label>Phone (10 characters)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                {...register("phone")}
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
                            Sign Up
                        </Button>
                    </Form>
                    <div className="d-flex mt-4">
                        <p>Already have an account? </p>
                        <Link
                            className=" ms-2 text-decoration-none"
                            to={"/login"}
                            style={{ color: "#2fa8f8" }}
                        >
                            Log in
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignIn;
