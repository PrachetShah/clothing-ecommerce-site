import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const Authentication = () => {
  return (
    <div>
      <h1>This is Sign In Page</h1>
      {/* <button onClick={logGoogleUser}>Sign In with Google Button</button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
