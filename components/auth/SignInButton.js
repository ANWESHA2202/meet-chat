import { auth, provider } from "@/firebase.config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SignInButton = () => {
  //event handler functions
  const handleSignIn = async () => {
    /**
     * async event to let user sign in using google
     */
    try {
      const response = await signInWithPopup(auth, provider);
      cookies.set("auth-token", response.user.refreshToken);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={() => handleSignIn()}>Sign In With Google</button>
    </div>
  );
};

export default SignInButton;
