import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();

    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>This is Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Button</button>
    </div>
  );
};

export default SignIn;
