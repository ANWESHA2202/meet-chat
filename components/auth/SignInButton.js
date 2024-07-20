import { auth, provider } from "@/firebase.config";
import { signInWithPopup } from "firebase/auth";

const SignInButton = () => {
  //event handler functions
  const handleSignIn = async () => {
    /**
     * async event to let user sign in using google
     */
    console.log(auth, provider);
    const response = await signInWithPopup(auth, provider);
    console.log(response);
  };
  return (
    <div>
      <button onClick={() => handleSignIn()}>Sign In With Google</button>
    </div>
  );
};

export default SignInButton;
