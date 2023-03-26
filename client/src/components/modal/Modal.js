import React, { useState } from "react";
import close from "../images/close.png";
import "./Modal.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

//   prevent scrolling when modal active
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal btn btn-danger btn-block">
        Predict
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h5>Prediction Results</h5>
            <p>
                INSERT RESULTS HERE
            </p>
            <input type="image" src={close} className="close-modal" onClick={toggleModal} />
          </div>
        </div>
      )}      
    </>
  );
}