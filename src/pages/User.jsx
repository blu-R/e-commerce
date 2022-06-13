import React from "react";

function User() {
    const fullName = localStorage.getItem("fullName");
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");
    const status = localStorage.getItem("status");

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "calc(100vh - 21rem )",
            }}
        >
            <div className="border p-5 rounded">
                <h1>{fullName}</h1>
                <div className="">
                    <strong>E-mail:</strong>
                    <span>{email}</span>
                </div>
                <div className="">
                    <strong>Phone:</strong>
                    <span>{phone}</span>
                </div>
                <div className="">
                    <strong>Status:</strong>
                    <span>{status}</span>
                </div>
            </div>
        </div>
    );
}

export default User;
