import SignInButton from "@/components/auth/SignInButton";
import styles from "@/modules/MeetChat/meetChat.module.scss";

const Auth = () => {
  return (
    <div className={styles.authContainer}>
      <h1>Welcome to Meet-Chat</h1>
      <SignInButton />
    </div>
  );
};

export default Auth;
