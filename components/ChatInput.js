import { TextField } from "@mui/material";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { SendRounded } from "@mui/icons-material";
const ChatInput = () => {
  return (
    <div className={styles.inputContainer}>
      <TextField
        className={styles.inputField}
        multiline
        maxRows={4}
        placeholder="Type a message"
        InputProps={{
          endAdornment: (
            <span className={styles.sendButton}>
              <SendRounded />
            </span>
          ),
        }}
      />
    </div>
  );
};

export default ChatInput;
