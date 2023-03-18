import React from "react";
import Wrapper from "../pages/wrappers/Login";
import DateInput from "./DateInput";

export default function ClosingForm({
    nextStep,
    previousStep,
    handleChange,
    values,
    setValues,
}) {
    console.log(values);

    const setDOC = (date) => {
        setValues({ ...values, doc: date });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { patientName, age, isFemale, isLeft, isImplant, density } =
            values;

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

    const Previous = (e) => {
        e.preventDefault();
        previousStep();
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={onSubmit}>
                <h3>Patient Information</h3>
                <div>
                    <label className="form-label">Final Diagnosis</label>
                    <select
                        className="form-select"
                        name="diagnosis"
                        value={values.diagnosis}
                        onChange={handleChange}
                    >
                        <option value="A">Positive</option>
                        <option value="B">Negative</option>
                    </select>
                </div>
                <DateInput
                    selected={values.doc}
                    handleChange={setDOC}
                    labelText="Date Closed"
                />
                <div className="form-container">
                    <button onClick={Previous} className="btn btn-block">
                        Back
                    </button>
                    <button type="submit" className="btn btn-block">
                        Submit
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}