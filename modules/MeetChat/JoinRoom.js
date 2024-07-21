import CreateRoom from "@/components/room-joiner/CreateRoom";
import JoinExisting from "@/components/room-joiner/JoinExisting";
import styles from "./meetChat.module.scss";
import ProfileHeader from "@/components/ProfileHeader";

const JoinRoom = () => {
  return (
    <div className={styles.joinRoom}>
      <ProfileHeader isWelcome={true} />
      <JoinExisting />
      <CreateRoom />
    </div>
  );
};

export default JoinRoom;
