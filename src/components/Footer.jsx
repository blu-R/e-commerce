import React from "react";

import "../styles/footer.css";

function Footer() {
    return (
        <div
            style={{ height: "14rem", background: "#3C3C3B" }}
            className="w-100 text-white d-flex flex-column justify-content-center align-items-center mt-5"
        >
            <p className="mt-2">
                <i className="fa-regular fa-copyright"></i> ~ bLu.Я ~ 2022
            </p>
            <div className="social d-flex">
                <span>
                    <i className="fa-brands fa-instagram"></i>
                </span>
                <span>
                    <i className="fa-brands fa-linkedin-in"></i>
                </span>
                <span>
                    <i className="fa-brands fa-youtube"></i>
                </span>
            </div>
        </div>
    );
}

export default Footer;
