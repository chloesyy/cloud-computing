import React, { useState } from "react";
import close from "../images/close.png";
import "./Predict.css";

export default function Predict({ values }) {
    const [modal, setModal] = useState(false);

    const toggleModal = (e) => {
        e.preventDefault();

        console.log("Predicting...");
        // TODO: Figure out error

        async function get_response() {
            await fetch("/predict", {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    console.log("predicted!");
                    // console.log(response);
                }
                console.log(response);
            });
        }
        get_response();
        setModal(!modal);
    };

    //   prevent scrolling when modal active
    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    return (
        <>
            <button
                onClick={toggleModal}
                className="btn-modal btn btn-danger btn-block"
            >
                Predict
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h5>Prediction Results</h5>
                        <p>INSERT RESULTS HERE</p>
                        <input
                            type="image"
                            src={close}
                            className="close-modal"
                            onClick={toggleModal}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
