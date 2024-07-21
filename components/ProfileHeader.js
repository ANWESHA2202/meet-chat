import { useEffect, useState } from "react";
import { auth } from "@/firebase.config";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { MenuItem, Popover, Skeleton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useLogOut } from "./hooks/useLogOut";
import { useRouter } from "next/router";

const ProfileHeader = ({ isWelcome = false }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const logoutMutation = useLogOut(router?.query?.["room-id"]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    logoutMutation.mutate(router?.query?.["room-id"]);
  };

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
      <span className={styles.logoutPopOverBtn} onClick={handleClick}>
        <MoreVert />
      </span>
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </Popover>
    </div>
  );
};

export default ProfileHeader;
