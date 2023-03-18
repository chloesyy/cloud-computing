import React, { useState } from "react";
import Wrapper from "./wrappers/Login";
import FormRow from "../components/FormRow";
import Checkbox from "../components/Checkbox";

const initialState = {
    patientName: "",
    age: "",
    isFemale: true,
    isLeft: true,
    isImplant: false,
    density: "A",
};

export default function Login() {
    const [values, setValues] = useState(initialState);
    console.log(values);

    const toggleGender = () => {
        setValues({ ...values, isFemale: !values.isFemale });
    };

    const toggleLaterality = () => {
        setValues({ ...values, isLeft: !values.isLeft });
    };

    const toggleImplant = () => {
        setValues({ ...values, isImplant: !values.isImplant });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
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

    return (
        <Wrapper>
            <form className="form" onSubmit={onSubmit}>
                <h3>Input Patient Information</h3>

                <FormRow
                    type="text"
                    name="patientName"
                    labelText="Patient Name"
                    value={values.patientName}
                    handleChange={handleChange}
                />
                <FormRow
                    type="number"
                    min="1"
                    name="age"
                    labelText="Age"
                    value={values.age}
                    handleChange={handleChange}
                />
                <div>
                    <label className="form-label">Gender</label>
                    <div className="checkbox-container">
                        <Checkbox
                            label="Female"
                            value={values.isFemale}
                            onChange={toggleGender}
                        />
                        <Checkbox
                            label="Male"
                            value={!values.isFemale}
                            onChange={toggleGender}
                        />
                    </div>
                </div>

                <div>
                    <label className="form-label">Laterality</label>
                    <div className="checkbox-container">
                        <Checkbox
                            label="Left"
                            value={values.isLeft}
                            onChange={toggleLaterality}
                        />
                        <Checkbox
                            label="Right"
                            value={!values.isLeft}
                            onChange={toggleLaterality}
                        />
                    </div>
                </div>

                <div>
                    <label className="form-label">Implant</label>
                    <div className="checkbox-container">
                        <Checkbox
                            label="Yes"
                            value={values.isImplant}
                            onChange={toggleImplant}
                        />
                        <Checkbox
                            label="No"
                            value={!values.isImplant}
                            onChange={toggleImplant}
                        />
                    </div>
                </div>

                <div>
                    <label className="form-label">Density</label>
                    <select
                        className="form-select"
                        name="density"
                        value={values.density}
                        onChange={handleChange}
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-block">
                    Submit
                </button>
            </form>
        </Wrapper>
    );
}
