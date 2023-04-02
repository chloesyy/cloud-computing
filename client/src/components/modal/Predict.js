import React, { useState } from "react";
import close from "../images/close.png";
import "./Predict.css";

export default function Predict({ values, setValues }) {
    const [modal, setModal] = useState(false);

    const setPrediction = (prediction) => {
        setValues({ ...values, prediction: prediction });
    };

    const predict = (e) => {
        e.preventDefault();

        console.log("Predicting...");
        setPrediction(null);

        async function get_response() {
            await fetch("/api/predict", {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setPrediction(data.prediction);
                    console.log(values.prediction);
                });
        }
        get_response();
        setModal(!modal);
    };

    const toggleModal = () => {
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
                onClick={predict}
                className="btn-modal btn btn-danger btn-block"
            >
                Predict
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h5>Prediction Results</h5>
                        <p>
                            {values.prediction != null
                                ? values.prediction >= 0.5
                                    ? "Positive"
                                    : "Negative"
                                : "Invalid Input: Please fill in all input fields"}
                        </p>
                        {values.prediction != null && (
                            <p>
                                Positive Confidence Score: {values.prediction}
                            </p>
                        )}
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
