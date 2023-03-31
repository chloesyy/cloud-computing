import React from "react";
import Wrapper from "../pages/wrappers/Login";
import FormRow from "./FormRow";
// import Checkbox from "./Checkbox";
// import DateInput from "./DateInput";
import Predict from "./modal/Predict";

export default function Page2({
    nextStep,
    previousStep,
    handleChange,
    values,
    setValues,
}) {
    console.log(values);


    const setNumber = (e) => {
        const result = e.target.value.replace(/\D/g, "");
        setValues({ ...values, [e.target.name]: result });
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
            <form className="form" onSubmit={Continue}>
                <h3>Medical Information</h3>
                <FormRow
                    type="text"
                    name="concavityMean"
                    labelText="Concavity Mean"
                    value={values.concavityMean}
                    handleChange={setNumber}
                />
                <FormRow
                    type="text"
                    name="concavitySE"
                    labelText="Concavity SE"
                    value={values.concavitySE}
                    handleChange={setNumber}
                />
                <FormRow
                    type="text"
                    name="concavityWorst"
                    labelText="Concavity Worst"
                    value={values.concavityWorst}
                    handleChange={setNumber}
                />
                <FormRow
                    type="text"
                    name="areaMean"
                    labelText="Area Mean"
                    value={values.areaMean}
                    handleChange={setNumber}
                />
                <FormRow
                    type="text"
                    name="areaSE"
                    labelText="Area SE"
                    value={values.areaSE}
                    handleChange={setNumber}
                />
                <FormRow
                    type="text"
                    name="areaWorst"
                    labelText="Area Worst"
                    value={values.areaWorst}
                    handleChange={setNumber}
                />
                <FormRow
                    type="text"
                    name="symmetryMean"
                    labelText="Symmetry Mean"
                    value={values.symmetryMean}
                    handleChange={setNumber}
                />
                <FormRow
                    type="text"
                    name="textureMean"
                    labelText="Texture Mean"
                    value={values.textureMean}
                    handleChange={setNumber}
                />
                {/* <FormRow
                    type="file"
                    name="medicalImage"
                    labelText="Medical Image"
                    value={values.medicalImage}
                    handleChange={handleChange}
                /> */}
                {/* <FormRow
                    type="text"
                    name="results"
                    labelText="Prediction"
                    value={values.prediction}
                    // handleChange={handleChange}
                /> */}

                <Predict values={values} setValues={setValues} />

                <div className="form-container">
                    <button onClick={Previous} className="btn btn-block">
                        Back
                    </button>
                    <button type="submit" className="btn btn-block">
                        Next
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}
