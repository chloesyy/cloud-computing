import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import close from "../images/close.png";
import tick from "../images/tick.png";
import "./Submit.css";

export default function Submit({ values, setValues, routeBack }) {
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(''); 
    const navigate = useNavigate();

    const submit = (e) => {
      e.preventDefault();

      async function get_response() {
          await fetch("/api/form", {
              method: "POST",
              cache: "no-cache",
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
              },
              body: JSON.stringify(values),
          })
              .then((response) => response.json())
              .then((data) => {
                  setStatus("Patient details have been successfully submitted!")
                  routeBack()
                  console.log(data);
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
                type="submit"
                onClick={submit}
                className="btn-modal btn btn-block"
            >
                Submit
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        {/* <img src={tick}></img> */}
                        <p>{status}</p>
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
