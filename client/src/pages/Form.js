import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import PatientDetails from "../components/PatientDetails";
import MedicalInfo from "../components/MedicalInfo";
import ClosingForm from "../components/ClosingForm";

const initialState = {
    step: 1,
    patientID: "",
    patientFirstName: "",
    patientLastName: "",
    dob: "",
    dos: "",
    areaCode: "",
    phoneNumber: "",
    isLeft: true,
    isImplant: false,
    density: "A",
    remarks: "",
    concavityMean: "",
    concavitySE: "",
    concavityWorst: "",
    areaMean: "",
    areaSE: "",
    areaWorst: "",
    symmetryMean: "",
    textureMean: "",
    // medicalImage: null,
    prediction: null,
    diagnosis: "",
    doc: "",
};

export default function Form() {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!values.isAuthenticated) {
    //         navigate('../login')
    //     }
    // }, []);

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
                <PatientDetails
                    nextStep={nextStep}
                    previousStep={previousStep}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                />
            );
        case 2:
            return (
                <MedicalInfo
                    nextStep={nextStep}
                    previousStep={previousStep}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                />
            );
        case 3:
            return (
                <ClosingForm
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
