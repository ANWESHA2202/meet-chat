import styles from "./chatbubbles.module.scss";
const SystemChatBubble = ({ message }) => {
  return (
    <div className={styles.systemChatBubble}>
      <p>{message?.content}</p>
    </div>
  );
};

export default SystemChatBubble;
