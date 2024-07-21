import { useMessages } from "@/components/hooks/useMessages";
import { auth } from "@/firebase.config";
import { useRouter } from "next/router";
import RenderChatBubble from "./RenderChatBubble";
import styles from "@/modules/MeetChat/meetChat.module.scss";

const Messages = () => {
  const router = useRouter();
  const {
    data: messages,
    error,
    isLoading,
  } = useMessages(router.query["room-id"]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading messages</div>;
  return (
    <div
      className={styles.messagesContainer}
      style={{
        height: `${
          window?.innerHeight -
          (document?.getElementById("inputContainer")?.offsetHeight + 10)
        }px`,
      }}
    >
      {messages?.length > 0 &&
        messages?.map((message, idx) => {
          return <RenderChatBubble message={message} key={idx} />;
        })}
    </div>
  );
};

export default Messages;
