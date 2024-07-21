import { useEffect } from "react";
import styles from "./chatbubbles.module.scss";
import { findRoomCreator } from "../hooks/useLogOut";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
const SystemChatBubble = ({ message }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const checkIsRoomExpired = async () => {
    if (message?.content?.includes("left the chat")) {
      await findRoomCreator(message?.roomId, (roomData) => {
        console.log(roomData, "room data");
        if (roomData?.[0]?.createdBy === message?.authorizedBy) {
          queryClient.setQueryData("isModalOpen", true);

          let countdown = 5;
          queryClient.setQueryData(
            "modalText",
            `Room Owner left the chat, the room is going to be deleted within ${countdown} secs!`
          );

          const interval = setInterval(() => {
            countdown -= 1;
            queryClient.setQueryData(
              "modalText",
              `Room Owner left the chat, the room is going to be deleted within ${countdown} secs!`
            );

            if (countdown <= 0) {
              clearInterval(interval);
              queryClient.setQueryData("isModalOpen", false);
              router.push("/");
            }
          }, 1000);
        }
      });
    }
  };
  useEffect(() => {
    if (message) {
      checkIsRoomExpired();
    }
  }, [message]);
  return (
    <div className={styles.systemChatBubble}>
      <p>{message?.content}</p>
    </div>
  );
};

export default SystemChatBubble;
