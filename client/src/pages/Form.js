import React, { useState } from "react";
import Page1 from "../components/Page1";
import Page2 from "../components/Page2";
import Page3 from "../components/Page3";
import moment from "moment";

const initialState = {
    step: 1,
    patientID: "",
    patientFirstName: "",
    patientLastName: "",
    dob: moment(),
    dos: moment(),
    areaCode: "65",
    phoneNumber: "",
    isLeft: true,
    isImplant: false,
    density: "A",
    remarks: "NIL",
    concavityMean: "",
    concavitySE: "",
    concavityWorst: "",
    areaMean: "",
    areaSE: "",
    areaWorst: "",
    symmetryMean: "",
    textureMean: "",
    prediction: null,
    diagnosis: "",
    doc: moment(),
};

export default function Form() {
    const [values, setValues] = useState(initialState);

    const previousStep = (e) => {
        setValues({ ...values, step: values.step - 1 });
    };
    const nextStep = (e) => {
        setValues({ ...values, step: values.step + 1 });
    };
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    switch (values.step) {
        case 1:
            return (
                <Page1
                    nextStep={nextStep}
                    previousStep={previousStep}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                />
            );
        case 2:
            return (
                <Page2
                    nextStep={nextStep}
                    previousStep={previousStep}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                />
            );
        case 3:
            return (
                <Page3
                    nextStep={nextStep}
                    previousStep={previousStep}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                />
            );
        default:
    }

    // }
    // };
}
