import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateUniqueMeetChatLinkId } from "../utils";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { Button, CircularProgress } from "@mui/material";
import { auth } from "@/firebase.config";
import { useSendMessage } from "../hooks/useSendMessage";

const CreateRoom = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [roomId, setRoomId] = useState("");
  const sendMessageMutation = useSendMessage(() => {});

  const regenerateIdMutation = useMutation({
    mutationFn: async (email) => await generateUniqueMeetChatLinkId(email),
    onSuccess: async (data) => {
      setRoomId(data);
      await sendMessageMutation.mutateAsync({
        inputText: `${auth?.currentUser?.displayName} just created the room`,
        messageType: 9,
        roomId: data,
      });
      setIsLoading(false);
      router.push(data);
    },
    onError: (err) => {
      console.log(err);
      setIsLoading(false);
    },
  });

  const regenerateId = async () => {
    setIsLoading(true);
    try {
      await regenerateIdMutation.mutateAsync(auth?.currentUser?.email);
    } catch (error) {
      console.error("Error in regenerateId:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      disabled={isLoading}
      className={styles.createRoom}
      onClick={regenerateId}
    >
      {isLoading ? <CircularProgress /> : "Generate New ID"}
    </Button>
  );
};

export default CreateRoom;
