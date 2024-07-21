import { auth, provider } from "@/firebase.config";
import { Button } from "@mui/material";
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
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      variant="contained"
      onClick={() => handleSignIn()}
      startIcon={
        <img
          src="/googleLogo.webp"
          height={30}
          width={30}
          style={{ borderRadius: "5px" }}
        />
      }
    >
      Sign In With Google
    </Button>
  );
};

export default SignInButton;
