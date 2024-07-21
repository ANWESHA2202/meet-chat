import { useMutation } from "@tanstack/react-query";
import { generateUniqueMeetChatLinkId } from "../utils";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { Button, CircularProgress } from "@mui/material";
import { auth } from "@/firebase.config";

const CreateRoom = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const regenerateIdMutation = useMutation({
    mutationFn: (email) => generateUniqueMeetChatLinkId(email),
    onSuccess: (data) => {
      router.push(data);
      setIsLoading(false);
    },
    onError: (err) => {
      console.log(err);
      setIsLoading(false);
    },
  });

  const regenerateId = async () => {
    setIsLoading(true);
    regenerateIdMutation.mutate(auth?.currentUser?.email);
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
