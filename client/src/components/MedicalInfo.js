import React, { useState } from "react";
import Wrapper from "../pages/wrappers/Login";
import FormRow from "./FormRow";
import Checkbox from "./Checkbox";
import DateInput from "./DateInput";
import Modal from "./modal/Modal";

export default function MedicalInfo({
    nextStep,
    previousStep,
    handleChange,
    values,
    setValues,
}) {
    console.log(values);

    const onSubmit = (e) => {
        e.preventDefault();

        const response = fetch("/form", {
            credentials: "include",
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            console.log("response worked!");
        }
    };

    const Predict = (e) => {
        e.preventDefault();
        console.log("Predicting...");
        // TODO: PREDICTION OF MODEL HERE
    };
    const Previous = (e) => {
        e.preventDefault();
        previousStep();
    };
    const Continue = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={onSubmit}>
                <h3>Medical Information</h3>
                <FormRow
                    type="number"
                    name="concavityMean"
                    labelText="Concavity Mean"
                    value={values.concavityMean}
                    handleChange={handleChange}
                />
                <FormRow
                    type="number"
                    name="concavitySE"
                    labelText="Concavity SE"
                    value={values.concavitySE}
                    handleChange={handleChange}
                />
                <FormRow
                    type="number"
                    name="areaMean"
                    labelText="Area Mean"
                    value={values.areaMean}
                    handleChange={handleChange}
                />
                <FormRow
                    type="number"
                    name="areaSE"
                    labelText="Area SE"
                    value={values.areaSE}
                    handleChange={handleChange}
                />
                <FormRow
                    type="number"
                    name="areaWorst"
                    labelText="Area Worst"
                    value={values.areaWorst}
                    handleChange={handleChange}
                />
                <FormRow
                    type="number"
                    name="symmetryMean"
                    labelText="Symmetry Mean"
                    value={values.symmetryMean}
                    handleChange={handleChange}
                />
                <FormRow
                    type="number"
                    name="textureMean"
                    labelText="Texture Mean"
                    value={values.textureMean}
                    handleChange={handleChange}
                />
                {/* <FormRow
                    type="file"
                    name="medicalImage"
                    labelText="Medical Image"
                    value={values.medicalImage}
                    handleChange={handleChange}
                /> */}
                <FormRow
                    type="text"
                    name="results"
                    labelText="Results"
                    value={values.results}
                    handleChange={handleChange}
                />

                <Modal onClick={Predict} />

                <div className="form-container">
                    <button onClick={Previous} className="btn btn-block">
                        Back
                    </button>
                    <button onClick={Continue} className="btn btn-block">
                        Next
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}
