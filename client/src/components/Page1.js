import React from "react";
import Wrapper from "../pages/wrappers/Login";
import FormRow from "./FormRow";
import DateInput from "./DateInput";
import AreaCodes from "./AreaCodes";

export default function Page1({ nextStep, handleChange, values, setValues }) {
    console.log(values);

    const areaCodeSelection = AreaCodes.map((item) => {
        return (
            <option value={item.code}>
                {item.country} (+{item.code})
            </option>
        );
    });

    const setPhoneNumber = (e) => {
        const result = e.target.value.replace(/\D/g, "");
        setValues({ ...values, [e.target.name]: result });
    };

    const setDOB = (date) => {
        setValues({ ...values, dob: date });
    };

    const setDOS = (date) => {
        setValues({ ...values, dos: date });
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
                        <div>
                            <select
                                className="form-select"
                                name="areaCode"
                                value={values.areaCode}
                                onChange={handleChange}
                                required
                            >
                                {areaCodeSelection}
                            </select>
                            <small>Area Code</small>
                        </div>
                        <FormRow
                            className="form-last"
                            type="text"
                            name="phoneNumber"
                            subText="Phone Number"
                            value={values.phoneNumber}
                            handleChange={setPhoneNumber}
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

                <button type="submit" className="btn btn-block">
                    Next
                </button>
            </form>
        </Wrapper>
    );
}
