import ChatMain from "./ChatMain/ChatMain";
import UserInfo from "./UserInfo";
import styles from "../meetChat.module.scss";
const RoomChat = () => {
  return (
    <div className={styles.roomChatContainer}>
      <UserInfo />
      <ChatMain />
    </div>
  );
};

export default RoomChat;
