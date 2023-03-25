import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../contexts/appContext";
// import loginImg from "./images/login.png";
import Wrapper from "./wrappers/Login";
import FormRow from "../components/FormRow";
// import UserPool from "../UserPool";

const initialState = {
    username: "",
    password: "",
    isMember: false,
};

export default function Register() {
    // const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    // const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();
    console.log(values);

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { username, password, isMember } = values;

        const currentUser = {
            Username: username,
            Password: password,
        };

        if (isMember) {
        }

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

        // UserPool.signUp(userid, pass, [], null, (err, data) => {
        //     if (err) {
        //         console.error(err);
        //     }
        //     console.log(data);
        // });

        async function get_response() {
            await fetch("/register", {
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

    return (
        <Wrapper>
            <form className="form" onSubmit={onSubmit}>
                <h3>{values.isMember ? "Login" : "Register"}</h3>

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

                <button type="submit" className="btn btn-block">
                    Submit
                </button>

                <p>
                    {values.isMember
                        ? "Not a member yet? "
                        : "Already a member? "}

                    <Link to="/login" className="member-btn">
                        Register
                    </Link>
                </p>
            </form>
        </Wrapper>
    );
}
