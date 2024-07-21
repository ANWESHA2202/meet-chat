import { useEffect, useState } from "react";
import { auth } from "@/firebase.config";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { Skeleton } from "@mui/material";

const ProfileHeader = ({ isWelcome = false }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      setCurrentUser(auth?.currentUser);
      setLoading(false);
    };

    checkAuth();
    const unsubscribe = auth.onAuthStateChanged(() => {
      checkAuth();
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton variant="circle" width={100} />
      </div>
    );
  }

  return (
    <div className={styles.profileHeader}>
      <img
        src={currentUser?.photoURL}
        width={100}
        height={100}
        alt="profile-picture"
      />
      <span>
        {isWelcome ? "Continue as " : null}
        <span className={styles.displayName}>{currentUser?.displayName}</span>
      </span>
    </div>
  );
};

export default ProfileHeader;
