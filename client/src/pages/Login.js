import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "./wrappers/Login";
import FormRow from "../components/FormRow";

import {
    CognitoUser,
    AuthenticationDetails,
    CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const initialState = {
    username: "",
    password: "",
    organisation: "",
    isLogin: true,
    isError: false,
    errorMessage: "",
};

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    console.log(values);

    const toggleMember = () => {
        setValues({ ...values, isError: false, isLogin: !values.isLogin });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // For accessing RDS in the backend
        // async function get_response() {
        //     await fetch("/api/login", {
        //         method: "POST",
        //         cache: "no-cache",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(values),
        //     }).then((response) => {
        //         if (response.ok) {
        //             console.log("response worked!");
        //         }
        //     });
        // }

        if (values.isLogin) {
            // Login AWS Cognito
            const user = new CognitoUser({
                Username: values.username,
                Pool: UserPool,
            });
            const authDetails = new AuthenticationDetails({
                Username: values.username,
                Password: values.password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    setValues({ ...values, isError: false });
                    console.log("onSuccess: ", data);
                    navigate("../form", values);
                },
                onFailure: (err) => {
                    setValues({
                        ...values,
                        isError: true,
                        errorMessage: err.message,
                    });
                    console.error("onFailure: ", err);
                },
                newPasswordRequired: (data) => {
                    // TODO: Show alert (not sure under what circumstance this happens)
                    console.log("newPasswordRequired: ", data);
                },
            });
        } else {
            // Sign up AWS Cognito
            var attributeList = [];
            const dataEmail = {
                Name: "email",
                Value: "seah11chloe@gmail.com",
            };
            var dataOrganisation = {
                Name: "custom:organisation",
                Value: values.organisation,
            };

            var attributeEmail = new CognitoUserAttribute(dataEmail);
            var attributeOrganisation = new CognitoUserAttribute(
                dataOrganisation
            );

            attributeList.push(attributeEmail);
            attributeList.push(attributeOrganisation);

            UserPool.signUp(
                values.username,
                values.password,
                attributeList,
                null,
                (err, data) => {
                    if (err == null) {
                        setValues({
                            ...values,
                            isLogin: true,
                            isError: false,
                            errorMessage: "",
                            password: "",
                        });
                    }
                    if (err) {
                        setValues({
                            ...values,
                            isError: true,
                            errorMessage: err.message,
                        });
                        console.error(err);
                    }
                    console.log(data);
                }
            );
        }
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={onSubmit}>
                <h3>{values.isLogin ? "Login" : "Register"}</h3>

                <FormRow
                    type="username"
                    name="username"
                    labelText="username"
                    value={values.username}
                    handleChange={handleChange}
                />

                <FormRow
                    type="password"
                    name="password"
                    labelText="password"
                    value={values.password}
                    handleChange={handleChange}
                />

                {!values.isLogin && (
                    <div>
                        <ul>
                            <li>
                                Password has to contain at least 10 characters
                            </li>
                            <li>
                                Password includes the following:
                                <ul className="inner-list">
                                    <li>An uppercase character</li>
                                    <li>A lowercase character</li>
                                    <li>A special character</li>
                                    <li>A number</li>
                                </ul>
                            </li>
                        </ul>
                        <label className="form-label">Organisation</label>
                        <select
                            className="form-select"
                            name="organisation"
                            value={values.organisation}
                            onChange={handleChange}
                        >
                            <option value="NUH">
                                National University Health System (NUHS)
                            </option>
                            <option value="SGH">
                                National Healthcare Group (NHG)
                            </option>
                            <option value="SingHealth">
                                Singapore Health Services (SingHealth)
                            </option>
                        </select>
                    </div>
                )}

                <button type="submit" className="btn btn-block">
                    Submit
                </button>

                {values.isError && (
                    <p className="error-message" style={{ color: "red" }}>
                        {values.errorMessage}
                    </p>
                )}

                <p>
                    {values.isLogin
                        ? "Not a member yet? "
                        : "Already a member? "}

                    <button
                        type="button"
                        onClick={toggleMember}
                        className="member-btn"
                    >
                        {values.isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}
