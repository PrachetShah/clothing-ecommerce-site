import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  /*
    RESETTING FORM TO EMPTY
  */
  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  /*
    HANDLE FORM SUBMISSION
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formFields);
    const { displayName, email, password, confirmPassword } = formFields;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetForm();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else if (err.code === "auth/weak-password") {
        alert("Password should be atleast 6 characters");
      } else {
        console.log("user creation encountered error: ", err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign Up with Email/Password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />

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

          <FormInput
            label="Confirm Password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />

          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
