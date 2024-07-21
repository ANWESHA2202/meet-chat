import TextChatBubble from "@/components/chat-bubbles/TextChatBubble";
import { auth } from "@/firebase.config";

const RenderChatBubble = ({ message }) => {
  let isReceiver = auth?.currentUser?.email !== message?.authorizedBy;
  const renderChatBubble = () => {
    switch (message?.messageType) {
      default: {
        return <TextChatBubble message={message} />;
      }
    }
  };
  return <div>{renderChatBubble()}</div>;
};

export default RenderChatBubble;
