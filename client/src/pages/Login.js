import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../contexts/appContext";
// import loginImg from "./images/login.png";
import Wrapper from "./wrappers/Login";
import FormRow from "../components/FormRow";

const initialState = {
    username: "",
    password: "",
    isMember: true,
};

export default function Login() {
    // const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    // const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();
    console.log(values)

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const {
            username,
            password,
            isMember,
        } = values;

        const currentUser = {
            Username: username,
            Password: password,
          
        };

        // if (isMember) {
        //   setupUser({
        //     currentUser,
        //     alertText: "Login Sucessful! Redirecting...",
        //   });
        // } else {
        //   setupUser({
        //     currentUser,
        //     alertText: "Registration Sucessful! Redirecting...",
        //   });
        // }

        const response = fetch("/login", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        });
        if (response.ok) {
            console.log("response worked!");
        }
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={onSubmit}>
                <h3>{values.isMember ? "Login" : "Register"}</h3>
                {/* {!values.isMember && (
                <div>
                    <FormRow
                    type="text"
                    name="username"
                    value={values.username}
                    handleChange={handleChange}
                    />
                </div>
                )} */}

                <FormRow
                type="username"
                name="username"
                value={values.username}
                handleChange={handleChange}
                />

                <FormRow
                type="password"
                name="password"
                value={values.password}
                handleChange={handleChange}
                />

                <button type="submit" className="btn btn-block">
                Submit
                </button>

                <p>
                {values.isMember ? "Not a member yet?" : "Already a member?"}
                <button type="button" onClick={toggleMember} className="member-btn">
                    {values.isMember ? "Register" : "Login"}
                </button>
                </p>

            </form>
        </Wrapper>

    )
}