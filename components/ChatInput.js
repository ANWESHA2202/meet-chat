import { TextField } from "@mui/material";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { SendRounded } from "@mui/icons-material";
import { useState } from "react";
import { useSendMessage } from "./hooks/useSendMessage";

const ChatInput = () => {
  const [inputText, setInputText] = useState("");

  const sendMessageMutation = useSendMessage(setInputText);

  const handleSendMessage = () => {
    sendMessageMutation.mutateAsync({ inputText, messageType: 1 });
  };
  return (
    <div className={styles.inputContainer} id="inputContainer">
      <TextField
        className={styles.inputField}
        multiline
        maxRows={4}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        // onKeyDown={() => handleSendMessage()}
        placeholder="Type a message"
        InputProps={{
          endAdornment: (
            <span
              className={styles.sendButton}
              onClick={() => handleSendMessage()}
            >
              <SendRounded />
            </span>
          ),
        }}
      />
    </div>
  );
};

export default ChatInput;
