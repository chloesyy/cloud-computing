import React, { useState } from "react";
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
};

export default function Login() {
    const [values, setValues] = useState(initialState);
    console.log(values);

    const toggleMember = () => {
        setValues({ ...values, isLogin: !values.isLogin });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        async function get_response() {
            await fetch("/login", {
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
                    // TODO: Re-route to home page
                    console.log("onSuccess: ", data);
                },
                onFailure: (err) => {
                    // TODO: Show alert
                    console.error("onFailure: ", err);
                },
                newPasswordRequired: (data) => {
                    // TODO: Show alert
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
                    if (err) {
                        // TODO: show error alert
                        console.error(err);
                    }
                    console.log(data);
                    get_response();
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
                        <label className="form-label">Organisation</label>
                        <select
                            className="form-select"
                            name="organisation"
                            value={values.organisation}
                            onChange={handleChange}
                        >
                            <option value="NUH">NUH</option>
                            <option value="SGH">SGH</option>
                        </select>
                    </div>
                )}

                <button type="submit" className="btn btn-block">
                    Submit
                </button>

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
