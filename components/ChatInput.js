import { TextField } from "@mui/material";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { SendRounded } from "@mui/icons-material";
import { useState } from "react";
import { useSendMessage } from "./hooks/useSendMessage";
import { isInputTextValid } from "./utils";

const ChatInput = () => {
  const [inputText, setInputText] = useState("");

  const sendMessageMutation = useSendMessage(setInputText);

  const handleSendMessage = async () => {
    if (!isInputTextValid(inputText)) return;
    await sendMessageMutation.mutateAsync({ inputText, messageType: 1 });
    const ele = document.getElementById("hiddenhr");
    if (ele) {
      console.log("this");
      ele.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.inputContainer} id="inputContainer">
      <TextField
        className={styles.inputField}
        multiline
        maxRows={4}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === "Enter" && !evt.shiftKey) {
            evt.stopPropagation();
            evt.preventDefault();

            handleSendMessage();
          }
        }}
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
