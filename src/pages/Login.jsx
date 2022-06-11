import axios from "axios";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const submit = (data) => {
        axios
            .post(
                "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
                data
            )
            .then((res) => {
                localStorage.setItem("token", res.data.data.token);
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
        navigate("/");
    };

    return (
        <div className="">
            {token ? (
                <div className="">
                    <h1>Logout</h1>
                    <button onClick={logOut}>Logout</button>
                </div>
            ) : (
                <div className="d-flex ">
                    <Card style={{ maxWidth: "500px" }} className="mx-auto">
                        <Card.Body>
                            <h1>Login</h1>
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

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default Login;
