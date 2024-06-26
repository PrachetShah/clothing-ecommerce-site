import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { getRedirectResult } from "firebase/auth";

import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  /* RESETTING FORM TO EMPTY */
  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  /* GOOGLE SIGN IN FUNCTION */
  const signInWithGoogle = async () => {
    signInWithGooglePopup();
  };

  /* HANDLE FORM SUBMISSION */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formFields;

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      resetForm();
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        alert("Incorrect Password for email");
      } else if (err.code === "auth/user-not-found") {
        alert("User Email not Found, Pls Sign Up");
      } else {
        console.log("User Sign In encountered error: ", err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <div className="sign-in-container">
        <h2>Already have an account?</h2>
        <span>Sign In with Email/Password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />

          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button
              type="button"
              buttonType={"google"}
              onClick={signInWithGoogle}
            >
              Google Sign In
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
