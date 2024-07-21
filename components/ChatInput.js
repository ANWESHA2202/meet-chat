import { TextField } from "@mui/material";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { SendRounded } from "@mui/icons-material";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase.config";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const sendMessage = async (inputText, auth, roomId) => {
  const messagesRef = collection(db, "messages");
  await addDoc(messagesRef, {
    content: inputText,
    mediaUrl: "",
    createdAt: serverTimestamp(),
    user: auth.currentUser.displayName,
    authorizedBy: auth.currentUser.email,
    photoUrl: auth.currentUser.photoURL,
    roomId: roomId,
  });
};

const ChatInput = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");

  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      const roomId = router.query["room-id"];
      await sendMessage(inputText, auth, roomId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", router.query["room-id"]]);
      setInputText("");
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSendMessage = () => {
    sendMessageMutation.mutate();
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
