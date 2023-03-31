import React from "react";
import Wrapper from "../pages/wrappers/Login";
import FormRow from "../components/FormRow";
import DateInput from "../components/DateInput";

export default function PatientDetails({
    nextStep,
    handleChange,
    values,
    setValues,
}) {
    console.log(values);

    const setDOB = (date) => {
        setValues({ ...values, dob: date });
    };

    const setDOS = (date) => {
        setValues({ ...values, dos: date });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        async function get_response() {
            await fetch("/api/form", {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    console.log("response worked!");
                }
            });
        }

        get_response();
    };

    const Continue = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={Continue}>
                <h3>Patient Information</h3>

                <FormRow
                    type="text"
                    name="patientID"
                    labelText="Patient ID"
                    value={values.patientID}
                    handleChange={handleChange}
                />
                <div>
                    <label className="form-label">Patient Name</label>
                    <div className="form-container">
                        <FormRow
                            className="form-first"
                            type="text"
                            name="patientFirstName"
                            subText="First Name"
                            value={values.patientFirstName}
                            handleChange={handleChange}
                        />
                        <FormRow
                            className="form-last"
                            type="text"
                            name="patientLastName"
                            subText="Last Name"
                            value={values.patientLastName}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="form-label">Phone Number</label>
                    <div className="form-container">
                        <FormRow
                            className="form-first"
                            type="number"
                            name="areaCode"
                            subText="Area Code"
                            value={values.areaCode}
                            handleChange={handleChange}
                        />
                        <FormRow
                            className="form-last"
                            type="number"
                            name="phoneNumber"
                            subText="Phone Number"
                            value={values.phoneNumber}
                            handleChange={handleChange}
                        />
                    </div>
                </div>

                <DateInput
                    selected={values.dob}
                    handleChange={setDOB}
                    labelText="Date of Birth"
                />
                <DateInput
                    selected={values.dos}
                    handleChange={setDOS}
                    labelText="Date of Service"
                />

                <FormRow
                    type="text"
                    name="remarks"
                    labelText="Remarks"
                    value={values.remarks}
                    handleChange={handleChange}
                />

                <button
                    type="submit"
                    // onClick={Continue}
                    className="btn btn-block"
                >
                    Next
                </button>
            </form>
        </Wrapper>
    );
}
